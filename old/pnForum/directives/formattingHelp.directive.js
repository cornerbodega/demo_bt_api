angular.module('countryApp')
.directive('pnFormattingHelp', pnFormattingHelp)


function pnFormattingHelp($window) {
    return {
        templateUrl: 'pnForum/directives/formattingHelp.template.html',
        link: function ($scope) {
            console.log('THI SI');
            $scope.openBBCode = function () {
                console.log('OPEN BB');
                $window.open('https://en.wikipedia.org/wiki/BBCode', '_blank');

            }
        }
    }
}
