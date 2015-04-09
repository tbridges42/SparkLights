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

app.filter('hexadecimal', function() {
	return function (input) {
        if (angular.isNumber(input)) {
            var tempString = Number(input).toString(16).toUpperCase();
			var temp;
			for (var i=1; i<6; i++) {	
				temp = Math.pow(16,i);
				if (input < temp){
					tempString = "0" + tempString;
				}
			}
			var r = parseInt(tempString.substr(0, 2), 16),
				g = parseInt(tempString.substr(2, 2), 16),
				b = parseInt(tempString.substr(4, 2), 16);

			return '#' +
				((0|(1<<8) + r * 5).toString(16)).substr(1) +
				((0|(1<<8) + g * 5).toString(16)).substr(1) +
				((0|(1<<8) + b * 5).toString(16)).substr(1);
        }
        return input;
    };
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
			$scope.oldColor = $scope.color;
            $scope.color = $scope.data1.result;
			if ($scope.color != $scope.oldColor) {
				$scope.apply();
			}
        });
		$scope.data2 = Pattern.get({}, function(){
            $scope.pattern = $scope.data2.result;
        });
    }, 500);

});