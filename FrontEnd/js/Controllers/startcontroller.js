module.exports = function(app){
  app.controller('InfoController',['$scope','$http','$location',function($scope,$http,$location){
console.log('something')
$scope.info = function(){
  $location.path('/info1')
}

}])
}
