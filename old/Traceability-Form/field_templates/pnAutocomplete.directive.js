angular.module("countryApp").directive("pnAutocomplete", pnAutocomplete)

function pnAutocomplete() {
    return {
        restrict: 'E',
        scope: {
            list: '=',
            'type': '=',
            'multiple': '=',
            'model':'='
        },
        templateUrl: 'Traceability-Form/field_templates/pn-autocomplete.html',
        link: function($scope, elem, attrs) {

            $scope.fruitNames = ['Apple', 'Banana', 'Orange'];
            $scope.tags = [];
            console.log($scope.model)
            $scope.querySearch = function(query) {
                return $scope.list.filter(createFilterFor(query));
            }
            if ($scope.type==="inventory") {
                $scope.label = "Inventory"
                $scope.selectedItemChange = selectedItemChange
                if($scope.multiple) {
                    $scope.selectedItemChange = selectedItemChangeMuliple
                }
            }
            function createFilterFor(query) {
                var lowercaseQuery = angular.uppercase(query);
                return function filterFn(item) {
                    // console.log(item);
                    // console.log(lowercaseQuery);
                    // item.name = "BUTTHEAT"

                    if ($scope.type==="inventory") {
                        // $scope.label = "Inventory"

                        item.name =   item.pnQuantitiyLabel + " " + item.strain + " "+ item.inventorytypelabel + " " + item.id
                        return (item.name.indexOf(lowercaseQuery) !== -1);
                    }
                    return
                };
            }
             function selectedItemChange (item) {
                console.log('SELECTED!!');
                // $scope.currentStopModel.inventoryitems.push(item)
            }
            function selectedItemChangeMuliple(item) {
                // $scope.model.inventoryitems.push(item)
                // console.log($scope.model);
                // if(item) $scope.searchText = item.id

                $scope.$emit('item_selected', item)
            }
            // console.log($scope.list);
            // console.log($scope.selectedItemChange);
            // console.log($scope.type);
            // $scope.selectedItemChange =
            $scope.searchText = ""
        }
    }

}
