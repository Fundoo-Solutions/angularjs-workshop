angular.module('stockMarketApp')
  .controller('AuthCtrl', ['$location', 'AlertService', 'UserService', function ($location, AlertService, UserService) {

    var self = this;
    self.login = function() {
      UserService.login(self.username, self.password).then(function(user) {
        $location.path('/mine');
      }, function(err) {
        AlertService.set(err.msg);
      });
    };
    self.register = function() {
      UserService.register(self.username, self.password).then(function(user) {
        $location.path('/mine');
      }, function(err) {
        AlertService.set(err.data.msg);
      });
    };
  }])
  .controller('AppCtrl', ['AlertService', 'UserService', function(AlertService, UserService) {
    this.alertService = AlertService;
    this.userService = UserService;

  }])
  .controller('LandingCtrl', ['StockService', function(StockService) {
    var self = this;
    self.stocks = [];
    StockService.query().success(function(stocks) {
      self.stocks = stocks;
    });

  }])
  .controller('LogoutCtrl', ['UserService', '$location', function(UserService, $location) {
    UserService.logout().then(function() {
      $location.path('/all');
    });
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
