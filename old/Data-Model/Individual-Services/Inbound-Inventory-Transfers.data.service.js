angular.module("countryApp")
.factory("pnDataMaker", [
    'pnPost',
    '$rootScope',
    InboundInventoryTransfers,
])

function pnDataMaker(pnPost, $rootScope) {
    return function(tables) {

    }
    var _InboundInventoryTransfers = {

    };



    var _raw = {}
    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "download": 1,
        "sessionid": sessionStorage.sessionid
    };
    _.map(tables, function(t) {
        sync_check_request.data.push({table: t, active: '1', sum: 0},)
    })
    pnPost(sync_check_request)
    .then(function(res){
        _InboundInventoryTransfers.data = formatInboundInventoryTransfers( res.data.inv);
        $rootScope.$broadcast('InboundInventoryTransfers');
    })




    return _InboundInventoryTransfers;

};
