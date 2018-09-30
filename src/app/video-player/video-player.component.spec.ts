import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';
import {ParserService} from "../parser-service.service";

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayerComponent ],
      providers: [ParserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([ParserService],(service: ParserService) => {
    expect(component).toBeTruthy();
  }));
});
