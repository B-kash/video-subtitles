import { VideoSubtitlesPage } from './app.po';

describe('video-subtitles App', () => {
  let page: VideoSubtitlesPage;

  beforeEach(() => {
    page = new VideoSubtitlesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
