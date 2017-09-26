// Client-side Office of Billing Information for use by The Tax Collection Staff

angular.module("countryApp")
.factory("OfficeOfTheTaxCollecter",
    OfficeOfTheTaxCollecter
)


function OfficeOfTheTaxCollecter(pnDB, pnProxy, $location, $rootScope) {
    _o = {
        daysLeft: 0,
        getMyBillingAgreement: getMyBillingAgreement,
        getDetailsForBillingAgreement: getDetailsForBillingAgreement,
        init: init,
    };

    function getDetailsForBillingAgreement(amazonBillingAgreementId) {
        return pnProxy("https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnGetBillingAgreementDetails.php",
        {amazonBillingAgreementId: amazonBillingAgreementId})
    }
    function getMyBillingAgreement() {
        console.log('Getting Billing Agreement for ' + sessionStorage.ubi);
        return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed"')
    }

    init();
    function init(){


        return getMyBillingAgreement().then(function(res){
            // ENABLE FOR OPEN SEASON
            sessionStorage.taxPayer = true
            $rootScope.$broadcast('taxpayer', true)
            //
            // Not a taxpayer: Red light
            // if(res.data.length == 0) {
            //     console.log(res);
            //     console.log('NO TAXPAYER INFORMATION FOUND');
            //     sessionStorage.taxPayer = false;
            //     console.log('TAXPAYER: NO');
            //     $rootScope.$broadcast('taxpayer', false)
            //
            // }
            // // Taxpayer: Green Lighspot
            // else {
            //     console.log('TAXPAYER: YES');
            //     _o.myMembership = res.data[0];
            //     // $rootScope.$broadcast('taxpayer', true)
            //     // sessionStorage.taxPayer = true
            //
            //     setPlanStatus(_o.myMembership);
            //     // console.log(_o.myMembership);
            // }
        })
    }

    function setPlanStatus(m) {
        var now = Date.now();
        // console.log(m.at);
        // console.log(now);
        var days = 0;
        if (m.plan === "w") {
            days = 7;
        }
        if (m.plan === "m") {
            days = 31;
        }
        if (m.plan === "q") {
            days = 90;
        }
        var daysElapsed = (now - m.at) / 86400000;


        // MUST BE RELATIVE TO WHICH PLAN (OBVIOUSLY)
        // console.log(m);
        var daysLeft = parseInt(days - daysElapsed);
        $rootScope.$broadcast('daysLeft', daysLeft)
        _o.daysLeft = daysLeft;
        console.log(daysLeft);

        if (daysLeft > 0) {
            sessionStorage.taxPayer = true;
            $rootScope.$broadcast('taxpayer', true)

        }
        else {
            // console.log();
            var dateLabel = new Date(Date.now()).toLocaleString()
            pnDB.saveToDB('billing', {
                ubi: sessionStorage.ubi,
                status: 'Expired at ' + dateLabel
            }).then(function() {
                console.log('ACCESS EXPIRED!');
                // // TODO: EMAIL POTNET HERE!
                sessionStorage.taxPayer = false;
                $rootScope.$broadcast('taxpayer', false)

                // $location.path('/traceability/settings/billing/new_client')
            })


            // return pnDB.saveToDB('billing', {
            //     ubi: sessionStorage.ubi,
            //     status:'subscribed',
            //     amazonBillingAgreementId: config.amazonBillingAgreementId,
            //     authorizationReferenceId: config.authorizationReferenceId,
            //     at: date.now(),
            //     plan: OfficeOfTheTaxCollecter.myPlan.id
            // });
        }

    }

    return _o;
};
