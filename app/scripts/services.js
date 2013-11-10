angular.module('stockMarketApp')
  .factory('AlertService', function() {
    var message;
    return {
      set: function(msg) {
        message = msg;
      },
      clear: function() {
        message = null;
      },
      get: function() {
        return message;
      }
    };
  }).factory('StockService', ['$http', function($http) {

    return {
      query: function() {
        return $http.get('/api/stocks');
      },
      dashboard: function() {
        return $http.get('/api/dashboard');
      },
      get: function(code) {
        return $http.get('/api/stocks/' + code);
      }
    };
  }]).factory('UserService', ['$http', function($http) {
    return  {
      login: function(username, pwd) {
        return $http.post('/api/login', {username: username, password: pwd});
      },
      logout: function() {
        return $http.post('/api/logout', {});
      },
      register: function(username, pwd) {
        return $http.post('/api/register', {username: username, password: pwd});
      }
    };
  }]);

