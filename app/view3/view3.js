'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngStorage','firebase','angular-loading-bar','ngYoutubeEmbed','youtube-embed'])

.config(['$routeProvider', 'cfpLoadingBarProvider', function($routeProvider, cfpLoadingBarProvider) {

  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
  cfpLoadingBarProvider.includeSpinner = true; // Show the spinner.
    cfpLoadingBarProvider.includeBar = true; // 
}])

.controller('View3Ctrl', [ '$rootScope','$scope','$firebaseAuth', '$location', '$firebaseObject', '$firebaseArray', 'cfpLoadingBar', '$localStorage', function($rootScope, $scope, $firebaseAuth, $location,$firebaseArray, $firebaseObject, cfpLoadingBar,$localStorage) {
    
   
    if($localStorage.err=="true")
    {
        $location.path('/view1');
        $scope.$apply();
    }
    else{
        if($localStorage.userid){
         cfpLoadingBar.start();
    var streamID;
 
    console.log($localStorage.userid);
    
    
    var ref = firebase.database().ref();
    $scope.user = $firebaseArray(ref.child("UserInfo").child($localStorage.userid));
    $scope.user.$loaded()
    .then(function(){
       streamID = $scope.user.streamID;
        $scope.videos = $firebaseObject(ref.child("Batches").child(streamID).child("Previous"));
        $scope.videos.$loaded()
        .then (function(){
            angular.forEach($scope.videos,function(video){
                cfpLoadingBar.complete();
                console.log(video.$id);
            });
            console.log($scope.videos);
        });


    }).catch(function(error) {
        });
    
    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
            return false;
        }
    });


    $(document).bind("contextmenu",function(e) {
     e.preventDefault();
    });
    // $scope.videoID = 'r02BjXA2DiA';
    $scope.width = screen.width-100;
    $scope.height = screen.height-150;
    // console.log($(window).height());
    }
    else
    {
        $location.path("/view1");
    }
}


}])