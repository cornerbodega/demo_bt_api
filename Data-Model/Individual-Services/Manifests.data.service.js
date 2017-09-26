angular.module("countryApp")
.factory("Manifests",
    Manifests
)

function Manifests(pnPost, $rootScope, pnDataBank) {
    var _manifests = {
        init: init,
    };


    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "data": [
            {table: 'manifest', active: '1', sum: 0},
            {table: 'inventory_transfer', active: '1', sum: 0},
            // {table: 'plant_room', active: '1', sum: 0}
            // {table: 'plant_qa', active: '1', sum: 0}
        ],
        "download": 1,
        // "active": 1,
        "sessionid": sessionStorage.sessionid
    };
    var t = 0
    function init() {
        t++;
        pnPost(sync_check_request)
        .then(function(res){
            var raw = res.data
            console.log(raw);
            if(res.data.length === 0) {
                if (t < 2) init();
            }
            _manifests.data = formatManifests(raw.manifest, raw.manifest_stop_data, raw.manifest_stop_items,  raw.inventory_transfer);

            console.log(_manifests.data);
            pnDataBank.data.manifests = _manifests.data
            $rootScope.$broadcast('manifests')

        })

    }

    function formatManifests(mans, stops, items, transfers) {
        // console.log("lets format those manifests!");
        var totalUntransferredOutboundManifests = 0;
        var manifests = aggregatemanifests(mans, stops, items)
        // console.log(transfers);
        if (!manifests) return console.log('No Manifests! What the heck');
        manifests.map( function (fest) {
            fest.id = fest.manifestid
            fest.totalprice = 0;
            transfers.map( function (fer) {
                if (fest.manifestid === fer.manifestid) {
                    fest.transferred = 1
                    if (typeof fest.transfers === 'undefined') {
                        fest.transfers = [];
                    }
                    fest.transfers.push(fer)
                    fest.totalprice += parseInt(fer.price)
                    fest.stops.map( function (stop) {
                        if (!stop.stop_total_price) stop.stop_total_price = 0
                        // console.log(stop.stop_total_price   + ' 1stop.stop_total_price')
                        stop.items.map(function (item) {
                            // if(!stop.stop_total_price) stop.stop_total_price = 0
                            // stop.stop_total_price += parseFloat(item.price).toFixed(2)
                            if (item.inventoryid === fer.inventoryid) {
                                if (Math.round(fer.price) != fer.price) {
                                    fer.price = parseFloat(fer.price).toFixed(2);
                                }
                                item.price = parseFloat(fer.price).toFixed(2);
                                stop.stop_total_price = parseFloat(stop.stop_total_price) + parseFloat(item.price)
                                var ppu = parseFloat(fer.price) / parseInt(item.quantity)
                                if (Math.round(ppu) != ppu) {
                                    ppu = ppu.toFixed(2);
                                }
                                item.priceperunit = '$' + ppu
                                item.price = '$' + item.price;
                                // console.log(stop.stop_total_price   + ' 2stop.stop_total_price')

                            }
                        })
                    })
                }
            })
            fest.label = ''
            if (fest.totalprice > 0) fest.label += ' ($' + fest.totalprice + ')'
            if (!fest.transferred) {

                totalUntransferredOutboundManifests++;
                fest.label = '[Not Transferred] ' + fest.label
            }
        })
        manifests.map(function(manifest){
            var a = getdatestringfor(manifest.sessiontime)
            manifest.dateLabel=a
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
            manifest.period =  m  +' ' +  b[2]
            manifest.sessiontimeLabel = gettimestring(manifest.sessiontime)
            // manifest.sessiontime = gettimestring(manifest.sessiontime)

            // console.log(a + ' ' + b + ' ' + manifest.category);
            // console.log(new Date(manifest.sessiontime).getMonth())
            // manifest.category =
        })


        manifests = _.sortBy(manifests, 'sessiontime').reverse()


        // UNCOMMENT FOR MARKETPLACE!!
        // pnDB.saveToDB('totalUntransferredOutboundManifests', {ubi: sessionStorage.ubi, count: totalUntransferredOutboundManifests}).then(function(res){console.log(res);})

        return manifests
    }
    function gettimestring (unixtime) {
        return new Date(unixtime * 1000).toLocaleString();
    }
    function getdatestringfor (unixtime) {
        return new Date(unixtime * 1000).toLocaleDateString();
    }
    function aggregatemanifests (mans, stops, items) {
        var aggmanifests = []
        if (!mans) return console.log('No manifests');
        var manifest = mans
        var manifest_stop_data = stops
        var manifest_stop_items = items
        aggmanifests = _.clone(manifest);
        aggmanifests.map (function (agg) {
            agg.stops = [];
            agg.toLabel = ''
            manifest_stop_data.map(function (stopdata) {
                // if (typeof stopdata.items === 'undefined') {
                    //stopdata.items = [];
                    // console.log('Undefined stop data!');
                // }
                if (agg.manifestid === stopdata.manifestid) {
                    agg.toLabel += stopdata.name + ' ';
                    agg.stops.push(stopdata);
                }
            })

            manifest_stop_items.map(function (stopitem) {
                if (stopitem.manifestid === agg.manifestid) {
                    agg.stops.map (function (stop) {
                        if (stop.manifestid === stopitem.manifestid) {
                            if (stop.stopnumber === stopitem.stopnumber) {
                                if (typeof stop.items === 'undefined') {
                                    stop.items = [];
                                }
                                stop.items.push(stopitem);
                            }
                        }
                    })
                }
            })
        })
        aggmanifests.map(function (m) {
            m.label = '[' + m.manifestid + ']' + ' ';
            // m.label +=
            m.label += gettimestring(m.completion_date)
            if (m.stopcount === 1) {
                m.label += ' ' + ' to '+ m.stops[0].name
            }
        })
        return aggmanifests;
    }

    return _manifests;
}
