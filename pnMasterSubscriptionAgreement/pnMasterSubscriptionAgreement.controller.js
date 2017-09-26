angular.module('countryApp')
.controller('pnMasterSubscriptionAgreementController', pnMasterSubscriptionAgreementController)

function pnMasterSubscriptionAgreementController($scope, $location,  $anchorScroll) {

    $scope.goToAnchor = function(anchor) {
        $location.hash(anchor)
        $anchorScroll()
    }

}
