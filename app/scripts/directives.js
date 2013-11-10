angular.module('stockMarketApp').directive('stockDash', ['UserService', 'StockService', '$timeout', function(UserService, StockService, $timeout) {
  return {
    restrict: 'A',
    templateUrl: 'views/stock-dash.html',
    scope: {
      stockData: '=',
      whenToggle: '&'
    },
    link: function($scope, $element, $attrs) {

      $scope.getChange = function() {
        return Math.ceil((($scope.stockData.price - $scope.stockData.previous) / $scope.stockData.previous) * 100);
      };
      $scope.getChangeClass = function() {
        return $scope.getChange() >= 0 ? 'positive' : 'negative';
      };
      $scope.toggleFavorite = function() {
        StockService.toggleFavorite($scope.stockData.ticker).then(function(stocks) {
          if ($scope.whenToggle) {
            $scope.whenToggle();
          }
        }, function(err) {});
      };
      $scope.shouldShowButtons = function() {
        return UserService.isLoggedIn();
      };

      var fetchStockDetail = function() {
        StockService.get($scope.stockData.ticker).success(function(stockData) {
          $scope.stockData.history = stockData.history;
          $scope.stockData.price = stockData.price;
          $scope.stockData.previous = stockData.previous;
          $timeout(fetchStockDetail, 5000);
        });
      };
      $timeout(fetchStockDetail, 5000);
    }
  };
}]).directive('lineChart', ['$timeout', '$window', function($timeout, $window) {
    return {
      restrict: 'A',
      scope: {
        graphData: '='
      },
      link: function($scope, $element, $attrs) {
        var checkAndContinue = function() {
          if ($window.googleChartsLoaded) {
            drawChart();
          } else {
            $timeout(checkAndContinue, 500);
          }
        };

        var dataToArray = function(priceHistory) {
          var arr = [['Index', 'Price']];
          for (var i = 0; i < priceHistory.length; i++) {
            arr.push([i, priceHistory[i]]);
          }
          return arr;
        };

        var drawChart = function() {
          var chart = new google.visualization.LineChart($element[0]);
          $scope.$watch('graphData', function(newVal) {
            if (newVal) {
              chart.draw(google.visualization.arrayToDataTable(dataToArray(newVal)), {
                height: 70,
                legend: {position: 'none'}
              });
            }

          }, true);
        };
        checkAndContinue();

      }
    };
  }]);
