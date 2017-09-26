angular
.module('countryApp')
.factory('pnBusinesses', ['$rootScope', '$http', 'pnDB','ResponseFormatter',
    pnBusinesses
]);


function pnBusinesses($rootScope, $http, pnDB, ResponseFormatter) {
    console.log('PNDATA');
    var _pnData = {
        // refresh: refresh,
        data: {},
    };


    getBusinessesFromPotnet().then(setBusinessesFromDB).then(broadcastBusinesses);
    getBusinessesFromLCB().then(formatBusinesses).then(saveBusinesses).then(broadcastBusinesses);
    function getBusinessesFromPotnet() {
        return $http({
            method: 'GET',
            url: 'Data-Model/php/businesses/getBusinessesFromDB.php',
            // data: {},
            datatype: 'json'
        });
    };
    function broadcastBusinesses() {
        if(_pnData.data.businesses) $rootScope.$broadcast('pnBusinesses');
    };
    function setBusinessesFromDB(res) {
        console.log(typeof res.data);
        if (typeof res.data === "string") {
            console.log('EORR!');
            return console.log(res.data);
        }
        else return _pnData.data.businesses = res.data[0];// return
    }
    function getBusinessesFromLCB() {
        return $http({
            method: 'POST',
            url: 'Data-Model/php/businesses/setBusinesses.php',
            data: {url: 'http://www.liq.wa.gov/publications/Public_Records/2016%20-%20MJ%20Applicants/MarijuanaApplicants08022016.xls'},
            datatype: 'json'
        });
    };
    function formatBusinesses(res) {
        var formattedBusinesses = ResponseFormatter.formatBusinesses(res.data);
        _pnData.data.businesses = formattedBusinesses;
        console.log(formattedBusinesses);
        return  formattedBusinesses;
    }
    function saveBusinesses(formattedBusinesses) {
        return $http({
            method: 'POST',
            url:'Data-Model/php/businesses/saveBusinesses.php',
            data: {data: formattedBusinesses},
            datatype: 'json'
        })
    }
    $rootScope.$on('pn_get_vendors_complete', function(){
        // _pnData.data.vendors = pnBusinessesService.vendors;
        $rootScope.$broadcast('pnBusinesses')
    })

    return _pnData
};
