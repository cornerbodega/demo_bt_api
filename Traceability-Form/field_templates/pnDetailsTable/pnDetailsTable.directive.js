angular.module('countryApp')
.directive('pnDetailsTable', pnDetailsTable)
.directive('pnMiniDetailsTable', pnMiniDetailsTable)
.directive('pnMiniDetailsTable2', pnMiniDetailsTable2)
.directive('pnMiniDetailsTable3', pnMiniDetailsTable3)
.directive('pnMiniDetailsTable4', pnMiniDetailsTable4)

function pnDetailsTable(){
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: 'Traceability-Form/field_templates/pnDetailsTable/pnDetailsTable.template.html',
        link: function($scope, attrs, elem){
            $scope.isObject = isObject
            $scope.valueLabeler = function(key, value) {
                // console.log(key);
                // console.log(value);
                return value
            }
            $scope.pnDetailHide = function (key, value) {
                if (!value) return true
                var hide = [
                    'inventorytype',
                    'pnQuantitiyLabel',
                    'inventorytypeInfo',
                    'thc',
                    'thca',
                    'cbd',
                    'state',
                ]
                if (_.contains(hide, key)) return true
                else return false

            }
        }
    }
}
function pnMiniDetailsTable() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: 'Traceability-Form/field_templates/pnDetailsTable/pnMiniDetailsTable.template.html',
        link: function($scope, attrs, elem){
            $scope.isObject = isObject
            $scope.isNumber = isNumber
        }
    }
}
function pnMiniDetailsTable2() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: 'Traceability-Form/field_templates/pnDetailsTable/pnMiniDetailsTable2.template.html',
        link: function($scope, attrs, elem){
            $scope.isObject = isObject
            $scope.isNumber = isNumber
        }
    }
}
function pnMiniDetailsTable3() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: 'Traceability-Form/field_templates/pnDetailsTable/pnMiniDetailsTable3.template.html',
        link: function($scope, attrs, elem){
            $scope.isObject = isObject
            $scope.isNumber = isNumber
        }
    }
}
function pnMiniDetailsTable4() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: 'Traceability-Form/field_templates/pnDetailsTable/pnMiniDetailsTable4.template.html',
        link: function($scope, attrs, elem){
            $scope.isObject = isObject
            $scope.isNumber = isNumber
        }
    }
}
