(function(){
    angular
    .module('countryApp')
    .controller('ViewMyWantToSellController', ['$scope','$location', 'pnDB', 'pnListings','$rootScope', ViewMyWantToSellController ])
    .controller('ViewMyWantToBuyController', ['$scope','$location', 'pnDB', 'pnListings', '$rootScope', ViewMyWantToBuyController ])
    .controller('ViewAllWantToSellController', ['$scope','$location', 'pnDB', 'pnListings','$rootScope', ViewAllWantToSellController ])
    .controller('ViewAllWantToBuyController', ['$scope','$location', 'pnDB', 'pnListings', '$rootScope', ViewAllWantToBuyController ])
    // .directive('pnWantToSellGrid', ['pnListings', pnWantToSellGrid])
    .factory('pnListings', pnListings)
    .directive('backImg', backImg)

    function pnListings() {
        return { }
    }

    function ViewAllWantToSellController($scope, $location, pnDB, pnListings, $rootScope) {
        if(!sessionStorage.sessionid) $location.path('/');
        init()
        function init() {
            pnDB.getFromDB('SELECT * from wts_listings WHERE status="new" ORDER BY `at` DESC')
            .then(getMyManifestRequests)
            .then(setListings);
        }

        function setListings(my_requests_res) {
                var my_requests = my_requests_res.data
                _.map($scope.wts_listings, function(wts){
                    wts.span = {row:1, col: 1}
                    if(wts.creator_ubi === sessionStorage.ubi) {
                        console.log(wts.item_id + ' i made this wts listing');
                        wts.mywtslisting = true;
                    };
                    if (_.findWhere(my_requests, {item_id: wts.item_id})) {
                        console.log(wts.item_id + ' i requested this');
                        wts.irequested = true;
                    }
                })
        }
        $scope.selectMarketGridItem = function(option) {
            if (option.$selected) option.span = {row:1, col: 1}
            else option.span = {row:1, col: 2}
            return option.$selected = !option.$selected
        }
        $scope.goToNewWTS = function() {
            console.log('go there!');
            $location.path('/traceability/market/create/want_to_sell')
        }
        function getMyManifestRequests(wts_listings) {
            console.log(wts_listings.data);
            $scope.wts_listings = wts_listings.data

            return pnDB.getFromDB('SELECT * from wts_manifest_requests WHERE requester_ubi="' +sessionStorage.ubi+'"' )
        }
        $scope.classForImage = function(option) {
            if (!option.span) return ''
            if(option.span.row > 1) return ''
            else return 'red'
        }
        $scope.actionButtons = [
            {
                label:'Remove',
                icon: 'fa-remove',
                showOn: function(wts){
                    return wts.mywtslisting;
                },
                onClick:function(wts){
                    console.log(wts);
                    wts.status = "removed"
                    delete wts.irequested
                    delete wts.mywtslisting
                    delete wts.span
                    delete wts.$selected
                    pnDB.saveToDB('wts_listings', wts).then(function(res){ console.log(res);})
                    init();
                },
            },
            {
                onClick:function(wts){
                    console.log(wts);
                    pnListings.requestedWts = wts;
                    $location.path('/traceability/market/all/for_sale/request_manifest/'+wts.item_id)
                },
                label:'Request Manifest',
                icon: 'fa-magnet',
                showOn: function(wts){
                    if (wts.mywtslisting) return false
                    return !wts.irequested;
                }
            },
            {
                onClick:function(wts){
                    console.log(wts);
                    pnListings.requestedWts = wts;
                    $location.path('/traceability/market/all/for_sale/request_manifest/'+wts.item_id)
                },
                label:'Unrequest',
                icon: 'fa-magnet',
                showOn: function(wts){
                    if (wts.mywtslisting) return false
                    return wts.irequested;
                }
            },
        ];

    };

    function ViewMyWantToSellController($scope, $location, pnDB, pnListings, $rootScope) {
        if(!sessionStorage.sessionid) $location.path('/');

        $scope.goToNewWTS = function() {
            console.log('go there!');
            $location.path('/traceability/market/create/want_to_sell')
        }
        pnDB.getMySellListings().then(function(res){
            console.log(res.data);
            $scope.wts_listings = res.data
        })
        $scope.actionButtons = [


            {
                onClick:function(wts){
                    console.log(wts);
                },
                label:'Remove',
                icon: 'fa-remove'
            },
        ];

    };

    function ViewMyWantToBuyController($scope, $location, pnDB, pnListings, $rootScope) {
        if(!sessionStorage.sessionid) $location.path('/');

        pnDB.getMyBuyListings().then(function(res){
            console.log(res.data);
            $scope.wtb = res.data;
        })

    };

    function ViewAllWantToBuyController($scope, $location, pnDB, pnListings, $rootScope) {
        if(!sessionStorage.sessionid) $location.path('/');
        console.log('ALL?!');
        pnDB.getAllBuyListings().then(function(res){
            console.log(res.data);
            $scope.wtb = res.data;;
        }).then(pnDB.getFromDB).then(function(res){
            console.log(res.data);
        })


    };

    function backImg(){
        return function(scope, element, attrs){
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            })
        }
    }

})();
