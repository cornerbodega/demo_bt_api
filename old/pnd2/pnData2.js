angular
.module('countryApp')
.factory('pnData2', ['SyncCheckService', '$rootScope', '$http', 'pnDB',
pnData2
]);


function pnData2(SyncCheckService, $rootScope, $http, pnDB) {
    console.log('PNDATA2');
    _pnData2 = {
        refresh: refresh,
        data: {},
    };
    // console.log('pnData2');
    pnDB.getPos().then(init);
    function init(res){
        if(!!res.data[0].data) {
            _pnData2.data = JSON.parse(res.data[0].data);
            $rootScope.$broadcast('pnData2');
        } else {
            SyncCheckService.refresh()
        }
    }
    $rootScope.$on('sync_check_complete', function(){
        console.log('sync_check_complete');
        _pnData2.data = SyncCheckService.data;
        $rootScope.$broadcast('pnData2');
    });

    function refresh() {
        SyncCheckService.refresh();
        console.log('pnData2 refresh');
        $rootScope.$broadcast('refresh_pnData2');
    }

    return _pnData2
};
