angular
.module('countryApp')
.factory('pnData', ['SyncCheckService', '$rootScope', '$http', 'pnDB',
    pnData
]);


function pnData(SyncCheckService, $rootScope, $http, pnDB) {
    console.log(pnDB);
    console.log('PNDATA');
    var _pnData = {
        refresh: refresh,
        data: {},
    };

    // pnDB.getPos().then(init)

    function init(res){
        console.log(res);
        // REFRESH SYNC CHECK DATA FROM LCB

        if (!res) return [];
        if(res.data.length > 0) {
            _pnData.data = JSON.parse(res.data[0].data);
            console.log('Got Pos From DB!');
            console.log(_pnData.data);
            $rootScope.$broadcast('pnData');
            SyncCheckService.init(_pnData.data.summary);
        }
        else {
            console.log('NEW POTNET USER! THERE IS NO BRS_POS DATA!!');
            $rootScope.$broadcast('noPos')
            SyncCheckService.init([])
        }
    }
    $rootScope.$on('sync_check_complete', function(){
        console.log('sync_check_complete');
        _pnData.data = SyncCheckService.data;
        $rootScope.$broadcast('pnData');
    });


    function refresh() {
        // SyncCheckService.init(_pnData.data.summary);
        console.log('MANUAL pnData refresh');
        console.log('PN DATA IS TURNED OFF.');
        // $rootScope.$broadcast('refresh_pnData');
        // sessionStorage.refresh = false;

    }

    return _pnData
};
