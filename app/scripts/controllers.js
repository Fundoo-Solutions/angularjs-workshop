angular.module('stockMarketApp').controller('AppCtrl', [function() {
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
  }];

  self.getChange = function(stock) {
    return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
  };
  self.getChangeClass = function(stock) {
    return self.getChange(stock) >= 0 ? 'positive' : 'negative';
  };
}]).controller('RegisterCtrl', ['AlertService', function(AlertService) {
  var self = this;

  self.register = function() {
    AlertService.set('Trying to register with ' + self.username + ' & ' + self.password);
  };
}]);
