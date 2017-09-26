angular.module('countryApp')
.factory('pnUbiToName', [
    'pnDB',
    '$rootScope',
    pnUbiToName
])

function pnUbiToName(pnDB, $rootScope) {
    var _v = {}

    function init(res){
        // console.log('save this pos!');
        if(!res.data[0]) return console.log('OH NO! NO PRE LOGIN POS!');

        // console.log(res);
        // console.log(JSON.parse(res.data[0].data).vendors);
        var v = {}
        // console.log(JSON.parse(res.data[0].data).vendors);
        _.map(JSON.parse(res.data[0].data).vendors, function(vendor){
            v[vendor.ubi]= vendor;
        })
        // return(v[ubi]);
        _v = v;
        $rootScope.$broadcast('vendorsbyubi')
    }

    pnDB.getPreLoginPos().then(init);

    function ubiToName(ubi) {
        var vendor = _v[ubi]
        if (vendor) return vendor.name

        else return ""
    }
    function ubiToLocation(ubi) {
        var vendor = _v[ubi]
        if (vendor) return vendor.location

        else return ""
    }
    function ubiToFullName(ubi) {
        var vendor = _v[ubi]
        if (vendor) return vendor.label + " " + vendor.ubi
        else return ""
    }
    function ubiToAddress(ubi){
        var vendor = _v[ubi]
        if(!vendor) return
        if (!vendor.address2) vendor.address2 = ", "
        if (vendor) return vendor.address1 + " " + vendor.city +", WA " + vendor.zip
        else return ""
    }
    return {
        ubiToName: ubiToName,
        ubiToFullName: ubiToFullName,
        ubiToAddress: ubiToAddress,
        ubiToLocation: ubiToLocation,
    }

}
