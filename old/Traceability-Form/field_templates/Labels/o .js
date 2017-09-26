angular.module('countryApp')
.directive('pnLabelTemplate', pnLabelTemplate)


function pnLabelTemplate() {
    return {
        restrict: 'E',
        templateUrl: 'Traceability-Form/field_templates/Labels/pnLabelTemplate.template.html',
        scope: {
            labelTemplate: '=',
            pnOnSelectAction: '=',
        },
        link: function ($scope, elem, attrs) {
            $scope.model = {}
            $scope.model.label_template = $scope.labelTemplate
        }
    }
}
