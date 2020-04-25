'use strict';

angular.module('myApp.view1', ['ngRoute','ngStorage','firebase','angular-loading-bar'])

.config(['$routeProvider', 'cfpLoadingBarProvider', function($routeProvider , cfpLoadingBarProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
  cfpLoadingBarProvider.includeSpinner = true; // Show the spinner.
  cfpLoadingBarProvider.includeBar = true; //
}])

.controller('View1Ctrl', ['$rootScope','$localStorage','$scope', '$firebaseAuth', '$location', '$firebaseArray', '$firebaseObject', 'cfpLoadingBar',  function($rootScope, $localStorage, $scope, $firebaseAuth, $location, $firebaseArray, $firebaseObject, cfpLoadingBar) {
	$scope.colleges = ["GGITS", "GGCT" , "GLOBAL", "HCET", "JEC", "KALA NIKETAN", "MGMM", "OIST" , "OEC", "SRIT" ,"SRIST", "SGBM", "ST ALLOY", "TIETECH","VIT"];
	$scope.branches = ["CS", "IT", "EC", "EX", "MECH", "BSC", "BCom", "MCA", "M TECH", "Polytechnic", "BCA"];
	$scope.semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "X", "XI", "XII","PASS OUT"];
	var auth = $firebaseAuth();

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {

	    // User is signed in.
	    // console.log(user.uid);
	    if($localStorage.err=="true"){
	    	$location.path('/view1');
	    }
	    else{
	    	$localStorage.userid = user.uid;
	   		console.log($localStorage.userid);
	    	$rootScope.uid = user.uid;
	    
	    // console.log($rootScope.uid);
	    	$location.path('/view3');
	    	$scope.$apply();
	    }
	   	
	  } else {
	    // No user is signed in.
	    console.log("hi");
	  }
	});
	$scope.signIn =function(){
		cfpLoadingBar.start();

		$rootScope.userinfo = $scope.user;
		console.log($rootScope.userinfo);

		var email = $scope.user.email;
		var password = $scope.password;

		auth.$signInWithEmailAndPassword(email,password).then(function(firebaseUser) {
			cfpLoadingBar.complete();
	    	$rootScope.uid = firebaseUser.uid;
			console.log($rootScope.uid);
			$location.path("/view2")
	// 		var ref = firebase.database().ref("UserInfo");
	// 	ref.child($rootScope.uid).once('value', function(snapshot) {
	//     if(snapshot.exists()){
	//     	console.log("ash;ldl");
	//     	$localStorage.err ="true";
	//     	console.log($localStorage.err);
	//     	cfpLoadingBar.complete();
	//     	console.log("You are already logged in from another device Please Try from that device..");
	//     	alert("You are already logged in from another device Please Try from that device..");
	//     	$location.path('/view1');
	//     }
	//     else{
	//     	console.log("shadr");
	//     	cfpLoadingBar.complete();
	//     	$rootScope.uid = firebaseUser.uid;
	// 		console.log($rootScope.uid);
	// 		$location.path("/view2");
	//     }
	// });	
			
			
			
	
  	// 	console.log("Signed in as:", firebaseUser.uid);
		}).catch(function(error) {
  		console.error("Authentication failed:", error);
		});
		
		
	}
	
}]);