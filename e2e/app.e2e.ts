import { TcmsPage } from './app.po';

describe('tcms App', function() {
  let page: TcmsPage;

  beforeEach(() => {
    page = new TcmsPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tcms works!');
  });
});
