angular.module('countryApp')
.controller('pnCheckoutController', pnCheckoutController)

function pnCheckoutController($scope, $location, pnProxy, $routeParams, pnSubscriptionPlans, $sce) {
    // console.log(pnSubscriptionPlans);
    $scope.plan = _.find(pnSubscriptionPlans, {id: $routeParams.id})
    // console.log($scope.plan);
    $scope.planUrl = $sce.trustAsResourceUrl('https://abctraceability.com/wa/pnCheckout/pnPaymentServer/create_subscription.'+$scope.plan.id+'.php')
    console.log($scope.planUrl);
    // $scope.purchase = function () {
    //     pnProxy('https://abctraceability.com/wa/pnCheckout/pnPaymentServer/create_subscription.php', {
    //             plan: $scope.selectedPlan,
    //         }
    //     )
    // }



}
