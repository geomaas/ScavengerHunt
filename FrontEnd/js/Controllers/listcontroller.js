module.exports = function(app) {
    app.controller('ListController', ['$scope', '$http','$location','QuestionService','$routeParams', function($scope, $http, $location, QuestionService, $routeParams) {
      var jq = jQuery.noConflict();
      ////// setting clock end cookie////////////////
      // var endDate = Date.now() + 90 * 60 * 1000;
      var endDate = Date.now() + 1 * 3 * 1000;

      jq.cookie('endDate', Math.round(endDate / 1000));
      ////////////////

      $scope.clues = QuestionService.getClues();
      console.log('listcontroller', $scope.clues);
      // if($routeParams.clueId !== undefined) {
      //  QuestionService.getSingleClue($routeParams.id).then(function(singleClueObj) {
      //      $scope.clueDetail = singleClueObj
      //  })
      // }

////// back-button //////
      $scope.goback = function(){
        $location.path('/lobby');
        console.log('clicked');
      };
//////// tranfer to individual clue page
      $scope.cluePage = function() {
        // console.log('clicked to clue page', id);
        // if($routeParams.clueId !== undefined) {
        //  QuestionService.getSingleClue($routeParams.id).then(function(singleClueObj) {
        //      $scope.clueDetail = singleClueObj
        //  })
        // }
        // $location.path('/question/' + id);
      }

////// function courtesy of http://questionandanswer.website/question/31670979-flipclock-js-countdown-1hour-without-reset
////// flipclock courtesy of flipclockjs.com
///// endDate cookie init on lobby start button

        // jq(function(){

             var countDown = function(){
                var currentDate = Math.round(new Date() / 1000);

                var clock = jq('.clock').FlipClock({
                    countdown: true,
                    callbacks: {

                        init: function() {
                            //store end date If it's not yet in cookies
                            if(!jq.cookie('endDate')){
                                // end date = current date + 60 minutes
                                var endDate = Date.now() + 90*60*1000;
                                // store end date in cookies
                                jq.cookie('endDate', Math.round(endDate / 1000));
                            }
                        },
                        stop: function() {
                          $location.path('/gameover');
                          $scope.$apply();
                          console.log('clockstopped game over');

                        },
                    }
                });
                /* counter will be at first 1 min if the user refresh the page the counter will
                   be the difference between current and end Date, so like this counter can
                   continue the countdown normally in case of refresh. */
                var counter = jq.cookie('endDate')-currentDate;
                clock.setTime(counter);
                clock.setCountdown(true);
                clock.start();
            }
            //Lanching count down on ready
            countDown();
        // });
//////// end  clock function///////


    }]);
};
