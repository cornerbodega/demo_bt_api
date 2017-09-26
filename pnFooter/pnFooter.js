angular.module('countryApp')
.directive('pnFooter', pnFooter)

function pnFooter($window, $location) {
    return {
        restrict: 'E',
        scope: {

        },
        // template: '',
        templateUrl: 'pnFooter/footer.view.html',
        link: function($scope, elem, attrs) {
            $scope.toTerms = function() {
                $window.open('https://abctraceability.com/wa/#/terms', '_blank');
            }
            $scope.toSuggestions = function () {
                $location.path('/forum/feature_requests/draft')
            }
            $scope.myName = sessionStorage.myName
            $scope.myUsername = sessionStorage.username
            $scope.myAddress = sessionStorage.myAddress
            $scope.myFullName = sessionStorage.myFullName
            // $scope.sendMail("foo@bar.com","Mail Subject","Mail Body Message");
            if($scope.myUsername==='demo@abctraceability.com') {
                $scope.myAddress = ''
                $scope.myName = 'Demo'
                $scope.myFullName = 'ABC Traceability'

            }
            $scope.emailSupport = function() {
                $window.open("mailto:abctraceability@gmail.com");
            }
        }
    }
}
