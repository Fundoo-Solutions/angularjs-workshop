angular.module('stockMarketApp').directive('stockDash', [function() {
  return {
    restrict: 'A',
    templateUrl: 'views/stock-dash.html',
    scope: {
      stockData: '='
    },
    link: function($scope, $element, $attrs) {

      $scope.getChange = function() {
        return Math.ceil((($scope.stockData.price - $scope.stockData.previous) / $scope.stockData.previous) * 100);
      };
      $scope.getChangeClass = function() {
        return $scope.getChange() >= 0 ? 'positive' : 'negative';
      };
    }
  };
}]);
