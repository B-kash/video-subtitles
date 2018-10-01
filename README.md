# VideoSubtitles

Following technologies need to be installed into the system before running running the application or its tests<br>
<ol>
<li><strong>Node js (https://nodejs.org/en/download/)</strong></li>
<li><strong>Npm (comes along with node js)</strong></li>
<li><strong>http-server :  npm install http-server -g </strong></li>
</ol>

In order to run the application we need video and subtitle file to be served. Download the video and subtitle file and 
navigate to that directory. Rename the video file to `video.mp4` and the subtitle file to `sub.vtt`. 
Now serve the directory using `http-server`, for that In the terminal run the command `http-server -p 8000 --cors`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. 

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
