import { Injectable } from '@angular/core';

@Injectable()
export class ParserService {
  cues:any = [];
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



}
