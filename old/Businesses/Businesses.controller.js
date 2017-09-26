(function(){
    angular
    .module('countryApp')
    .controller('BusinessesController', ['$scope','pnBusinesses',
    BusinessesController
])

function BusinessesController($scope, pnBusinesses) {
    // if(pnData.data.vendors) {
    //     $scope.vendors = pnData.data.vendors;
    //     $scope.pnData = true;
    // }
    // $scope.$on('pnData', function(){
    //     $scope.pnData = true;
    //     $scope.vendors = pnData.data.vendors
    // })
    // if(pnData.data.businesses) init()

    $scope.$on('pnBusinesses', function() {
        init();
    })
    function init() {
        console.log('business init');
        $scope.businesses = pnBusinesses.data.businesses
        // console.log(pnData.data.businesses);
        // $scope.businesses = pnData.data.businesses.producers;
    }

};

})();
