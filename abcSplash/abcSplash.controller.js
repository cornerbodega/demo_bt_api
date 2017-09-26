angular.module('countryApp')
.controller('abcSplashController', abcSplashController)
.directive('backImg', backImg)
// .directive('imageonload', function() {
//         return {
//             restrict: 'A',
//             link: function(scope, element, attrs) {
//                 element.bind('load', function() {
//                     //call the function that was passed
//                     scope.$apply(attrs.imageonload);
//                 });
//             }
//         };
//     })
function abcSplashController($scope, $location, $window) {
    $scope.toLogin = function() {
        $location.path('/log-in')
    }
    $scope.toSignUp = function() {
        $location.path('/sign-up');
    };

    $scope.setSpacers = function () {
        console.log('wio!!');
        // var myElement = angular.element( document.querySelector( '#splashtop' ) );
        // console.log(myElement.height());
        // console.log(document.getElementById('splashtop').offsetWidth);
        // console.log(myElement.style.height);

    }

    if(sessionStorage.logout === 'true') {
        sessionStorage.logout = false;
        $window.location.reload()
    }

}



function backImg(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        // element.css({
        //     'background-image': 'url(' + url +')',
        //     // 'background-size' : 'cover',
        //     /* Set a specific height */
        //     height: '700px',
        //
        //     /* Create the parallax scrolling effect */
        //     'background-attachment': 'fixed',
        //     'background-position': 'center',
        //     'background-repeat': 'no-repeat',
        //     'background-size': 'cover'
        //
        // })

        element.css({
            'background-image': 'url(' + url +')',
            'background-size': 'cover;',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            // 'background-attachment': 'fixed',

            'width': '100%;',
            'height': '0;',
            'padding-top': '66.64%;' /* (img-height / img-width * container-width) */
            /* (853 / 1280 * 100) */
        })
    }
}
