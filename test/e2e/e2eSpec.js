describe('Stock home page', function() {
  it('should display a list of stocks on the main page', function() {
    browser.get('http://localhost:8000');
    var all =
      browser.findElements(by.repeater('stock in landingCtrl.stocks'));
    all.then(function(arr) {
      expect(arr.length).toEqual(10);
    });
  });
});
