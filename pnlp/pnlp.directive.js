angular.module('countryApp')
.directive('pnlp', pnlp)
function pnlp() {
    return {
        template: '<div layout-padding></div>'
    }
}
