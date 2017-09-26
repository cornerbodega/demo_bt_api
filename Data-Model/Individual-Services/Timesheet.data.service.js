angular.module("countryApp")
.factory("Timesheet", Timesheet)

function Timesheet(pnDB, $rootScope) {
    var _w = {
        init: init,
    };


    function init() {
        pnDB.getFromDB('select * from timesheet where ubi="'+sessionStorage.ubi+'" and deleted <> "1" order by `at` desc')
        .then(function(res){
            console.log(res);
            var times = []
            _.map(res.data, function(d){
                console.log(d.time_in);
                d.time_in = new Date(d.time_in).toLocaleString().replace(/,/g, '')
                d.time_out = new Date(d.time_out).toLocaleString().replace(/,/g, '')
                console.log(new Date(d.time_in));
                times.push(d)
            })
            // console.log(res.data.time_in);
            // console.log(res.data.time_in);
            _w.data =times
            console.log(_w.data);
            $rootScope.$broadcast('timesheet')

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
