angular.module("countryApp")
.factory("FavoriteVendors",
    FavoriteVendors
)

function FavoriteVendors(pnPost, $rootScope, Vendors, pnDB, $q) {
    var _FavoriteVendors = {
        init: init
    };

    function init() {
        if (!Vendors.data){
            Vendors.init()
            $rootScope.$on('vendors', initFavorites)
        } else {
            initFavorites()
        }
        var defer = $q.defer()
        defer.resolve(initFavorites)
        return defer.promise
    }


    var favorites = []
    function initFavorites() {
        return pnDB.getFromDB('select * from favorite_vendors where deleted="0" and favoriter="'+sessionStorage.myLocation+'"')
        .then(function(res){
            console.log(res);

            // _FavoriteVendors.data =res.data
            var favoriteVendors = _.filter(Vendors.data, function(v){
                // console.log( _.contains(_.pluck(res.data, 'favorited'), v.location));
                return _.contains(_.pluck(res.data, 'favorited'), v.location)
            })
            console.log(favoriteVendors);
            // console.log(_FavoriteVendors.data);
            _FavoriteVendors.data = favoriteVendors

            $rootScope.$broadcast('favorite_vendors', favoriteVendors)
            console.log(_FavoriteVendors.data);
        })

    }
    // if(params.favoriteVendors) {
    //     console.log('Params Favorite Vendors');
    //     $scope.$on('favorite_vendors', function(e, v){
    //         console.log(v);
    //         var favorite_locations = v
    //         $scope.rows = _.filter($scope.rows, function(vendor){
    //             return _.contains(vendor.location, favorite_locations)
    //         })
    //     })
    //
    // }




    return _FavoriteVendors;

};
