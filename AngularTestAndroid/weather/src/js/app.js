angular.module('HelloWorld', [
  'ngRoute',
  'mobile-angular-ui',
  'HelloWorld.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});