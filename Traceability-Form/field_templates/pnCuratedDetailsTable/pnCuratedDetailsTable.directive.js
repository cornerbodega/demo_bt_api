angular.module('countryApp')

.directive('pnCuratedDetailsTable', pnCuratedDetailsTable)

function pnCuratedDetailsTable(pnCols, pnShowCols, $location, pnListings, pnDB, $window, pnGenerateManifestForRequestService, pnMyData) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            key: '=',
            showActionButtons: '=',
        },
        templateUrl: 'Traceability-Form/field_templates/pnCuratedDetailsTable/pnCuratedDetailsTable.template.html',
        link: function($scope, attrs, elem){
            // console.log($scope.key);
            // console.log(pnCols);
            console.log(pnCols($scope.key));
            $scope.horizontalCols = pnShowCols.getShowCols()
            // console.log($scope.horizontalCols());

            $scope.$on('showCols', function(){
                console.log('on Show Cols');
                $scope.horizontalCols = pnShowCols.getShowCols()
            } )
            $scope.pnShow = function(key, value) {
                if (!value) return false;
                if (detail) return false
                // $scope.model[params.key]_.filter($scope.horizontalCols);
                // if (_.conta)
            }
            $scope.isObject = isObject
            $scope.isNumber = isNumber

            $scope.showImage = function (col, data) {
                if (!col.image) return false
                if (data == 0) return false
                return true

            }

            // console.log($scope.model);
            // console.log($scope.model[$scope.options.key]);
            // $scope[params.key] = $scop
            // $scope.getdatestringfor = getdatestringfor
            // $scope.gettimestring = gettimestring
            //
            // $scope.hideActionButtons = params.hideActionButtons
            // console.log($s
            // cope.pnHide);
            console.log($scope.key);
            // console.log(params);

            $scope.actionButtons = {
                remove_wts: {
                    label:'Remove',
                    icon: 'fa-remove',
                    showOn: function(wts){
                        return wts.creator_ubi === sessionStorage.ubi
                    },
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
                        $window.location.reload()
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
                    showOn: function(wts){

                        return wts.creator_ubi != sessionStorage.ubi
                    }
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
                        // pnMyData.refresh('manifest_requests')
                        $window.location.reload()
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
                            pnGenerateManifestForRequestService.selected_request = request

                            $location.path("/traceability/market/manifest_request_inbox/generate_manifest_for_request");
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
            };



        }
    }
}
