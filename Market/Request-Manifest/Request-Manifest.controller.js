angular.module("countryApp")
.controller('RequestManifestController',
    RequestManifestController)
.factory( 'pnListings', pnListings)
function RequestManifestController($scope, $location, pnListings, pnDB, pnDialog) {
    console.log(pnListings.requestedWts )
    if(!pnListings.requestedWts) $location.path('/traceability/market/browse_market');
    $scope.wts = pnListings.requestedWts;
    $scope.asap = function() {
        $scope.asapDeliveryDate=true
    }
    $scope.asapDeliveryDate =
// pnDialog("Request sent!")
    $scope.requestManifest = function() {
        var manifestRequest = {
            // wts: JSON.stringify($scope.wts),
            // wts_price: $scope.wts.price
            item_id: $scope.wts.item_id,
            wts_creator_ubi: $scope.wts.creator_ubi,
            wts_creator_name: $scope.wts.creator_name,
            message: $scope.message,
            requester_ubi: sessionStorage.ubi,
            requester_location: sessionStorage.myLocation,
            requester_name: sessionStorage.myName,
            // requester_full_name: sessionStorage.myFullName,
            requester_address: sessionStorage.myAddress,
            // requester_phone: sessionStorage.myPhone,
            at: Date.now(),
            request_id: sessionStorage.ubi + $scope.wts.creator_ubi + $scope.wts.item_id,
            status: 'new',
        };
        pnDialog.messageYesOrNo("Send this request to " + manifestRequest.wts_creator_name +'?' , saveManifestRequest)
        function saveManifestRequest() {
            return pnDB.saveManifestRequest(manifestRequest).then(function(res){
                console.log(res);
                goToMarket()
                function goToMarket() {
                    $location.path('/traceability/market/browse_market')
                };

            })
        }
    }
};
function pnListings() {
    return {}
}
