angular.module("countryApp")
.factory("ManifestRequests", ManifestRequests)

function ManifestRequests(pnDB, $rootScope) {
    var _m = {
        init: init,
    };


    function init() {
        pnDB.getFromDB('select * from wts_manifest_requests where status="new" and wts_creator_ubi ="'+sessionStorage.ubi+'"')
        .then(function(res){
            console.log(res);

            _m.data =res.data
            console.log(_m.data);
            $rootScope.$broadcast('manifest_requests')

        })

    }



    return _m;
}
// function getDetailsForBillingAgreement(amazonBillingAgreementId) {
//     return pnProxy("https://abctraceability.com/wa/Billing/Payments/PayWithAmazon/pnGetBillingAgreementDetails.php",
//     {amazonBillingAgreementId: amazonBillingAgreementId})
// }
// function getMyBillingAgreement() {
//     return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed"')
// }
