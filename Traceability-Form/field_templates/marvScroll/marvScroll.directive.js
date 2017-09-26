angular.module('countryApp')
.directive('marvScroll', marvScroll)

function marvScroll() {
    return {
        link: function ($scope, attrs, element) {
            // element;
            console.log(document.getElementById('scrollTable')); //.scrollTableBody()
        }
    }
}
