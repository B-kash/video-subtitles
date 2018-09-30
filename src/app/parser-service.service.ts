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
//    TODO now download another subtitle again and send it to parse into above functions
  }

  getCueForTime(currentTime) {
    //currently lets just filter it from array
//    TODO later on use other algorithm that takes less time

    return this.cues.filter(cue => currentTime >= cue.startDuration && currentTime < cue.endDuration);
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
    console.log("webvttsplits",webvttSplits);
    this.createCues(webvttSplits);
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
      console.log("cues",this.cues)
    }
  }

  parseSplits(splits) {
    //  TODO write magical code to parse each splits into objects
    return splits.map(this.parseCue).filter(Boolean);
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

      if (times.length !== 2 || !ParserService.validTimestamp(times[0]) || !ParserService.validTimestamp(times[1])) {
        console.log('Invalid timestamp on index ',index);
        return;
      }

      cueObject.startDuration = ParserService.convertToSeconds(times[0]);
      cueObject.endDuration = ParserService.convertToSeconds(times[1]);

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


  static validTimestamp(timestamp) {
    return ParserService.TIMESTAMP_REGEXP.test(timestamp);
  }


  static convertToSeconds(time: string | any) {


    let timeSplits = time.split(':');

    let hr = Number(timeSplits[0]);
    let min = Number(timeSplits[1]);
    let sec = Number(timeSplits[2]);

    return (hr * 60 * 60 + min * 60 + sec);


  }
}
