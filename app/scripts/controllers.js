angular.module('stockMarketApp')
  .controller('AuthCtrl', ['$location', 'AlertService', 'UserService', function ($location, AlertService, UserService) {

    var self = this;
    self.login = function() {

    };
    self.register = function() {
      UserService.register(self.username, self.password).then(function(user) {
        AlertService.set('Successfully registered ' + self.username);
      }, function(err) {
        AlertService.set(err.data.msg);
      });
    };
  }])
  .controller('AppCtrl', ['AlertService', function(AlertService) {
    this.alertService = AlertService;
    this.listPageHtml = 'views/list.html';
    this.signupPageHtml = 'views/signup.html';

  }])
  .controller('LandingCtrl', ['StockService', function(StockService) {
    var self = this;
    self.stocks = [];
    StockService.query().success(function(stocks) {
      self.stocks = stocks;
    });

    self.getChange = function(stock) {
      return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
    };
    self.getChangeClass = function(stock) {
      return self.getChange(stock) >= 0 ? 'positive' : 'negative';
    };
  }])
  .controller('MyStocksCtrl', ['StockService', function(StockService) {
    var self = this;

    self.stocks = [];
    StockService.query().success(function(stocks) {
      self.stocks = stocks;
    });
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
