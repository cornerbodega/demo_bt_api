angular.module("countryApp")
.controller("BillingController", [
    '$scope',
    '$location',
    '$http',
    '$window',
    'pnDB',
    'OfficeOfTheTaxCollecter',
    'pnProxy',
    BillingController
])


function BillingController($scope, $location, $http, $window, pnDB, OfficeOfTheTaxCollecter, pnProxy) {
    getCurrentPlan();
    function getCurrentPlan() {

         OfficeOfTheTaxCollecter.getMyBillingAgreement()
        .then(function(res){

            var mySubscriptions = res.data
            if (mySubscriptions.length < 1){
                $location.path('/traceability/new_client')
            }
            if (mySubscriptions.length === 1) {
                $location.path('/traceability/settings/billing/my_membership')
            }
            if (mySubscriptions.length > 1) return console.log('Error! You have more than one active account! What happened?!');
        })
    }

};
