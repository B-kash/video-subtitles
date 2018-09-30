import { TestBed, inject } from '@angular/core/testing';

import { ParserService } from './parser-service.service';

describe('ParserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParserService]
    });
  });

  it('should ...', inject([ParserService], (service: ParserService) => {
    expect(service).toBeTruthy();
  }));

  it('should not parse the file if signature is not correct',inject([ParserService],(service:ParserService)=>{
    expect(service).toBeTruthy();
  }));
  it('should return list of cues in which given time is between the start time and end time ',inject([ParserService],(service:ParserService)=>{
    service.cues=[
      {id: null, subtitle: "This blade has a dark past.", startDuration: 107.25, endDuration: 110.5},
      {id: null, subtitle: "It has shed much innocent blood.", startDuration: 111.8, endDuration: 115.8},
      {id: null, subtitle: "You're a fool for traveling alone.↵so completely unprepared.", startDuration: 118, endDuration: 121.45},
      {id: null, subtitle: "You're lucky your blood's still flowing.", startDuration: 121.75, endDuration: 124.8},
      {id: null, subtitle: "Thank you.", startDuration: 125.25, endDuration: 126.3},
      {id: null, subtitle: "So...", startDuration: 127.5, endDuration: 129},
      {id: null, subtitle: "What brings you to↵the land of the gatekeepers?", startDuration: 129.4, endDuration: 133.8}
    ];
    let cue = service.getCueForTime(109);
    expect(cue).toEqual([{id: null, subtitle: "This blade has a dark past.", startDuration: 107.25, endDuration: 110.5}]);
  }));


  it('should not return list of cues in which given time is not between the start time and end time ',inject([ParserService],(service:ParserService)=>{
    service.cues=[
      {id: null, subtitle: "This blade has a dark past.", startDuration: 107.25, endDuration: 110.5},
      {id: null, subtitle: "It has shed much innocent blood.", startDuration: 111.8, endDuration: 115.8},
      {id: null, subtitle: "You're a fool for traveling alone.↵so completely unprepared.", startDuration: 118, endDuration: 121.45},
      {id: null, subtitle: "You're lucky your blood's still flowing.", startDuration: 121.75, endDuration: 124.8},
      {id: null, subtitle: "Thank you.", startDuration: 125.25, endDuration: 126.3},
      {id: null, subtitle: "So...", startDuration: 127.5, endDuration: 129},
      {id: null, subtitle: "What brings you to↵the land of the gatekeepers?", startDuration: 129.4, endDuration: 133.8}
    ];
    let cue = service.getCueForTime(109);
    expect(cue).not.toEqual([{id: null, subtitle: "It has shed much innocent blood.", startDuration: 111.8, endDuration: 115.8},]);
  }));

  it('should remove all the cues when change source is clicked i.e reset function is called',inject([ParserService],(service:ParserService)=>{
    service.cues.length = 5;
    service.reset();
    expect(service.getAllCues().length).toEqual(0);
  }));
});
