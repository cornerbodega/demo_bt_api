(function(){
    angular
    .module('countryApp')
    .controller('LabsController', ['$scope','pnData',
    LabsController
])

function LabsController($scope, pnData) {
    if(pnData.data.labs) {
        $scope.labs = pnData.data.labs;
        $scope.pnData = true;
    }
    $scope.$on('pnData', function(){
        $scope.pnData = true;
        $scope.labs = pnData.data.labs
    })

};

})();
