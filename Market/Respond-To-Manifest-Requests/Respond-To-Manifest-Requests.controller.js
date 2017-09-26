angular.module("countryApp").controller("RespondToManifestRequestsController",[
    '$location',
    '$scope',
    'pnDB',
    'pnGenerateManifestForRequestService',
    RespondToManifestRequestsController])
// console.log(RespondToManifestRequestsController);

function RespondToManifestRequestsController($location, $scope, pnDB, pnGenerateManifestForRequestService) {
    if (!sessionStorage.ubi) $location.path('/')
    // get requests from db
    $scope.toGenerateManifestForRequest = function(listing) {
        pnGenerateManifestForRequestService.selected_listing = listing
        var selected_request = _.filter(listing.requests, {$selected: true})
        pnGenerateManifestForRequestService.selected_request = selected_request[0]
        $location.path("/traceability/market/manifest_request_inbox/generate_manifest_for_request");
    };
    $scope.classForGenerateManifestButton = function(listing) {
        var selected = _.filter(listing.requests, {$selected: true})
        if (selected.length > 0) return "potnetRed white-text z-depth-1"
        else return "grey"
    }
    $scope.toggleAcceptRequest = function(listing, request) {
        console.log(listing);
        deselectAll(listing.requests);
        request.$selected = !request.$selected
    };

    $scope.requestButtonDisabledForListing = function(listing) {
        // console.log(listing);
        var selected = _.filter(listing.requests, {$selected: true})
        // console.log(selected);
        if (selected.length != 0) return false
        else return true
    };

    $scope.classForRequest = function(request) {
        if(request.$selected) return "potnetRed white-text z-depth-1"
        else return "white z-depth-1"
    };

    function deselectAll(array) {
        _.map(array, function(r) {
            r.$selected = false;
        });
        // $scope.model.requestToAccept = {}
    };

    var reuqestsQuery = "select * from wts_manifest_requests where wts_creator_ubi='"+sessionStorage.ubi+"' and status='new'";
    pnDB.getFromDB(reuqestsQuery)
    .then(initRequests)
    .then(getRequestedWts)
    .then(initRequestedWts);


    function initRequests(res) {
        $scope.requests = res.data

        return _.pluck($scope.requests, 'item_id')
    };

    function getRequestedWts(requestedIDs) {
        if (requestedIDs.length == 0 ) return $scope.error = 'Empty (0)';
        console.log(requestedIDs);
        var wtsQuery = "select * from wts_listings where item_id in ("+requestedIDs+") ORDER BY `at` DESC"
        console.log(wtsQuery);

        return pnDB.getFromDB(wtsQuery);
    };

    function initRequestedWts(res) {
        $scope.requestedWts = res.data

        _.map($scope.requests, function(request){
            _.map($scope.requestedWts, function(wts){
                console.log('eee');
                if(wts.item_id === request.item_id) {
                    if (!wts.requests) wts.requests = []
                    wts.requests.push(request)
                };

            });
        });
        return
    };
}
