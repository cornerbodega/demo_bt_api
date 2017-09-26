angular.module('countryApp')
.factory('pnActionButtonsData', pnActionButtonsData)

function pnActionButtonsData($location, pnDB, pnListings, pnGenerateManifestForRequestService, pnMyData) {
    var _a = {}
    init()
    return _a
    function init() {
        return _a.data = {
            remove_wts: {
                label:'Remove',
                icon: 'fa-remove',
                // showOn: function(wts){
                //     if(!wts) return false
                //     return wts.creator_ubi === sessionStorage.ubi
                // },
                onClick:function(wts){
                    console.log(wts);
                    wts.status = "removed"
                    delete wts.irequested
                    delete wts.mywtslisting
                    delete wts.span
                    delete wts.$selected
                    pnDB.saveToDB('wts_listings', wts)
                    .then(function(res){ console.log(res);})
                    // init();
                    pnMyData.refresh('wts_listings')

                    // $window.location.reload()
                },
            },
            request_manifest: {
                onClick:function(wts){
                    console.log(wts);
                    pnListings.requestedWts = wts;
                    console.log(pnListings.requestedWts );

                    $location.path('/traceability/market/browse_market/request_manifest/'+wts.item_id)
                },
                label:'Request Manifest',
                icon: 'fa-magnet',
                // showOn: function(wts){
                //     if(!wts) return false
                //
                //     console.log(wts);
                //     return wts.creator_ubi != sessionStorage.ubi
                // }
            },
            request_manfiest_inbox_remove: {
                onClick:function(request){
                    console.log(request);
                    delete request.$selected
                    request.status = "declined"
                    // console.log(wts.status);
                    // wts.status = 'removed'
                    // pnListings.requestedWts = wts;
                    // $location.path('/traceability/market/browse_market/request_manifest/'+wts.item_id)
                    pnDB.saveToDB('wts_manifest_requests', request)
                    .then(function(res){ console.log(res);})
                    // init();
                    pnMyData.refresh('manifest_requests')
                    // $window.location.reload()
                },
                label:'Dismiss',
                icon: 'fa-remove',
                showOn: function(wts){
                    return true;

                    // console.log(wts);
                    //
                    // if (wts.mywtslisting) return false
                    // return wts.irequested;
                }
            },
            request_manfiest_inbox_generate_manifest: {
                onClick:function(request){
                    // console.log(listing);

                    // console.log(wts.status);
                    // wts.status = 'removed'
                    // pnListings.requestedWts = wts;
                    // pnCurrentManifestDeal.wts = wts
                    // $location.path('/traceability/market/manifest_request_inbox/generate_manifest_for_request')
                    // $scope.toGenerateManifestForRequest = function(listing) {

                    // var selected_request = _.filter(listing.requests, {$selected: true})
                    console.log(request);
                    // pnGenerateManifestForRequestService.selected_request = request
                    // pnGenerateManifestForRequestService.selected_listing = listing
                    // console.log(pnGenerateManifestForRequestService.selected_request);

                    // $location.path("/traceability/market/manifest_request_inbox/generate_manifest_for_request");
                    $location.path("/traceability/manifests/inventory_manifest");
                    // };
                },
                label:'Create Manifest',
                icon: 'fa-calendar-plus-o',
                showOn: function(wts){
                    return true;

                    // console.log(wts);
                    //
                    // if (wts.mywtslisting) return false
                    // return wts.irequested;
                }
            },

        }
    };
};


// $scope.actionButtons =
