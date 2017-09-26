angular.module("countryApp")
.factory("pnDatagories", [
    pnDatagories,
])

function pnDatagories() {
    var _datagories = {
        pnDatagoryForTask: pnDatagoryForTask
    }
    var d = {
        inventory: [
            'inventory_adjust',
            'inventory_convert',
            'inventory_create_lot',
            'inventory_split',
            'inventory_destroy_schedule',
            'inventory_destroy',
            'inventory_move',
            'inventory_new',
            'inventory_sample'
        ],
        plants: [
            'plant_destroy',
            'plant_new',
            'plant_move',
            'plant_harvest_schedule',
            'plant_harvest_schedule_undo',
            'plant_harvest',
            'plant_cure',
            'inventory_create_lot',
            'plant_convert_to_inventory'

        ],
        inventory_rooms: [
            'inventory_room_add',
            'inventory_room_remove'
        ],
        plant_rooms: [
            'plant_room_add',
            'plant_room_remove'
        ],
        vehicles: [
            'vehicle_add',
            'vehicle_remove',
        ],
        employees: [
            'employee_add',
            'employee_remove'
        ],

    }
    function pnDatagoryForTask(task) {
        var pnDatagory = 'no pnDatagory for ' + task
        _.map(d, function(t, k){
            if (_.contains(t, task)) {
                pnDatagory = k
            }
        })
        return pnDatagory
    }
    return _datagories
}
