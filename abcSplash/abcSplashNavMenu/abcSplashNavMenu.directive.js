angular.module('countryApp')
.directive('abcSplashNavMenu', abcSplashNavMenu)

function abcSplashNavMenu($window, $location) {
    return {
        restrict: 'AE',
        templateUrl: 'abcSplash/abcSplashNavMenu/abc-splash-nav-menu.template.html',
        scope: {},
        link: function($scope, elem, attrs){
            // $scope.pages = [
            //     {
            //         label: 'Home',
            //         id: 'home',
            //         content: 'Home!!!'
            //     },
            //     {
            //         label: 'Who We Are',
            //         id: 'about',
            //         content: 'We are ABC Traceability!'
            //     },
            //     {
            //         label: 'What We Do',
            //         id: 'about',
            //         content: 'We are ABC Traceability!'
            //     },
            //     {
            //         label: 'What We Do',
            //         id: 'about',
            //         content: 'We are ABC Traceability!'
            //     },
            // ]
            // $scope.currentNavItem = $scope.pages[0]
            $scope.openInNewTab = function openInNewTab(url){
                $window.open(url, '_blank');
            }
            $scope.toLogin = function() {
                $location.path('/log-in')
            }
            $scope.toSignUp = function() {
                $location.path('/sign-up');
            }

        }
    }
}
