export class TcmsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tcms-app h1')).getText();
  }
}
