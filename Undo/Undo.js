angular.module('countryApp')
.controller('UndoController',
[
    '$scope',
    '$location',
    'pnDB',
    '$window',
    'UndoService',
    '$location',
    UndoController
])
.factory('UndoService', UndoService)

function UndoController($scope, $location, pnDB, $window, UndoService, $location) {
    pnDB.getFromDB('select * from history where ubi="' + sessionStorage.ubi+'" order by `id` desc')
    .then(function(hres){
        $scope.history = _.map(hres.data, function(transaction){
            transaction.res = JSON.parse(transaction.res)
            transaction.req = JSON.parse(transaction.req)
            transaction.req = _.omit(transaction.req, ['sessionid','API'])
            console.log(transaction.req.action);
            if(UndoService[transaction.req.action]) transaction.undo = UndoService[transaction.req.action]
            console.log(transaction.undo);
            return transaction
        });
    })

    $scope.showAll = function(){
        $scope.itemsPerPage = $scope.history.length
    }
    $scope.collapse = collapse
    collapse()
    function collapse() {
        $scope.itemsPerPage = 1
    }
    $scope.pnExport = function() {
        var arrObj = []
        _.map($scope.history, function(transaction) {
            arrObj.push({
                'at': new Date(+transaction.at).toLocaleString(),
                'action': transaction.req.action,
                'request': ""+JSON.stringify(transaction.req),
                'response': ""+JSON.stringify(transaction.res),
            })
        })

        // console.log(arrObj);
        // arrObj = _.uniq(arrObj)
        // console.log(arrObj);

        // console.log(convertArrayOfObjectsToCSV({data:arrObj}));
        console.log('downloadCSV');
        downloadCSV()
        function downloadCSV() {
            var data, filename, link;
            var csv = convertArrayOfObjectsToCSV({
                data: arrObj
            });
            if (csv == null) return;

            filename =  'history' +'_' + Date.now() + '.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        }

        function convertArrayOfObjectsToCSV(args) {
            var result, ctr, keys, columnDelimiter, lineDelimiter, data;

            data = args.data || null;
            if (data == null || !data.length) {
                return null;
            }


            columnDelimiter = args.columnDelimiter || ';';
            lineDelimiter = args.lineDelimiter || '\n';

            keys = Object.keys(data[0]);

            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(function(item) {
                ctr = 0;
                keys.forEach(function(key) {
                    if (ctr > 0) result += columnDelimiter;

                    result += item[key];
                    ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        }
    }
    $scope.toUndo = function(u) {
        $location.path(u)
    };
}


function UndoService() {
    return {
        vehicle_add: '/traceability/location/vehicles/vehicle_remove',
        employee_add: '/traceability/location/employees/employee_remove',
        inventory_room_add: '/traceability/location/rooms/inventory_rooms/inventory_room_remove',
        plant_room_add: '/traceability/location/rooms/plant_rooms/plant_room_remove',
        // plant_new: 'plant_new_undo',
        plant_destroy_schedule: '/traceability/plants/plant_destroy_schedule',
        // plant_harvest: 'plant_harvest_undo',
        // plant_cure: 'plant_cure_undo',
        inventory_destroy_schedule: '/traceability/inventory/inventory_destroy_schedule_undo',
        inventory_convert: '/traceability/inventory/inventory_convert_undo',
        inventory_manifest: '/traceability/manifests/inventory_manifest_void',
        inventory_transfer_outbound: '/traceability/transfers/outbound/inventory_transfer_outbound_void',
        inventory_transfer_inbound: '/traceability/transfers/inbound/inventory_transfer_inbound_modify',
        user_add: '/traceability/transfers/inbound/inventory_transfer_inbound_modify',
        user_remove: '/traceability/transfers/inbound/inventory_transfer_inbound_modify',
    }
}
