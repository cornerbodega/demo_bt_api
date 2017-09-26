angular.module("countryApp")
.directive("pnQuotes", [
    'pnQuotesService',
    '$location',
    pnQuotes ])

function pnQuotes(pnQuotesService, $location) {
    return {
        restrict: 'E',
        scope: {

        },
        template: "<center><div ng-if='quote' class='pnText container'><div><i>"+'“' + "{{quote[0]}}"+'”'+"</i></div><div> ― {{quote[1]}}</div></div></center>",
        link: function($scope, elem, attrs) {
            // var quotesPages = ['/traceability', ]
            // if($location.path() === '/traceability') {

                // setQuote();
                // console.log($scope.quote);
            // } else {
                // $scope.quote = false
            // }

            // function setQuote(){

                while(!$scope.quote) {
                    $scope.quote = pnQuotesService.getRandom();
                }

            // }
            // $scope.$on('noPos', function() {
                // setQuote();
            // });
        }
    }



}
