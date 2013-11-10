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
  }]).factory('UserService', ['$http', '$q', function($http, $q) {
    var user = {};
    var loggedIn = false;
    var loginSuccess = function(resp) {
      user = resp.data.user;
      loggedIn = true;
      return user;
    };
    var loginFailure = function(err) {
      loggedIn = false;
      console.log('Rejecting');
      return $q.reject(err.data);
    };

    return  {
      isLoggedIn: function() {
        return loggedIn;
      },
      login: function(username, pwd) {
        return $http.post('/api/login', {username: username, password: pwd}).then(loginSuccess, loginFailure);
      },
      logout: function() {
        return $http.post('/api/logout', {});
      },
      register: function(username, pwd) {
        return $http.post('/api/register', {username: username, password: pwd}).then(loginSuccess, loginFailure);
      },
      tokens: function() {
        if (loggedIn) {
          return $q.when(user);
        } else {
          return $http.post('/api/token', {}).then(loginSuccess, loginFailure);
        }
      }
    };
  }]);

