'use strict';

angular.module('myApp.view2', ['ngRoute','firebase','angular-loading-bar', 'ngStorage'])

.config(['$routeProvider', 'cfpLoadingBarProvider', function($routeProvider, cfpLoadingBarProvider) {

  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
  cfpLoadingBarProvider.includeSpinner = true; // Show the spinner.
    cfpLoadingBarProvider.includeBar = true; // 
}])

.controller('View2Ctrl', [ '$rootScope','$scope','$firebaseAuth', '$location', '$firebaseObject', '$firebaseArray', 'cfpLoadingBar', '$localStorage', function($rootScope, $scope, $firebaseAuth, $location,$firebaseArray, $firebaseObject, cfpLoadingBar, $localStorage) {
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     console.log(user);
//     $location.path('/view2');
//     $scope.$apply();
//   } else {
//     // No user is signed in.
//     console.log("hi");
//   }
// });
cfpLoadingBar.start();
	var ref = firebase.database().ref("Batches");
	$scope.batches = $firebaseObject(ref); 
	$scope.batches.$loaded()
    .then(function(){
    	cfpLoadingBar.complete();
});
$scope.userinfo.login = true;

$scope.setBatchId = function(batchId){
	$rootScope.userinfo.streamID = batchId;
	console.log($rootScope.uid);
	var ref = firebase.database().ref("UserInfo");
	ref.child($rootScope.uid).once('value', function(snapshot) {
	    if(snapshot.exists()){
	    	console.log("You are already logged in from another device Please Try from that device..");
	    	alert("You are already logged in from another device Please Try from that device..");
	    	$localStorage.err ="true";
	    	$location.path("/view1");
	    }
	    else{
	    	var user_ref = firebase.database().ref('UserInfo/' + $rootScope.uid);
	    	user_ref.set(
	    		$rootScope.userinfo
	    	).then(function(){
	    		console.log("data added");
	    		$location.path('/view3');
	    		$scope.$apply();
	    		
	    	});
	    	console.log("user logging in for the first time");

	    }
	});	
}


	// console.log($rootScope.uid);
	// var ref = firebase.database().ref();
	// $scope.user = $firebaseArray(ref.child("UserInfo").child($rootScope.uid));
	// $scope.user.$loaded()
	// .then(function(){
	// 	console.log($scope.user.branch);
	// });

	// $scope.setBatchId = function(batchId){
	// 	$rootScope.userinfo.streamID = batchId;
	// 	console.log($rootScope.userinfo);
	// 	$location.path("/view3");
	
	// }
	// cfpLoadingBar.start();
	// var ref = firebase.database().ref("Batches");
	// $scope.batches = $firebaseObject(ref); 
	// $scope.batches.$loaded()
 //    .then(function(){
 //    	cfpLoadingBar.complete();
 //    	// var i =0;
 //     //    angular.forEach(batches, function(batch) {
 //     //        // console.log(batch.$id);
 //     //        var myCol = $('<div class="col-sm-4 col-md-4 pb-2"></div>');
 //    	// 	var myPanel = $('<div class="card " style= "width:20rem; height: 25rem" id="'+i+'Panel"><img class="card-img-bottom" width ="286px" height="180px" src= "'+batch.batchImage+'" alt= "'+batch.batchName+'"><div class="card-body"><h3 class="card-title">'+batch.batchName+'</h3><p class="card-text"><span class="font-weight-bold">Batch Days :</span>'+' '+batch.batchDays+'</p><p class="card-text"> <span class="font-weight-bold">Batch Timing :</span>'+ ' '+batch.batchTime1+'</p><br/><div class="text-center"><button  ng-click ="setBatchId()" class="btn btn-primary stretched-link text-center">Selet</button></div></div></div>');
 //    	// 	myPanel.appendTo(myCol);
 //    	// 	myCol.appendTo('#card-container');
 //    	// 	i+=1;
 //     //    })
 //    });

    


}])