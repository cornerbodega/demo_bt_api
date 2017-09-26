angular.module('countryApp')
.controller('pnScrollTableController', pnScrollTableController)
.directive('pnScrollTable', pnScrollTable)


function pnScrollTableController() {
    
}

function pnScrollTable() {
    return {
        templateUrl: 'Traceability-Form/field_templates/pn-scroll-table.template.html',
        link: function ($scope, elem, attrs) {

        }
    }
}
