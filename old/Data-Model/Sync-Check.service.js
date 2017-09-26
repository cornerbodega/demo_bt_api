
angular
.module('countryApp')
.factory('SyncCheckService', ['pnPost', 'ResponseFormatter', '$rootScope', 'pnDB',
    SyncCheckService
])



function SyncCheckService(pnPost, ResponseFormatter, $rootScope, pnDB) {

    _SyncCheckService = {
        init: init,
        data: {},
        getSyncCheckRequest: getSyncCheckRequest
    }

    function init(dbSummary) {
        // refresh();
        // Check if we need to refresh the db
        // We've already loaded from brs_pos if the info was There
        // It may not be. If this is the case, refresh()
        // but if brs_pos has loaded, we want to check if it's stale
        // if it's stale, refresh()
        // if not, don't refresh()
        if (!dbSummary) return refresh();
        if(dbSummary.length === 0) return refresh();
        else {
            return pnPost(getSyncCheckRequest(0)).then(function(res){
                console.log(res);
                console.log(res.data.summary);
                var serverSummary = res.data.summary
                var diff  = compareSummaries(dbSummary, serverSummary)
                if (diff != 0) {
                    console.log('SUMMARIES DO NOT MATCH ' + diff);
                    return refresh();
                } else {
                    console.log('DIFFS MATCH');
                }
                // console.log(JSON.stringify(serverSummary) === JSON.stringify(dbSummary));
                // console.log(JSON.stringify(serverSummary));
                // console.log(JSON.stringify(dbSummary));
                // console.log(localStorage.getItem('mySummary'));
                // refresh();

            })
        }

        function compareSummaries(dbs, ss) {
            if (!dbs) return false
            if (!ss) return false

            dbs_sum = 0;
            ss_sum = 0;
            _.map(dbs, function(s) {
                // console.log(s.sum);
                dbs_sum += ~~s.sum
            })
            _.map(ss, function(s1) {
                // console.log(s1.sum);
                ss_sum += ~~s1.sum
            })

            return dbs_sum - ss_sum

        }

    }
    // if (!localStorage.getItem('myData')){
    //     console.log('init!');
    //     init();
    // }
    // init();

    function refresh() {
        console.log('refresh sync check!');
        var sc = pnPost(getSyncCheckRequest(1))
        sc.success(formatSyncCheckRes)
        // return sc
    }

    function formatSyncCheckRes(syncCheckRes) {
        var barcodes = [];
        // console.log(syncCheckRes);
        _.map(syncCheckRes.inventory, function(item){
            barcodes.push(item.id)
        })
        getQA(barcodes);
        function getQA(barcodes){
            pnPost({
                action: 'inventory_qa_check_all',
                sessionid: sessionStorage.sessionid,
                barcodeid: barcodes
            })
            .success(function(qaRes){
                syncCheckRes.qa = qaRes.data
                console.log(syncCheckRes);
                localStorage.setItem('mySummary', JSON.stringify(syncCheckRes.summary));
                // console.log(localStorage.getItem('mySummary'));
                var formatted = ResponseFormatter.format(syncCheckRes);
                console.log('FINALLY');

                pnDB.setPos(JSON.stringify(formatted)).then(function(res){console.log(res);});

                _SyncCheckService.data = formatted;
                $rootScope.$broadcast('sync_check_complete');
            })
        };
    }
    return _SyncCheckService
}

function getSyncCheckRequest(download, noSummary) {
    var sessionid = sessionStorage.sessionid
    // console.log(sessionid);
    // sessionid = 'df285510b8b9bd4f97b1c1678f30a228c347543d8084339a621c219f218a4e68bd7a6245c07c60be55abb345211a288bb632cb4675acd3629c3c0d9ce8f9f6db'
    var tables_to_sync = [
        'vehicle',
        'employee',
        'plant_room',
        'inventory_room',
        'inventory',
        'plant',
        // 'plant_derivative',
        'manifest',
        'inventory_transfer',
        'inventory_transfer_inbound',
        // 'sale',
        // 'tax_report',
        'vendor', // move to sep call
        'qa_lab',
        // 'third_party_transporter',
        // 'inventory_adjust',
        // 'inventory_qa_sample',
        // 'inventory_sample',
    ];
    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "data": [],
        "download": download,
        "active": 1,
        "sessionid": sessionid
    };
    // localStorage.clear();

    if (localStorage.getItem('myData') && !noSummary) {
        var mySummary = {};
        _.map(JSON.parse(localStorage.getItem('myData')).summary, function(summary) {
            mySummary[summary.table] = summary.sum;
        });
    }

    tables_to_sync.map( function( table ) {

        var d = {table: table, active: 1}
        if(mySummary) d.sum = mySummary[table];
        sync_check_request.data.push(d);
        // console.log();
    });
    console.log(sync_check_request);
    return sync_check_request;
}
