(function(){
    angular
    .module('countryApp')
    .directive('pnViewInventory', ['pnData', pnViewInventory ])
    // .directive('pnPathsGrid', pnPathsGrid)
    // .factory('TraceabilityMenuService', [ TraceabilityMenuService ]);

    function pnViewInventory(pnData) {


        // pnData.resource.get().$promise.then(function(data){
        //     console.log(data);
        //     $scope.inventory = data.inventory
        //     console.log(data.inventory_qa_sample);
        //     console.log(data);
        // })
        return {
            restrict: 'AE',
            templateUrl:'Traceability-Browse/View-Inventory.html',
            link: function($scope, elem, attrs) {
                $scope.inventory = pnData.data.inventory
                if(pnData.inventory) init()

                $scope.$on('pnData', function(e){
                    init()
                })

                function init() {
                    $scope.inventory = pnData.data.inventory
                    console.log('init!!');
                    $scope.pnData = true
                }
            }
        }

        console.log($scope.inventory);

    };




})();
