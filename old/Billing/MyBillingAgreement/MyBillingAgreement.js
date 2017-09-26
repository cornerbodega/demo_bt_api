angular.module("countryApp")
.controller("MyBillingAgreementController", [
    '$scope',
    '$location',
    '$http',
    '$window',
    'pnDB',
    'OfficeOfTheTaxCollecter',
    'pnProxy',
    MyBillingAgreementController
])
// .directive('pnPayWithAmazonButton', pnPayWithAmazonButton)


function MyBillingAgreementController($scope, $location, $http, $window, pnDB, OfficeOfTheTaxCollecter, pnProxy) {
    $scope.openTerms = function(){
        // $location.path('/terms');
        $window.open('https://abctraceability.com/wa/#/terms', '_blank');
    }
    $scope.toCancel = function() {
        $location.path('/traceability/settings/billing/cancel')
    }
    $scope.plans = [
        // { label: 'Daily', id: 'daily', price: 10 },
        // { label: 'Weekly', id: 'weekly', price: 39 },
        { label: 'Monthly', id: 'monthly',  price: 222 },
        { label: 'Quarterly', id: 'quarterly' , price: 444 },
    ];

    $scope.setSelectedPlan = function(plan) {
        console.log(plan);
        // deselectAll()
        $scope.selectedPlan = plan
        OfficeOfTheTaxCollecter.myPlan = plan
        // plan.$selected = true;
    }
    getCurrentPlan();
    function getCurrentPlan() {
        // return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed" order by `id` desc')
         OfficeOfTheTaxCollecter.getMyBillingAgreement()
        .then(function(res){
            console.log(res);
            var mySubscriptions = res.data
            if (mySubscriptions.length != 0) {
                $scope.currentSubscriber = true
                // console.log(OfficeOfTheTaxCollecter.getBillingAgreementDetails());
                OfficeOfTheTaxCollecter.getDetailsForBillingAgreement(mySubscriptions[0].amazonBillingAgreementId)

                .then(function(res){
                    console.log(res);
                    $scope.myBillingAgreement = res.data
                    console.log($scope.myBillingAgreement);

                })
            }
            if (mySubscriptions.length > 1) return console.log('Error! You have more than one active account! What happened?!');
        })
    }
    // function getMyBillingAgreement() {
    //     return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed" order by `id` desc')
    // }




    // $scope.myPlan = OfficeOfTheTaxCollecter.myCurrentPLant
    //
    // function deselectAll() {
    //     _.map($scope.plans, function(plan){
    //          plan.$selected = false;
    //     })
    // }

    // function getUserInfoFromAmazon() {
    //     return pnProxy('https://abctraceability.com/wa/Landmazon/landmazon_get_user_info_from_amazon.php',
    //     {access_token: access_token})
    // }

//   POST /OffAmazonPayments/2013-01-01?AWSAccessKeyId=
//   &Action=GetServiceStatus
//   &SellerId=A4KQK2W3E6C9U
//   &SignatureVersion=2
//   &Timestamp=2016-09-14T03%3A42%3A13Z
//   &Version=2013-01-01
//   &Signature=rznEQzClmX3f42eKKEmsI54SRU2BOVj9tciSREywVgY%3D
//   &SignatureMethod=HmacSHA256 HTTP/1.1
// Host: mws.amazonservices.com
// x-amazon-user-agent: AmazonJavascriptScratchpad/1.0 (Language=Javascript)
// Content-Type: text/xml

};

function pnPayWithAmazonButton() {
    return {
        restrict: 'E',
        scope: {},
        template: '<div id="AmazonPayButton" style="width:100%;height:140px;" layout-padding>',
        link: function($scope, elem, attrs) {
            var authRequest;
             OffAmazonPayments.Button("AmazonPayButton", "A4KQK2W3E6C9U", {
               type:  "PwA",
            //    color: "ENTER_COLOR_PARAMETER",
               size:  "large",

               authorization: function() {
                 loginOptions =
                   {scope: "payments:widget", popup: "true"};
                 authRequest = amazon.Login.authorize (loginOptions,
                   "https://abctraceability.com/wa/#/traceability/settings/billing/payments");
                //    amazon.Login.authorize(options, 'https://abctraceability.com/wa/#/landmazon-login-successful');
               },
               onError: function(error) {
                 // your error handling code
               }
             });
        }
    };
};
