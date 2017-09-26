angular.module("countryApp")
.factory("WtsListings", WtsListings)

function WtsListings(pnDB, $rootScope) {
    var _w = {
        init: init,
    };


    function init() {
        pnDB.getFromDB('select * from wts_listings where status="new" order by `at` desc')
        .then(function(res){
            console.log(res);

            _w.data =res.data
            console.log(_w.data);
            $rootScope.$broadcast('wts_listings')

        })

    }



    return _w;
}
// function getDetailsForBillingAgreement(amazonBillingAgreementId) {
//     return pnProxy("https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnGetBillingAgreementDetails.php",
//     {amazonBillingAgreementId: amazonBillingAgreementId})
// }
// function getMyBillingAgreement() {
//     return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed"')
// }
