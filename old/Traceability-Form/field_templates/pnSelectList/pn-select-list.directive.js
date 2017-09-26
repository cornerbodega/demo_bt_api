angular.module('countryApp')
.directive('pnSelectList', pnSelectList)


function pnSelectList() {
    return {
        restrict: 'E',
        templateUrl: 'Traceability-Form/field_templates/pnSelectList/pn-select-list.template.html',
        scope: {
            pnData: '=',
            pnOnSelectAction: '=',
        },
        link: function ($scope, elem, attrs) {
            console.log('I exists');
        }
    }
}
