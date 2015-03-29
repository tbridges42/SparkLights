var app = angular.module('spark', ['ngResource'])

app.factory("Color", function($resource) {
  return $resource("https://api.spark.io/v1/devices/51ff70065082554913470887/color?access_token=638d5953ac770e5ad3d84d8230066d4db7957fc3");
})

app.factory("Pattern", function($resource) {
  return $resource("https://api.spark.io/v1/devices/51ff70065082554913470887/pattern?access_token=638d5953ac770e5ad3d84d8230066d4db7957fc3");
})

.config(['$httpProvider', function($httpProvider) {
}])

app.controller('MainCtrl', function($scope, $interval, Light) {
    $interval(function() {
        $scope.data = Light.get({}, function(){
            $scope.color = $scope.data.result;
        });
    }, 10000);    
});

app.controller('Colors', function($scope,$http,$interval, Color, Pattern) {
	$scope.setColor = function($color) {
		$http({
			url:"https://api.spark.io/v1/devices/51ff70065082554913470887/setcolor/",
			method: "POST",
			data: {"args":$color},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 638d5953ac770e5ad3d84d8230066d4db7957fc3'
			}
			})
	};
	$scope.setPattern = function($pattern) {
		$http({
			url:"https://api.spark.io/v1/devices/51ff70065082554913470887/setpattern/",
			method: "POST",
			data: {"args":$pattern},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 638d5953ac770e5ad3d84d8230066d4db7957fc3'
			}
			})
	};
	$interval(function() {
        $scope.data1 = Color.get({}, function(){
            $scope.color = $scope.data1.result;
        });
		$scope.data2 = Pattern.get({}, function(){
            $scope.pattern = $scope.data2.result;
        });
    }, 1000);

});