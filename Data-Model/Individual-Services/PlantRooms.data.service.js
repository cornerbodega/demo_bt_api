angular.module("countryApp")
.factory("PlantRooms", [
    'pnPost',
    '$rootScope',
    PlantRooms,
])

function PlantRooms(pnPost, $rootScope) {
    var _PlantRooms = {
        init: init
    };

    function init() {
        var _raw = {}
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'plant_room', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            _PlantRooms.data = format(res.data.plant_room);
            console.log(_PlantRooms.data);

            $rootScope.$broadcast('plant_rooms');
        })
    }

    // console.log(pnPost);


    function format(pr) {
        return _.map(pr, function(room){
            room.id = room.roomid
            room.label = room.name
            return room
        })
    }

    return _PlantRooms;

};
