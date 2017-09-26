angular.module('countryApp')
.directive('pnDemoAd', pnDemoAd)

function pnDemoAd($location){
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pnDemoAd/pnDemoAd.template.html',
        link: function($scope, elem, attrs) {
            $scope.toNewClient = function() {
                $location.path('/traceability/new_client')
            }
        }
    }
};
