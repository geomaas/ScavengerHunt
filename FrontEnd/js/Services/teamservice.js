module.exports = function(app) {
    app.factory('TeamService', ['$http', function($http) {
        return {
          getTeams: function(){
            $http({
                url: '/get-teams/17',
                method: 'GET',
            }).then(function(data) {
              //JSON.parse(data);
              console.log(s+ ""+ data);

            }).catch(function(data) {
              console.log('error! error! bzzzt!')

            });
          }
        }//end of return
    }]);//end of factory
};
