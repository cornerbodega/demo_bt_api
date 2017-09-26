angular.module("countryApp")
.controller("NewClientController", [
    '$scope',
    '$location',
    '$window',
    'OfficeOfTheTaxCollecter',
    NewClientController
])
.directive('pnPayWithAmazonButton', pnPayWithAmazonButton)


function NewClientController($scope, $location, $window, OfficeOfTheTaxCollecter) {
    $location.path('/traceability')
    $scope.openTerms = function(){
        // $location.path('/terms');
        $window.open('https://abctraceability.com/wa/#/terms', '_blank');
    }
    $scope.toCancel = function() {
        $location.path('/traceability/settings/billing/cancel')
    }
    $scope.plans = [
        // { label: 'One Day', id: 'daily', price: '10.00' },
        { label: 'One Week', id: 'w', price: 50 },
        { label: 'One Month', id: 'm',  price: 200 },
        { label: 'One Quarter (Save 20%)', id: 'q' , price: 500 },
    ];

    $scope.setSelectedPlan = function(plan) {
        console.log(plan);
        // deselectAll()
        $scope.selectedPlan = plan
        OfficeOfTheTaxCollecter.myPlan = plan
        // plan.$selected = true;
    }

};

function pnPayWithAmazonButton() {
    return {
        restrict: 'E',
        scope: {},
        template: '<div id="AmazonPayButton">',
        link: function($scope, elem, attrs) {
            var authRequest;
             OffAmazonPayments.Button("AmazonPayButton", "A4KQK2W3E6C9U", {
               type:  "PwA",
            //    color: "ENTER_COLOR_PARAMETER",
               size:  "medium",

               authorization: function() {
                 loginOptions =
                   {scope: "payments:widget", popup: "true"};
                 authRequest = amazon.Login.authorize (loginOptions,
                   "https://abctraceability.com/wa/#/traceability/new_client/payments");
                //    amazon.Login.authorize(options, 'https://abctraceability.com/wa/#/landmazon-login-successful');
               },
               onError: function(error) {
                 // your error handling code
               }
             });
        }
    };
};
