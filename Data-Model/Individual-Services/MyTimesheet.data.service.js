angular.module("countryApp")
.factory("MyTimesheet", MyTimesheet)

function MyTimesheet(pnDB, $rootScope) {
    var _w = {
        init: init,
    };


    function init() {
        pnDB.getFromDB('select * from timesheet where ubi="'+sessionStorage.ubi+'" and username="'+sessionStorage.username+'"and deleted <> "1" order by `at` desc')
        .then(function(res){
            console.log(res);
            _.map(res.data, function(d){
                console.log(d.time_in);
                d.time_in = new Date(d.time_in).toLocaleString()
                d.time_out = new Date(d.time_out).toLocaleString()
                console.log(new Date(d.time_in));
            })
            // console.log(res.data.time_in);
            // console.log(res.data.time_in);
            _w.data =res.data
            console.log(_w.data);
            $rootScope.$broadcast('my_timesheet')

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
