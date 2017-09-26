angular.module("countryApp")
.factory("Vendors", Vendors)

function Vendors(
    pnPost,
    $rootScope,
    pnDB,
    pnLcbAccessor,
    $q
) {
    var _Vendors = {
        init: init,
        setMyName: setMyName,
        getVendorsFromDB: getVendorsFromDB
    };

    function init() {
        // Start by getting vendors from db
        getVendorsFromDB();
        // Refresh db info every now and then by getting new data from lcb
        var r = getRandomInt(0,10)
        if (r==1) refreshVendors()
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // MANUAL REFRESH
        // refreshVendors();
    }

    function setMyName() {
        var myUbi = sessionStorage.ubi
        // console.log(_Vendors.data);
        // console.log(sessionStorage.ubi);
        // console.log(_.find(_Vendors.data, {ubi: myUbi}));
        // return sessionStorage.myName =
        sessionStorage.myName = _.find(_Vendors.data, {ubi: myUbi}).vendorName//.replace(/\s+/g,' ').trim();
        sessionStorage.myAddress = _.find(_Vendors.data, {ubi: myUbi}).addresslabel//.replace(/\s+/g,' ').trim();
        sessionStorage.myLocation = _.find(_Vendors.data, {ubi: myUbi}).location//.replace(/\s+/g,' ').trim();
        var deferred = $q.defer();
        deferred.resolve('1')

        return deferred.promise
    }
    function getVendorsFromDB(){
        return pnDB.getFromDB('select * from vendorsPos where id="1"')
        .then(setDataFromDB);
    }

    function refreshVendors() {
        return pnLcbAccessor().then(getVendorsFromLcb);
    };

    function getVendorsFromLcb(s) {
        // console.log(s);
        s = s.data.sessionid
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'vendor', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": s
        };

        return pnPost(sync_check_request).then(formatDataFromLcb).then(saveVendorsToDB);
    };
    function setDataFromDB(res) {
        var d = JSON.parse(res.data[0].data)
        return setData(d);
    }
    function formatDataFromLcb(res){
        return setData(formatVendors(res.data.vendor));
    }
    function setData(vendors) {
        console.log(vendors);
        _Vendors.data = vendors
        console.log(_Vendors.data);
        return $rootScope.$broadcast('vendors');

    };
    function saveVendorsToDB(){
        // _.map(_Vendors.data, function(vendor){
        //     // console.log(vendor.);
        //
        //     // pnDB.saveToDB('vendors',  {
        //     //     name: vendor.name,
        //     //     type: vendor.type,
        //     //     // nameLabel: vendor.nameLabel,
        //     //     location: vendor.location,
        //     //     ubi: vendor.ubi,
        //     //     medical: vendor.medical,
        //     //     addresslabel: vendor.addresslabel,
        //     //     label: vendor.vendorName
        //     // });
        // });
        console.log('saving!!! ' + _Vendors.data.length);
        pnDB.saveToDB('vendorsPos', {id: 1, data: JSON.stringify(_Vendors.data)}).then(function(res){   console.log(res);})

    };
    function formatVendors (v) {
        var vendors = {vendorsbyid:{}, vendorsarray:[], vendorsbyubi: {}}
        if (!v) return console.log("Error! No Vendors!")
        return _.map (v, function (vendor) {
            // console.log(vendor.location);
            if (vendor.locationtype == '1') {
                vendor.type = 'Tier 1 Producer'
            }
            if (vendor.locationtype == '2') {
                vendor.type = 'Tier 2 Producer'
            }
            if (vendor.locationtype == '3') {
                vendor.type = 'Tier 3 Producer'
            }
            if (vendor.locationtype == '4') {
                vendor.type = 'Tier 1 Producer/Processor'
            }
            if (vendor.locationtype == '5') {
                vendor.type = 'Tier 2 Producer/Processor'
            }
            if (vendor.locationtype == '6') {
                vendor.type = 'Tier 3 Producer/Processor'
            }
            if (vendor.locationtype == '7') {
                vendor.type = 'Processor'
            }
            if (vendor.locationtype == '8') {
                vendor.type = 'Retailer'
            }
            if (vendor.locationtype == '9') {
                vendor.type = 'Retailer'
            }
            if (vendor.locationtype == '10') {
                vendor.type = 'Retailer'
            }
            if (!vendor.city) return console.log('Error! Formatting already formatted DB data');
            vendor.addresslabel = vendor.address1
            if (!!vendor.address2) vendor.addresslabel += ' ' + vendor.address2
            vendor.addresslabel += ' ' + vendor.city + ', WA ' + vendor.zip
            vendor.addresslabel = vendor.addresslabel.replace(/\s+/g,' ').trim();
            vendor.label = vendor.name + " " + vendor.type + " " + vendor.addresslabel
            vendor.vendorName = angular.copy(vendor.name)

            vendor.name = vendor.label.replace(/\s+/g,' ').trim();
            vendors.vendorsbyid[vendor.location] = vendor
            if (!!vendor.rawphone) vendor.phone = '('+vendor.rawphone.toString().substr(0,3) + ') ' + vendor.rawphone.toString().substr(3,3) + '-'+vendor.rawphone.toString().substr(6,4)
            // console.log(vendor);
            return vendor
            // vendors.vendorsarray.push(vendor);
            // vendors.vendorsbyubi[vendor.ubi] = vendor

        });
        // vendors.vendorsarray = _.uniq(vendors.vendorsarray);
        // console.log(sessionStorage.ubi);
        // sessionStorage.myLocation = vendors.vendorsbyubi[sessionStorage.ubi].location

        // console.log(JSON.stringify(sessionStorage.myLocation));
        // return vendors.vendorsarray

    }

    return _Vendors;

};
