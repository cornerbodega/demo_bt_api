angular.module("countryApp")
.factory("Vehicles", [
    'pnPost',
    '$rootScope',
    Vehicles,
])

function Vehicles(pnPost, $rootScope) {
    var _vehicles = {
        init: init
    };

    function init() {
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'vehicle', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            _vehicles.data = formatVehicles(res.data.vehicle);
            console.log('vehicles');
            $rootScope.$broadcast('vehicles');
        })
    };

    function formatVehicles(vehicle){
        // var vehicles = []
        _.map(vehicle, function(v) {
            var label = ''
            if (v.nickname) label = v.nickname + ' ' + v.plate
            if (!v.nickname) label = v.color + ' ' + v.make + ' ' + v.model + ' ' + v.plate
            // vehicles.push({label: label, id: v.vehicle_id})
            v.label = label
            id = v.vehicle_id

        })
        return vehicle
    }

    return _vehicles;

};
