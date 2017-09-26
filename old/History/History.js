angular.module('countryApp')
.controller('HistoryController',
[
    '$scope',
    '$location',
    'pnDB',
    '$window',
    HistoryController
])

function HistoryController($scope, $location, pnDB, $window) {
    pnDB.getFromDB('select * from history where ubi="' + sessionStorage.ubi+'" order by `id` desc')
    .then(function(hres){
        $scope.history = _.map(hres.data, function(transaction){
            transaction.res = JSON.parse(transaction.res)
            transaction.req = JSON.parse(transaction.req)
            transaction.req = _.omit(transaction.req, ['sessionid','API'])
            return transaction
        })

        // $scope.openLcbApiPage = function() {
        //     $window.open('http://www.liq.wa.gov/mj2015/traceability_system', '_blank');
        // }

    })
}
