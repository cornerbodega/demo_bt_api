angular.module("countryApp")
.controller("CancelController", [
    '$scope',
    '$location',
    'pnProxy',
    'pnDB',
    'OfficeOfTheTaxCollecter',
CancelController])

function CancelController($scope, $location, pnProxy, pnDB, OfficeOfTheTaxCollecter) {
    // if (!OfficeOfTheTaxCollecter.amazonBillingAgreementId) $location.path('/traceability/settings/billing')
    $scope.dontCancel = function() {
        $location.path('/traceability/settings/billing')
    }
    $scope.doCancel = function() {
        cancel();
    }
// B01-0100418-4806529

    OfficeOfTheTaxCollecter.getMyBillingAgreement().then(init)
    function init(res){
        console.log(res.data[0]);
        $scope.amazonBillingAgreementId = res.data[0].amazonBillingAgreementId
        console.log($scope.amazonBillingAgreementId);
    }
    // function informTaxCollecterOfCurrentPlan(amazonBillingAgreementId) {
    //     OfficeOfTheTaxCollecter.amazonBillingAgreementId = amazonBillingAgreementId;
    // }
    var tries = 0
    function cancel() {
        if (tries > 2) return console.log('Unable to get Billing Agreement');
        if(!$scope.amazonBillingAgreementId) {
            window.setTimeout(init, 1000);
            tries ++;
        }
        pnProxy("https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnCancel.php",
            {amazonBillingAgreementId: $scope.amazonBillingAgreementId})
        .then(function(res){
            console.log(res);
            return pnProxy("https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnGetBillingAgreementDetails.php",
            {amazonBillingAgreementId: $scope.amazonBillingAgreementId})
        })
        .then(function(res){
            console.log(res);
            if (res.data.GetBillingAgreementDetailsResult.BillingAgreementDetails.BillingAgreementStatus.ReasonCode === "SellerClosed"){
                pnDB.unsubscribeMe().then(function(){
                    $location.path('/traceability/settings/logout')
                })

            }


        })


    }

}
