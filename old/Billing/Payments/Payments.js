// PaymentsController is where the rubber meets the road in terms of payments
// By the time the user is here, they must have selected a plan. They're already sold.
// But not really -- because technically, and importantly, they're not yet paying potnet.net.
// PaymentsController is where all that changes forever.


angular.module("countryApp")
.controller('PaymentsController', PaymentsController)
// pnAmazonWallet: direcetive which sets OfficeOfTheTaxCollecter.amazonBillingAgreementId
.directive('pnAmazonWallet', ['$rootScope', 'OfficeOfTheTaxCollecter', pnAmazonWallet])

// pnRecurringPaymentsWidget: direcetive which sets OfficeOfTheTaxCollecter.buyerBillingAgreementConsentStatus
.directive('pnRecurringPaymentsWidget', ['$rootScope','OfficeOfTheTaxCollecter', pnRecurringPaymentsWidget])


function PaymentsController(
    $scope,
    $location,
    OfficeOfTheTaxCollecter,
    TraceabilityMenuService,
    pnProxy,
    pnDB,
    pnLogger) {
    console.log('PAYMENTS CONTROLLER!!!!');
    var path = $location.path();
    if (!OfficeOfTheTaxCollecter.myPlan) {console.log('NO PLAN SELECTED!!'); $location.path('/traceability/settings/billing')}
    $scope.myPlan = OfficeOfTheTaxCollecter.myPlan
    $scope.task = 'payments'
    $scope.consent = false
    console.log('PAYMENTS!!');
    $scope.$on('consent', function(event, data){
        init();
        $scope.consent = true;
        $scope.$apply();
    });

    init();
    function init() {
    };

    $scope.submitButton = TraceabilityMenuService.getIconAndLabel($scope.task);
    // $scope.$on('consent', function(){
    //
    // })
    $scope.classForSubmitButton = function() {
        if(OfficeOfTheTaxCollecter.buyerBillingAgreementConsentStatus === 'true') {
            return "btn btn-lg btn-success"
        }
        else {
            return "btn btn-lg grey"
        };
    };
    $scope.checkout = function($event) {


        var date = parseInt(Date.now() /1000)
        var authorizationReferenceId = date + '-' +sessionStorage.ubi + '-' + parseInt($scope.myPlan.price) +'-'+ $scope.myPlan.id
        console.log(OfficeOfTheTaxCollecter.amazonBillingAgreementId);
        var config = {
            amazonBillingAgreementId: OfficeOfTheTaxCollecter.amazonBillingAgreementId,
            authorizationReferenceId: authorizationReferenceId,
            charge_amount: $scope.myPlan.price
        }

        pnProxy('https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnAmazonPayments.php', config)
        .then(updateBillingTable).then(informOfficeOfTheTaxCollecter).then(sendPaymentEmails)
        .then(goToDashboard)
        // .then(goToDashboard)
        // .then(goToBilling)

        function sendPaymentEmails() {
            return pnLogger.newPayment({plan: OfficeOfTheTaxCollecter.myPlan})
        }
        function informOfficeOfTheTaxCollecter(){
            return OfficeOfTheTaxCollecter.init()
        }
        function goToBilling() {
            $location.path('/traceability/settings/billing')
        }
        function goToDashboard() {
            $location.path('/traceability')
        }
        function goToSettings() {
            $location.path('/traceability/settings')
        }
        function updateBillingTable(res) {
            var ubi = sessionStorage.ubi
            return subscribeMe(config).then(function(res){console.log(res); return res})

            function subscribeMe(config) {
                return pnDB.saveToDB('billing', {
                    ubi: sessionStorage.ubi,
                    status:'subscribed',
                    amazonBillingAgreementId: config.amazonBillingAgreementId,
                    authorizationReferenceId: config.authorizationReferenceId,
                    at: Date.now(),
                    plan: OfficeOfTheTaxCollecter.myPlan.id
                });
            };
        };
        function print (res){
            console.log(res);

        }
    }
}
function pnRecurringPaymentsWidget($rootScope, OfficeOfTheTaxCollecter) {
    return {
        restrict: 'EA',
        scope: {},
        template: '<div id="consentWidgetDiv" style="width:auto;height:140px;" layout-padding>',
        link: function($scope, elem, attrs) {
            // var amazonBillingAgreementId = ""
            $scope.$on('amazonBillingAgreementId', function(event, amazonBillingAgreementId) {
                console.log(amazonBillingAgreementId);
                // var amazonBillingAgreementId = data
                // console.log(amazonBillingAgreementId);
                var consent = new OffAmazonPayments.Widgets.Consent({
                    sellerId: 'A4KQK2W3E6C9U',
                    // amazonBillingAgreementId obtained from the Amazon Address Book widget.
                    amazonBillingAgreementId: amazonBillingAgreementId,
                    design: {
                        designMode: 'responsive'
                    },
                    onReady: function(billingAgreementConsentStatus){
                        init();
                        function init() {
                            if (!billingAgreementConsentStatus.getConsentStatus) {
                                window.setTimeout(init,1000);
                            }
                            else {
                                buyerBillingAgreementConsentStatus = billingAgreementConsentStatus.getConsentStatus();
                                OfficeOfTheTaxCollecter.buyerBillingAgreementConsentStatus = buyerBillingAgreementConsentStatus
                                console.log('GOT CONSENT!' + OfficeOfTheTaxCollecter.buyerBillingAgreementConsentStatus);
                                $rootScope.$broadcast('consent')
                            }

                        }
                    },
                    onConsent: function(billingAgreementConsentStatus) {
                        buyerBillingAgreementConsentStatus =
                        billingAgreementConsentStatus.getConsentStatus();

                        OfficeOfTheTaxCollecter.buyerBillingAgreementConsentStatus = buyerBillingAgreementConsentStatus
                        $rootScope.$broadcast('consent')
                    },
                    onError: function(error) {
                        console.log(error);
                        console.log(error.getErrorCode);
                        console.log(error.getErrorMessage);
                        // your error handling code
                    }
                }).bind("consentWidgetDiv");
                $scope.$apply()
            })

        }
    };
};
function pnAmazonWallet($rootScope, OfficeOfTheTaxCollecter) {
    return {
        restrict: 'EA',
        scope: {},
        template: '<div id="walletWidgetDiv" style="width:auto;height:400px;" layout-padding>',
        link: function($scope, elem, attrs) {
            console.log(elem);
            var wallet = new OffAmazonPayments.Widgets.Wallet({
                sellerId: 'A4KQK2W3E6C9U',
                onReady: function(billingAgreement) {
                    var amazonBillingAgreementId = billingAgreement.getAmazonBillingAgreementId();
                    console.log(amazonBillingAgreementId);
                    $rootScope.$broadcast('amazonBillingAgreementId', amazonBillingAgreementId)
                    OfficeOfTheTaxCollecter.amazonBillingAgreementId = amazonBillingAgreementId
                },
                agreementType: 'BillingAgreement',
                design: {
                    designMode: 'responsive'
                },
                onPaymentSelect: function(billingAgreement) {
                    // Replace this code with the action that you want to perform
                    // after the payment method is selected.
                },
                onError: function(error) {
                    console.log('Amazon Error!');
                    console.log(error);
                    console.log(error.getErrorCode());
                    console.log(error.getErrorMessage());
                    // your error handling code
                }
            }).bind("walletWidgetDiv");

            console.log(wallet);
            console.log(elem);
        }
    }
}
