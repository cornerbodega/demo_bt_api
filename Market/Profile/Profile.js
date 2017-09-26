angular.module('countryApp')
.directive('pnUserProfileLink', pnUserProfileLink)

function pnUserProfileLink(pnData) {
    return {
        restrict: 'E',
        scope: {
            ubi: '='
        },
        templateUrl: 'Market/Profile/pn-user-profile-link.html',
        link: function($scope, elem, attrs) {
            // pnDB.getVendorForUbi($scope.ubi).then(function(res){console.log(res);})
            if(pnData.data.vendors) {
                init();
            }
            $scope.$on('pnData', function(){
                init();
            })

            function init() {
                $scope.pnData = true;
                var vendorsbyubi = {}
                _.map(pnData.data.vendors, function(vendor){
                    // console.log(vendor);
                    vendorsbyubi[vendor.ubi] = vendor.name;
                })
                // console.log(vendors);

                $scope.company = vendorsbyubi[$scope.ubi]
            }
        }
    }
}
