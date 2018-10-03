# VideoSubtitles

Following technologies need to be installed into the system before running running the application or its tests<br>
<ol>
<li><strong>Node js (https://nodejs.org/en/download/)</strong>node prefered version 7.10.0 or higer</li>
<li><strong>Npm (comes along with node js)</strong> npm prefered version 4.2.0 or higer </li>
<li><strong>http-server :  (npm install http-server -g) </strong> http-server prefered version 0.11.1</li>
<li><strong>angular cli :  npm install -g @angular/cli </strong></li>
</ol>

## Assumptions and TODO before running

<ol>
  <li> port 8000 is not used by other applications</li>
  <li> all the technologies mentioned above are already installed into your machine</li>
</ol>

In order to run the application we need video and subtitle file to be served. Download the video and subtitle file and 
navigate to that directory. Rename the video file to `video.mp4` and the subtitle file to `sub.vtt`. 
Now serve the directory using `http-server`, for that In the terminal run the command `http-server -p 8000 --cors`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. For the first time setup run `npm install` before `npm start` to download the required dependencies.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
