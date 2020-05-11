# VideoSubtitles

## Introduction
This application prototype is focused on parsing a ‘webvtt’ subtitle and showing proper text while the video is being played. The prototype is built on angular.

##Scope
The prototype does not aim to implement the full WebVTT specification. It focuses on supporting basic
text content and timing information for that content. WebVTT features like styling and positioning are
out of scope. A further implementation of this prototype can also be extended for positioning and
styling.

Following technologies need to be installed into the system before running running the application or its tests<br>
<ol>
<li><strong>Node js (https://nodejs.org/en/download/)</strong>node prefered version 7.10.0 or higer</li>
<li><strong>Npm (comes along with node js)</strong> npm prefered version 4.2.0 or higer </li>
<li><strong>http-server :  (npm install http-server -g) </strong> http-server prefered version 0.11.1</li>
<li><strong>angular cli :  npm install -g @angular/cli </strong> this prototype is built on angular/cli version 1.0.0</li>
</ol>

## Assumptions and TODO before running

<ol>
  <li> Port 8000 is not used by other applications</li>
  <li> All the technologies mentioned above are already installed into your machine</li>
  <li>The webvtt(subtitle) file might have cues that overlap at particular time</li>
  <li>The advanced webvtt specifications like positioning and styling are not to be implemented</li>
</ol>

In order to run the application we need video and subtitle file to be served. Download two video files and its subtitle files. 
Navigate to that directory. Rename the video files to `video.mp4` and `video1.mp4` and the subtitle files to `sub.vtt` and `sub1.vtt` respectively. 
Now serve the directory using `http-server`, for that In the terminal run the command `http-server -p 8000 --cors`.

For experimental purpose, an example video can be downloaded from [Here](https://durian.blender.org/download/). And its subtitle [here](https://github.com/elyseko/web-vtt-example/blob/master/src/captions/sintel-en-us.vtt).

## Methods and Algorithms used
<ol>
    <li>For sorting the list of cues default javascript sort function is used. For further extension better
        sorting algorithm can be used for better performance.</li>
    <li>For searching cues for particular time, a modification of binary search algorithm is used which
        increases the performance compared to that of linear search algorithm. If the assumption is
        made that no cue time is overlapped, then the search will perform at its best.
    </li>
</ol> 

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. For the first time setup run `npm install` before `npm start` to download the required dependencies.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
