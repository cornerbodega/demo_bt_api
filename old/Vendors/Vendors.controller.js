(function(){
    angular
    .module('countryApp')
    .controller('VendorsController', ['$scope','pnData', 'pnDB',
    VendorsController
])

function VendorsController($scope, pnData, pnDB) {
    if(pnData.data.vendors) {
        init();
    }
    $scope.$on('pnData', function(){
        init();
    })

    function init() {
        $scope.pnData = true;
        $scope.vendors = pnData.data.vendors
        pnDB.setVendors($scope.vendors);
    }

};

})();
