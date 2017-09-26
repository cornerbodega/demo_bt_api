angular.module('countryApp')
.controller('SplashController', [
    '$scope',
    '$location',
    '$window',
    'Vendors',
SplashController])

function SplashController($scope, $location, $window, Vendors) {
    if(sessionStorage.logout === 'true') {
        sessionStorage.logout = false;
        $window.location.reload();
    }
    if(sessionStorage.sessionid) {
        $location.path('/traceability')
    }
    $scope.toLogIn = function() {
        $location.path('/log-in');
    }
    $scope.toSignUp = function() {
        $location.path('/sign-up');
    }
    $scope.openInNewTab = function openInNewTab(url){
        $window.open(url, '_blank');
    }
}
