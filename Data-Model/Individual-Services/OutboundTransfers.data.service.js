angular.module("countryApp")
.factory("OutboundTransfers",
    OutboundTransfers
)

function OutboundTransfers(pnPost, Inventory, $rootScope, pnDataBank) {
    var _outboundTransfers = {
        init: init
    };

    function init() {
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'inventory_transfer', active: '1', sum: 0},
                {table: 'manifest', active: '1', sum: 0}
                // {table: 'plant_qa', active: '1', sum: 0}
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            console.log(res);
            _outboundTransfers.data = formatOutboundTransfers(res.data.inventory_transfer, res.data.manifest, res.data.manifest_stop_data, res.manifest_stop_items);
            pnDataBank.data.outbound_transfers = _outboundTransfers.data
            $rootScope.$broadcast('outbound_transfers');

            console.log(_outboundTransfers.data);
        })
    };

    function formatOutboundTransfers(outboundTransfers, manifests, stops, items) {

        // console.log(outboundTransfers);
        // console.log(manifests);
        // console.log(stops);
        // console.log(items);
        _.map(stops, function(s) {
            // console.log(s);
            // console.log(s.stopnumber);
            s.manifest_stop = '' + s.stopnumber
        })
        _.map(outboundTransfers, function(o){
            o.id = o.inventoryid
            o.typeLabel = Inventory.getTypeInfo(o.inventorytype).label
            // console.log(o.manifest_stop);
            // console.log();
            // console.log(_.findWhere(stops, {manifest_stop: o.manifest_stop}));
            o.toLabel = _.findWhere(stops, {manifestid: o.manifestid, manifest_stop: o.manifest_stop}).name
            // console.log(o.toLabel);
            var a = getdatestringfor(o.sessiontime)
            // o.dateLabel=a
            var b = a.split('/')
            var gods = {
                1: 'January',
                2: 'February',
                3: 'March',
                4: 'April',
                5: 'May',
                6: 'June',
                7: 'July',
                8: 'August',
                9: 'September',
                10: 'October',
                11: 'November',
                12: 'December'
            }
            var m = gods[+b[0]]
            o.period =  m  +' ' +  b[2]
            o.sessiontimeLabel = gettimestring(o.sessiontime)
        })
        outboundTransfers = _.sortBy(outboundTransfers, 'sessiontime').reverse()
        return outboundTransfers
    }

    return _outboundTransfers;

};
