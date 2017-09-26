angular.module('countryApp')
.controller('pnSelectPlanController', pnSelectPlanController)

function pnSelectPlanController($scope, $location, pnProxy, pnSubscriptionPlans, $window) {
    $scope.plans = pnSubscriptionPlans
    $scope.selectedPlan = $scope.plans[0]
    $scope.toCheckout = function () {
        $location.path('/traceability/settings/checkout/'+ $scope.selectedPlan.id)
    }

    $scope.openTerms = function(){
        $window.open('https://abctraceability.com/wa/#/abc_MSA', '_blank');
    }
    $scope.toggleTerms = function(){
        $scope.terms =  !$scope.terms
    }
}
