module.exports = function(app){
  app.controller('StartController',['$scope','$http','$location',function($scope,$http,$location){
    var jq = jQuery.noConflict();
    jq.removeCookie('start');

$scope.info = function(){
  $location.path('/info1')
  console.log('something')
}
$scope.newSession = function(){
  jq.removeCookie('start');

$location.path('/create')
}
$scope.joinSession = function(){
  jq.removeCookie('start');

  $location.path('/join')
}

}])
}
