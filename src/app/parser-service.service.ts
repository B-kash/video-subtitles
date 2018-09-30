import { Injectable } from '@angular/core';

@Injectable()
export class ParserService {
  cues:any = [];
  signature = 'WEBVTT';

  constructor() { }

  getAllCues(){
    return this.cues;
  }

  reset(){
    this.cues = [];
//    TODO now download another subtitle again and send it to parse into above functions
  }

  getCueForTime(currentTime) {
    return this.cues.filter(cue=> currentTime>=cue.startDuration && currentTime<cue.endDuration);
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

    console.log("webvttSplits",webvttSplits);
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
    }
  }
  parseSplits(splits){
  //  TODO write magical code to parse each splits into objects
  }

}
