angular.module("countryApp")
.factory("Plants", Plants)

function Plants(pnPost, $rootScope, pnDataBank) {
    var _plant = {
        init: init,
    };


    var _raw = {}
    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "data": [
            {table: 'plant', active: '1', sum: 0},
            {table: 'plant_room', active: '1', sum: 0}
            // {table: 'plant_qa', active: '1', sum: 0}
        ],
        "download": 1,
        // "active": 1,
        "sessionid": sessionStorage.sessionid
    };
    function init() {
        pnPost(sync_check_request)
        .then(function(res){
            
            _raw.plant = res.data.plant;
            _raw.plant_room = res.data.plant_room;
            console.log(_raw.plant);

            _plant.data = formatPlants(_raw.plant, _raw.plant_room)
            _plant.plant_rooms = formatPlantRooms(_raw.plant_room);
            console.log(_plant.data);
            pnDataBank.data.plants = _plant.data
            $rootScope.$broadcast('plants')


        })

    }

    function formatPlants(plants, plant_rooms) {
        if (!plants) return
        var plantstatus = {
            0: 'Growing',
            1: 'Drying',
            2: 'Cured'
        }
        var plant_rooms_by_id = {}
        plant_rooms.map(function(room) {
            plant_rooms_by_id[room.roomid] = room.name
        })
        console.log(plant_rooms_by_id);
        plants.map(function(plant){
            plant.pnQuantity = 1
            plant.plantStatus = plantstatus[plant.state]
            plant.plantBirthday = new Date(plant.sessiontime*1000).toISOString().slice(0,10)
            // plant.plantlabel =  '['+plant.id+']' + ' ' + plant.strain + ' ' + plant.plantbirthday + ' ('+plant.plantstatus+')'
            // console.log;
            plant.roomLabel = plant_rooms_by_id[plant.room]
            if(plant.roomLabel) console.log(plant.roomLabel);
            if (!plant.roomLabel) plant.roomLabel = 'Bulk Plant Room'
            // plant.category = plant.plant_room_name
            plant.sessiontimeLabel = gettimestring(plant.sessiontime)

        })

        plants = _.sortBy(plants, 'sessiontime').reverse()
        return plants
    };
    function formatPlantRooms (pr) {
        return _.map(pr, function(room){
            room.id = room.roomid
            room.label = room.name
            return room
        })
    }

    return _plant;
}
