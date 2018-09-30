import {Component, OnInit, ViewChild} from '@angular/core';
import {ParserService} from "../parser-service.service";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {


  subtitle: string = '';

  @ViewChild('videoPlayer') videoPlayer;

  constructor(private parserService:ParserService,private api: ApiService) { }

  ngOnInit() {
    this.downloadSubtitle();
  }

  reset(){
    this.parserService.reset();
//    TODO now download another subtitle again and send it to parse into parserService
  }


  downloadSubtitle() {
    this.api.getSubtitle().subscribe(res=>{
      console.log(res['_body']);
      this.parserService.parseFile(res['_body']);
    },(err)=>{
      console.log("Error","Cannot download subtitle",err);
    });
  }

  getSubtitle(){
    let cues = this.parserService.getCueForTime(this.videoPlayer.nativeElement.currentTime);
    this.subtitle = cues.reduce(this.getSubtitleFromCue,"");

  }

  getSubtitleFromCue(text,cue){
    return text+cue.subtitle;
  }

}
