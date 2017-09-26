angular
.module('countryApp.pnListingResource', [])
.factory('pnListingResource', ['$http', pnListingResource] )


function pnListingResource($http) {
    // console.log($resource);
    return {
        get: $http.get('Data-Model/api/listings.php'),
        // create: $http
    }
};
