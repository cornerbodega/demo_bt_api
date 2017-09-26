angular
.module('countryApp')
.factory('pnDB', pnDB )


function pnDB($http, pnProxy, $q, pnPost) {
    var _pnDB = {
        setPos: setPos,
        getPos: getPos,
        getVendors: getVendors,
        getUserByID: getUserByID,
        saveUser: saveUser,
        saveWantToSellListings: saveWantToSellListings,
        getBusinesses: getBusinesses,
        getPreLoginPos:getPreLoginPos,
        saveManifestRequest: saveManifestRequest,
        getFromDB: getFromDB,
        saveToDB: saveToDB,
        unsubscribeMe: unsubscribeMe,
        // subscribeMe:subscribeMe,
    };

    function unsubscribeMe() {
        return _pnDB.saveToDB('billing', {ubi: sessionStorage.ubi, status:'unsubscribed'})
    }

    function saveToDB(table, data) {
        // console.log('getFromDB!');
        return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/saveToDB.php', {table:table, data: data});
    };;
    function getFromDB(query) {
        // console.log('getFromDB!');
        // return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/getFromDB.php', {query: query});
        return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/getFromDB.php', {query: query});
    };
    function saveManifestRequest(request) {
        return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/saveManifestRequest.php', request);
    };
    function getBusinesses() {
        return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/businesses/getBusinessesFromDB.php');
    };
    // function getMyBuyListings() {
    //     return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/get_my_buy_listings.php', {ubi: sessionStorage.ubi});
    // };
    // function getMySellListings() {
    //     return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/get_my_sell_listings.php', {ubi: sessionStorage.ubi})
    // };
    // function getAllBuyListings() {
    //     return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/get_buy_listings.php');
    // };
    // function getAllSellListings() {
    //     return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/get_sell_listings.php')
    // };
    // function saveWantToBuyListing(listing) {
    //     console.log(listing);
    //     if(!listing) return console.log('No WTB Listing!!');
    //     return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/save_want_to_buy_listing.php', listing);
    // };
    function saveWantToSellListings(listings) {
        if(!listings) return console.log('Error! NO LISTINGS!');
        console.log(listings);
        // return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/save_listing.php', listing);
        var listingPromises = _.map(listings, function(listing) {
            // return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/listings/save_want_to_sell_listing.php', listing);
            return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/saveToDB.php', {table: 'wts_listings', data: listing});

        })
        return $q.all(listingPromises);



    };

    function saveUser(user) {
        console.log(user);
        // console.log('SAVBE');
        if (!user) return console.log('Error! No user info. Bad news... Impossible!');
        return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/users/save_user.php', user);
    };

    function getUserByID(user_data) {
        console.log(user_data);
        // console.log();
        if (!user_data) {
            return console.log('Error! user_data is not defined!');
        };
        return pnProxy('https://abctraceability.com/demo/demo_bt_api/Data-Model/php/users/does_user_exist.php', {user_id: user_data.user_id})
    };

    function getPos() {
        console.log("getPOS");
        return $http({
            method: 'POST',
            url: 'Data-Model/php/pnProxy.php',
            data: {
                url:'http://potnet.net/wa/Data-Model/php/getPos.php',
                data:{ ubi: sessionStorage.ubi }
            },
            datatype: 'json'
        });
    }
    function getPreLoginPos() {
        // console.log("getPOS");
        return $http({
            method: 'POST',
            url: 'Data-Model/php/pnProxy.php',
            data: {
                url:'http://potnet.net/wa/Data-Model/php/getPos.php',
                data:{ ubi: "602093924" }
            },
            datatype: 'json'
        });
    }
    function setPos(formattedSyncCheckData) {

        return $http({
            method: 'POST',
            url: 'Data-Model/php/pnProxy.php',
            data: {
                url: 'http://potnet.net/wa/Data-Model/php/setPos.php',
                data:{ubi: sessionStorage.ubi, data: formattedSyncCheckData}
            },
            datatype: 'json'
        });
    };
    function getVendors() {
        return $http({
            method: 'GET',
            url: 'Data-Model/php/getVendors.php',
            // data: {ubi: sessionStorage.ubi},
            datatype: 'json'
        });
    }
    return _pnDB;
};
