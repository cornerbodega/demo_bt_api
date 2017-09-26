angular.module("countryApp")
.factory("InboundTransfers",
    InboundTransfers)

function InboundTransfers(pnPost, Inventory, $rootScope, Vendors, pnDataBank) {
    var _inboundTransfers = {
        init: init
    };

    if (!Vendors.data) Vendors.init()
    function init() {
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'inventory_transfer_inbound', active: '1', sum: 0},
                // {table: 'plant_qa', active: '1', sum: 0}
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            console.log(res);
            _inboundTransfers.data = formatInboundTransfers(res.data.inventory_transfer_inbound);
            pnDataBank.data.inbound_transfers = _inboundTransfers.data
            $rootScope.$broadcast('inbound_transfers');
            console.log(_inboundTransfers.data);
        })
    };

    function formatInboundTransfers(inbound_transfers) {
        // console.log(inbound_transfers);
        if (!inbound_transfers) return console.log('Erorr! NO INBUOND TRAN' );
        if(!Vendors.data) {
            return setTimeout(function () {
                formatInboundTransfers(inbound_transfers)
            },1000)
        }
        console.log(Vendors.data);
        // var typemap = Inventory.getTypeInfo()
        inbound_transfers.map(function(inbound_item){
            inbound_item.id = inbound_item.inventoryid
            inbound_item.vendorName = _.find(Vendors.data, {location: inbound_item.outbound_license}).vendorName

            inbound_item.inventorytypelabel = Inventory.getTypeInfo(inbound_item.inventorytype).label
            inbound_item.datestring = getdatestringfor(inbound_item.sessiontime)
            var b = inbound_item.datestring.split('/')
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
            inbound_item.period =  m  +' ' +  b[2]
            inbound_item.datetimestring = gettimestring(inbound_item.sessiontime)
            inbound_item.label =  '['+inbound_item.inventoryid+'] ' + parseFloat(inbound_item.quantity).toFixed(2) + ' x ' + inbound_item.strain + ' ' + inbound_item.inventorytypelabel + ' ($'+ inbound_item.price +')'
        })
        sortbykey(inbound_transfers, 'sessiontime').reverse;

        // localStorage.setItem('inbound_transfers', JSON.stringify(inbound_transfers));
        return inbound_transfers
    }
    return _inboundTransfers;

};
