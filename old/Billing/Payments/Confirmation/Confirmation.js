angular.module("countryApp")
.controller('PaymentConfirmationController', [
    '$scope',
    '$location',

PaymentConfirmationController])


function PaymentConfirmationController($scope, $location) {
    console.log('PaymentConfirmation!!!!');
    var path = $location.path();
    $scope.task = 'PaymentConfirmation';


    $scope.submitButton = TraceabilityMenuService.getIconAndLabel($scope.task);

}
