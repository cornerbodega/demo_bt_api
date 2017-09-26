angular.module('countryApp')
.directive('pnSplashHeader', pnSplashHeader)

function pnSplashHeader($location, pnLoginRouter) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pnSplashHeader/pnSplashHeader.template.html',
        link: function ($scope, element) {


            if(sessionStorage.sessionid) $scope.isLoggedIn = true
            $scope.toSplash = function() {
                $location.path('/')
            }
            $scope.toTraceability = function() {
                $location.path('/traceability')
            }
            $scope.toLogin = function() {
                $location.path('/log-in')
            }

            $scope.toSignUp = function() {
                $location.path('/sign-up')
            }
            $scope.toUserGuide = function() {
                $location.path('/user_guide')
            }
            $scope.toForum = function() {
                $location.path('/forum')
            }
            $scope.toDemo = function() {
                $location.path('/demo')
            }
        }
    }
}
