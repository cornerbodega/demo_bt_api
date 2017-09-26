(function(){
    angular
    .module('countryApp')
    .controller('MarketController', ['$scope','$location', 'pnDB',
    MarketController
])

function MarketController($scope, $location, pnDB) {
    if(!sessionStorage.sessionid) $location.path('/');

    pnDB.getBuyListings().then(function(wtb){
        console.log(wtb);
        $scope.wtb = wtb;
    })
    pnDB.getSellListings().then(function(wts){
        console.log(res);
        $scope.wts = wts;
    })

};

})();
