angular.module("countryApp")
.controller("LogoutController", ['$scope','$location', LogoutController])

function LogoutController($scope, $location) {
    console.log('LOG OUT!!');
    // amazon.Login.logout();
    sessionStorage.clear();
    localStorage.clear();
    sessionStorage.logout = true;
    $location.path("/")

}
