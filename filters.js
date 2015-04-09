angular.module('numberFilters', []).filter('hexadecimal', function() {
	return function (input) {
        if (angular.isNumber(input)) {
            return "#" + Number(input).toString(16).toUpperCase();
        }

        return input;
    };
});