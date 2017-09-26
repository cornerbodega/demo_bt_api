angular.module('countryApp')
.directive('pnTextAlignButtons', pnTextAlignButtons)
.directive('pnBoldUnderlineItalicsButtons', pnBoldUnderlineItalicsButtons)


function pnBoldUnderlineItalicsButtons() {
    return {
        templateUrl: 'Traceability-Form/field_templates/Labels/pnBoldUnderlineItalicsButtons.template.js',
        link: function ($scope) {

        }
    }
}


function pnTextAlignButtons() {
    return {
        templateUrl: 'Traceability-Form/field_templates/Labels/pnTextAlignButtons.template.js',
        link: function ($scope) {

        }
    }
}
