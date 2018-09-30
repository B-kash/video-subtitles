import { Component, OnInit } from '@angular/core';
import {ParserService} from "../parser-service.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {


  subtitle: string = '';

  constructor(private parserService:ParserService) { }

  ngOnInit() {
  }

  reset(){
    this.parserService.reset();
//    TODO now download another subtitle again and send it to parse into above functions
  }


}
