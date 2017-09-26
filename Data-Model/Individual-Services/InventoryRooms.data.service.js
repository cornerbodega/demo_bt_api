angular.module("countryApp")
.factory("InventoryRooms", [
    'pnPost',
    '$rootScope',
    InventoryRooms,
])

function InventoryRooms(pnPost, $rootScope) {
    var _InventoryRooms = {
        init: init
    };

    function init() {
        var _raw = {}
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'inventory_room', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            _InventoryRooms.data = format(res.data.inventory_room);
            console.log(_InventoryRooms.data);

            $rootScope.$broadcast('inventory_rooms');
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

    return _InventoryRooms;

};
