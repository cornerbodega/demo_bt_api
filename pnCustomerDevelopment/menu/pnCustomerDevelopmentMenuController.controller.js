angular.module('countryApp')
.controller('pnCustomerDevelopmentMenuController', pnCustomerDevelopmentMenuController)

function pnCustomerDevelopmentMenuController($scope, $location) {
    $scope.pnTo = function (path) {
        $location.path('/customer_development/' + path)
    }
}
