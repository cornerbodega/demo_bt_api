(function(){
    angular
    .module('countryApp')
    .controller('AllController', ['$scope','$location', 'pnDB',
    AllController
])

function AllController($scope, $location, pnDB) {
    if(!sessionStorage.sessionid) $location.path('/');

    pnDB.getBuyListings().then(function(res){
        console.log(res.data);
        $scope.wtb = res.data;
    })
    pnDB.getSellListings().then(function(res){
        console.log(res.data);
        $scope.wts = res.data;
        console.log($scope.wts);
        // $scope.$apply()
    })

};

})();
