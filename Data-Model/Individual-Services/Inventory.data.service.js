angular.module("countryApp")
.factory("Inventory",
Inventory )

function Inventory(pnPost, $rootScope, pnDB, pnDataBank, $location) {
    var _inventory = {
        init: init,
        getTypeInfo: getTypeInfo,
        getTypeMap: getTypeMap,
        pn_inventory_sum: 0,
    };


    var _raw = {}
    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "data": [
            {table: 'inventory', active: '1', sum: 0},
            {table: 'inventory_room', active: '1', sum: 0},
            {table: 'manifest', active: '1', sum: 0}
        ],
        "download": 1,
        // "active": 1,
        "sessionid": sessionStorage.sessionid
    };


    function init() {
        // getInventoryFromLcb takes 1 minute!!!!!!! And sometimes doesn't work!

        //  We should use sums to determine if a refresh is needed.

        // Out of sync data is WORSE than a 1 minute wait.

        // I'd rather have fast and always accurate.
        getMySums()
        .then(checkWhetherWeNeedDataFromLCB)
        // .then(getLcbSums)
        // .then(compareSums)

        function getMySums() {
            // return pnDB.getFromDB('select * from billing where ubi="' + sessionStorage.ubi+'" and status="subscribed" order by `id` desc')
            function format(res) {
                return res
            }
            return format(pnDB.getFromDB('select * from inventory_pos where ubi="'+sessionStorage.ubi+'" and stale="0"'))
        };

        function checkWhetherWeNeedDataFromLCB(res) {
            console.log(res);
            var check_request = {
                "API": "4.0",
                "action": "sync_check",
                "data": [
                    {table: 'inventory', active: '1', sum: 0},
                    // {table: 'inventory_room', active: '1', sum: 0},
                    // {table: 'manifest', active: '1', sum: 0}
                ],
                "download": 0,
                // "active": 1,
                "sessionid": sessionStorage.sessionid
            };

            if(res.data.length === 0) {
                return getInventoryFromLcb()
            } else {
                _inventory.pn_inventory_sum = res.data[0].sum
                // console.log(res.data[0]);
                var d = JSON.parse(res.data[0].data)
                _inventory.inventory = JSON.parse(d.inventory)
                _inventory.inventory_rooms = JSON.parse(d.inventory_rooms)
                // console.log( JSON.parse(res.data[0].data));
                return pnPost(check_request).then(getLcbSums).then(compareSums)
            };
        };



        function compareSums() {
            console.log(_inventory.lcb_inventory_sum);
            console.log(_inventory.pn_inventory_sum);

            if  (_inventory.pn_inventory_sum == _inventory.lcb_inventory_sum) {
                _.map(_inventory.inventory, function (item) {
                    if(item.$selected) delete item.$selected
                })
                _inventory.data = _inventory.inventory
                pnDataBank.data.inventory = _inventory.data
                $rootScope.$broadcast('inventory')
                console.log('LOAD FROM THE DB!!!!');
            } else {
                return getInventoryFromLcb()

            }
            // console.log(lcb_sums)
        }

        // return getInventoryFromLcb()
//

    }

    function getLcbSums(res) {
        var lcb_sums = {}

        console.log(res.data)
        _.map(res.data.summary, function (t) {
            lcb_sums[t.table] = t.sum
        })
        _inventory.lcb_inventory_sum =  lcb_sums.inventory

        return
        // In the db I must keep track of: ubi, table_name, pn_table_sum, data
        // if my sums != LCB sums, getDatafromLCB, then saveToDB


    }
    function formatInventoryRooms(rooms) {
        var r = _.map(rooms, function(room) {
            room.id = room.roomid
            room.label = room.name
            return room;
        })
        return r
    }

    function getInventoryFromLcb() {
        return pnPost(sync_check_request)
        .then(function(res){
            console.log(res);
            if(res.data.error) {
                if(res.data.errorcode === "60") $location.path('/traceability/settings/logout')
            }
            getLcbSums(res)


            _raw.inventory = res.data.inventory;
            _raw.inventory_room = res.data.inventory_room;
            // _raw.manifest = res.data.manifest
            _raw.manifest_stop_items = res.data.manifest_stop_items
            _raw.manifests = res.data.manifest
            _raw.manifest_stop_data = res.data.manifest_stop_data
            console.log(_raw.inventory);
            var barcodes = _.pluck(_raw.inventory, 'id');
            return pnPost({
                action: 'inventory_qa_check_all',
                sessionid: sessionStorage.sessionid,
                barcodeid: barcodes
            });
        })
        .then(function(qaRes){
            // console.log(qaRes.data.data);
            _inventory.data = formatInventory(_raw.inventory,
                qaRes.data.data,
                _raw.inventory_room,
                _raw.manifest_stop_items,
                _raw.manifest_stop_data,
                _raw.manifests
            )
            _inventory.inventory_rooms = formatInventoryRooms(_raw.inventory_room);
            // console.log(qaRes);

            $rootScope.$broadcast('inventory');
        })
        .then(function () {
            // save to inventory_pos
            if(_inventory.data.length === 0) return getInventoryFromLcb();
            pnDB.saveToDB('inventory_pos', {
                ubi: sessionStorage.ubi,
                data: JSON.stringify({
                    inventory: JSON.stringify(_inventory.data),
                    inventory_rooms: JSON.stringify(_inventory.inventory_rooms)
                }),
                sum: _inventory.lcb_inventory_sum,
                stale: 0
            }).then(function (res) {
                console.log(res);
                $rootScope.$broadcast('save_inventory_pos')
            })
        })
    }

    function formatInventory(inventory, qa, rooms, stop_items, stop_data, manifests) {
        // console.log(stop_items);
        // console.log(stop_data)
        // console.log(manifests)

        // item.manifestid = i.manifestid
        // item.manifestedToName = stop.name




        var pnQaMap = {}
        _.map(inventory, function(i) {
            // i.sessiontimeLabel = pnToTime(i.sessiontime);
            // i.period =
            var a = getdatestringfor(i.sessiontime)
            i.dateLabel=a
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
            i.period =  m  +' ' +  b[2]
            i.sessiontimeLabel = gettimestring(i.sessiontime)

            // i.sessiontime = gettimestring(i.sessiontime)

            // i.pnInventoryQuantity = {
            //     usable_weight: i.usable_weight,
            //     remaining_quantity: i.remaining_quantity,
            //     weighable: getTypeInfo(i.inventorytype).weighable
            // }

            var m = _.findWhere(stop_items, {inventoryid: i.id})
            if (!!m) {
                i.manifestid = m.manifestid

                var s = _.findWhere(stop_data, {manifestid: i.manifestid});
                i.manifestedToName = s.name
                console.log(s);
                // i.manifestedToNameUbi = s.name + ' ' + s.ubi
                i.manifestedToNameLicense = s.name + ' (' + s.license_number+ ")"

            }
            // console.log(rooms);
            _.map(rooms, function(r) {
                if (r.roomid === i.currentroom) {
                    i.roomLabel = r.name;
                }
                if (!i.currentroom) {
                    i.roomLabel = "Bulk Inventory"
                }
            })

            // i.qa = {potency: {}, moisture: {}, coliforms:{}, bacteria:{} };
            _.map(qa, function(q) {
                if (q.barcode_id === i.id) {
                    i.qa = q;
                    _.map(q.test, function(t){
                        if(t.THC) return i.qa.potency = t
                        if(t.moisture) return i.qa.moisture = t
                        if(t.coliforms) return i.qa.bacteria = t
                    })
                    formatQa(i)
                } else {
                    _.map(i.inventoryparentid, function(p){
                        if(_.contains(_.keys(pnQaMap), i.inventoryparentid)) {
                            i.qa = pnQaMap[p]
                            formatQa(i)

                        }
                    })
                }
                function formatQa(i){
                    if (i.qa.potency) {
                        pnQaMap[i.id] = i.qa

                        i.thc = parseFloat(i.qa.potency.THC);
                        i.thca = parseFloat(i.qa.potency.THCA);
                        i.cbd = parseFloat(i.qa.potency.CBD);
                        i.totalThc = parseFloat(i.thc + i.thca).toFixed(2);
                        i.totalCannabinoids = i.totalThc + i.cbd
                        // console.log('totalThc ' +  i.totalThc);
                    } else {
                        i.thc = 0;
                        i.thca = 0;
                        i.cbd = 0;
                        i.totalThc = 0;
                        i.totalCannabinoids = 0
                    }
                    if (i.qa.result) {
                        i.passedQA = true;
                    };
                    if(i.qa.bacteria) {
                        i.aerobic_bacteria = i.qa.bacteria.aerobic_bacteria;
                        i.bile_tolerant = i.qa.bacteria.bile_tolerant;
                        i.coliforms = i.qa.bacteria.coliforms
                        i.e_coli_and_salmonella = i.qa.bacteria.e_coli_and_salmonella
                    }
                    i.inventorytypeInfo = getTypeInfo(i.inventorytype);
                    i.titleLabel = i.inventorytypeInfo.label + ' ('+i.id+')'
                    if (!i.inventorytypeInfo) console.log('Un OH!! NO INVENTORY TYPE INFO FOR' + i.inventorytype);
                    else i.inventorytypelabel = i.inventorytypeInfo.label;
                    if (!i.strain) i.strain = "Mixed";
                    if (i.inventorytypeInfo.weighable) {
                        i.pnQuantitiyLabel = parseFloat(i.remaining_quantity).toFixed(2);
                        i.pnReportQuantity = +i.pnQuantitiyLabel
                    }
                    if (!i.inventorytypeInfo.weighable) {
                        i.pnQuantitiyLabel = parseInt(i.remaining_quantity) + ' x '+ parseFloat(i.usable_weight).toFixed(2);
                        i.pnReportQuantity = parseInt(i.remaining_quantity) * parseFloat(i.usable_weight)
                        i.pnReportQuantity = +parseFloat(i.pnReportQuantity).toFixed(2);
                    }

                    i.usable_weight = parseFloat(i.usable_weight).toFixed(2);
                    i.remaining_quantity = parseFloat(i.remaining_quantity).toFixed(2);

                    // i.remaining_quantity = +i.remaining_quantity;
                }

            })
            // delete q.test

        });

        // angular.forEach($scope.friends, function (friend) {
        //   friend.age = parseFloat(friend.age);
        //  });
        inventory = _.sortBy(inventory, 'sessiontime').reverse()
        return inventory;
    };

    function pnToTime(sessiontime) {
        return new Date(sessiontime * 1000).toLocaleString()
    }
    function getTypeMap() {
        return{
            5: {label:'Kief', weighable:true},
            6: {label: 'Flower', weighable:true},
            7: {label: 'Clone', weighable: true},
            9: {label: 'Other Plant Material', weighable: true},
            10: {label: 'Seed', weighable: false, seed: true},
            11: {label: 'Plant Tissue', weighable: true},
            12: {label: 'Mature Plant', weighable: true},
            13: {label: 'Flower Lot', weighable: true},
            14: {label: 'Other Plant Material Lot', weighable: true},
            15: {label: 'Bubble Hash', weighable: true},
            16: {label: 'Hash', weighable: true},
            17: {label: 'Hydrocarbon Wax', weighable: true},
            18: {label: 'CO2 Hash Oil', weighable: true},
            19: {label: 'Food Grade Solvent Extract', weighable: true},
            20: {label: 'Infused Dairy Butter or Fat in Solid Form', weighable: true},
            21: {label: 'Infused Cooking Oil', weighable: true},
            22: {label: 'Solid Infused Edible', weighable: false},
            23: {label: 'Liquid Infused Edible', weighable: false},
            24: {label: 'Extract for Inhalation', weighable: false},
            25: {label: 'Infused Topicals', weighable: false},
            26: {label: 'Sample Jar', weighable: false},
            27: {label: 'Waste', weighable: true},
            28: {label: 'Usable Flower', weighable: false},
            29: {label: 'Wet Flower', weighable: true},
            30: {label: 'Marijuana Mix', weighable: true},
            31: {label: 'Marijuana Mix Packaged', weighable: false},
            32: {label: 'Marijuana Mix Infused', weighable: false},
            33: {label: 'Non-Mandatory QA Sample', weighable: false},
            34: {label: 'Capsule', weighable: false},
            35: {label: 'Tincture', weighable: false},
            36: {label: 'Transdermal Patch', weighable: false},
            37: {label: 'Suppository', weighable: false}
        }

    }
    function getTypeInfo(type) {
                return getTypeMap()[type];
    };


    return _inventory;

};
