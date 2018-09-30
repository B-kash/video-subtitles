import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {ParserService} from "./parser-service.service";
import {ApiService} from "./api.service";

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ParserService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
