import {Injectable} from '@angular/core';

@Injectable()
export class ParserService {
  cues: any = [];
  signature = 'WEBVTT';
  static TIMESTAMP_REGEXP = /([0-9]{1,2})?:?([0-9]{2}):([0-9]{2}\.[0-9]{3})/;

  constructor() {
  }

  getAllCues() {
    return this.cues;
  }

  reset() {
    this.cues = [];
//    TODO now download another subtitle again and send it to parser
  }

  getCueForTime(currentTime) {

    // lets try modified binary search algorithm for this case but in this case
    let selectedCue = [];
    let left = 0, right = this.cues.length-1;
    while(left<=right){
      let mid = Math.floor((left +right)/2);
      let midCue:any = {...this.cues[mid]};

      if(currentTime >= midCue.startDuration && currentTime < midCue.endDuration){
        selectedCue.push(midCue);
        //In this case when we find a cue for the current time, instead of breaking the loop we search for more cues which might have overlapped
        //For this we search for all the cues from the mid point all the way to the left and right until we stop getting matching results
        let upperNext = mid+1; //this index goes to the right side of the array i.e towards last item
        let lowerNext = mid-1; //this index goes to the left side of the array  i.e towards first item

        while(upperNext<=right ||  lowerNext>=left){
          let foundNext = false; //this flag is turned true when we find a matching cue on the either side of the array
          if(upperNext<=right ){
            if(currentTime >= this.cues[upperNext].startDuration && currentTime < this.cues[upperNext].endDuration){
              selectedCue.push(this.cues[upperNext]);
              upperNext++;
              foundNext = true;
            }
          }
          if(lowerNext>=left){
            if( this.cues[lowerNext].startDuration && currentTime < this.cues[lowerNext].endDuration ){
              selectedCue.push(this.cues[lowerNext]);
              lowerNext--;
              foundNext = true;
            }
          }
          //when no cue at a particular time is found, we break out of the loop
          if(!foundNext){
            break;
          }
        }

        break;
      }else if(currentTime<midCue.startDuration){
        right = mid - 1;
      }else{
        left = mid + 1;
      }
    }
    return selectedCue.sort(this.sortAscendingByStartDuration);

  }

  parseFile(data) {
    //Firstly we remove the null character ''
    data = data.replace(/\0/g, '');
    //now we replace carriage return followed by new line by just a new line character
    data = data.replace(/\r\n/g, '\n');
    //Now we replace all remaining carriage return with a new line characrer
    data = data.replace(/\r/g, '\n');
    //We know each block is seperated by 2 consecutive new lines so splitting the string to seprate  blocks
    let webvttSplits = data.split('\n\n');
    // console.log("webvttsplits",webvttSplits);
    this.createCues(webvttSplits);
    console.log("Cues are ",this.cues);
  }


  createCues(webvttSplits) {
    //get the first block as header
    let header = webvttSplits.shift();
    //Check if the first block contains its signature i.e WEBVTT
    if (header.length < 6) {
      //since the first line of code is shorter than length of signature we say this is not a valid webvtt file
      return;
    } else if (header.length == 6 && header != this.signature) {
      //since the signature does not match we say this is not a valid webvtt file
      return;
    } else if (header.length > 6 && (header[6] != '\n' || header[6] != ' ' || header[6] != '\t')) {
      // since length of the first line is more than 6 and does not follow any space or new line its not valid webvtt file
      return;
    } else {
      this.cues = this.parseSplits(webvttSplits);
      this.cues.sort(this.sortAscendingByStartDuration);
    }
  }

  parseSplits(splits) {
    //  TODO write magical code to parse each splits into objects
    return splits.map(this.parseCue,this).filter(Boolean);
  }

  parseCue(cue, index) {
    let cueObject = {
      id: null,
      subtitle: '',
      startDuration: 0,
      endDuration: 0

    };
    const cueLines = cue.split('\n').filter(Boolean);

    if (cueLines.length > 0 && cueLines[0].startsWith('NOTE')) {
      return null;
    }

    if (cueLines.length === 1 && !cueLines[0].includes('-->')) {
      console.log('Parsing error cue header is alone on index ', index);
      return;
    }

    if (cueLines.length > 1 &&
      !(cueLines[0].includes('-->') || cueLines[1].includes('-->'))) {
      console.log('Cue header needs to be followed by timestamp on index ', index);
      return;
    }

    if (cueLines.length > 0 && cueLines[0].startsWith('STYLE')) {
      //    TODO do something with the style block
      return;
    }
    if (cueLines.length > 0 && cueLines[0].startsWith('REGION')) {
      //    TODO do something with the REGION block
      return;
    }

    if (cueLines.length > 1 && cueLines[1].includes('-->')) {
      cueObject.id = cueLines.shift();
    }

    if (cueLines.length > 0 && cueLines[0].includes('-->')) {
      const times = cueLines[0].split(' --> ');

      if (times.length !== 2 || !this.validTimestamp(times[0]) || !this.validTimestamp(times[1])) {
        console.log('Invalid timestamp on index ',index);
        return;
      }

      cueObject.startDuration = this.convertToSeconds(times[0]);
      cueObject.endDuration = this.convertToSeconds(times[1]);

      if (cueObject.startDuration > cueObject.endDuration) {
        console.log('Start time should be smaller than end on index ', index);
        return;
      }

      if (cueObject.endDuration <= cueObject.startDuration) {
        console.log('End time must be greater than start on index ', index);
        return;
      }

      cueLines.shift();

    }

    cueObject.subtitle = cueLines.join('\n');
    return cueObject;

  }


  validTimestamp(timestamp) {
    return ParserService.TIMESTAMP_REGEXP.test(timestamp);
  }


  convertToSeconds(time: string | any) {


    let timeSplits = time.split(':');

    let hr = Number(timeSplits[0]);
    let min = Number(timeSplits[1]);
    let sec = Number(timeSplits[2]);

    return (hr * 60 * 60 + min * 60 + sec);


  }

  sortAscendingByStartDuration(cue1,cue2){
    return cue1.startDuration - cue2.startDuration;
  }
}
