angular.module('countryApp')
.controller('pnPaypalSubscriptionButton', pnPaypalSubscriptionButton)

function pnPaypalSubscriptionButton(){
    return {
        restrict: 'E'
        templateUrl: 'pnPaypal/pnPaypalSubscriptionButton.template.html'
        link: function($scope, elem, attrs) {
            
        }
    }
}
