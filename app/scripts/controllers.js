angular.module('stockMarketApp')
  .controller('AuthCtrl', ['$location', 'AlertService', function ($location, AlertService) {

    var self = this;
    self.login = function() {

    };
    self.register = function() {
      AlertService.set('Registering ' + self.username);

    };
  }])
  .controller('AppCtrl', ['AlertService', function(AlertService) {
    this.alertService = AlertService;
    this.listPageHtml = 'views/list.html';
    this.signupPageHtml = 'views/signup.html';

  }])
  .controller('LandingCtrl', [function() {
    var self = this;
    self.stocks = [{
      "ticker": "TWTR",
      "name": "Twitter Inc",
      "price": 23,
      "previous": 21,
      "size": "Medium"
    }, {
      "ticker": "GOOG",
      "name": "Google Inc",
      "price": 884,
      "previous": 899,
      "size": "Large"
    }]

    self.getChange = function(stock) {
      return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
    };
    self.getChangeClass = function(stock) {
      return self.getChange(stock) >= 0 ? 'positive' : 'negative';
    };
  }])
  .controller('MyStocksCtrl', [function() {
    var self = this;


    self.stocks = [{
      "ticker": "TWTR",
      "name": "Twitter Inc",
      "price": 23,
      "previous": 21,
      "size": "Medium"
    }, {
      "ticker": "GOOG",
      "name": "Google Inc",
      "price": 884,
      "previous": 899,
      "size": "Large"
    }]

    self.filters = {
      favorite: true
    };

    self.toggleFilter = function() {
      if (self.filters.favorite) {
        delete self.filters.favorite;
      } else {
        self.filters.favorite = true;
      }
    };
  }]);
