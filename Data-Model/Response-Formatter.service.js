
angular
.module('countryApp')
.factory('ResponseFormatter', [
    '$rootScope',
    'pnDB',
    ResponseFormatter ])


function ResponseFormatter($rootScope, pnDB) {

    _ResponseFormatter = {
        format: format,
        inventory: formatInventory,
        plants: formatPlants,
        inventory_transfer_inbound: formatInventoryTransferInbound,
        // formatInventory: formatInventory,
        // formatBusinesses: formatBusinesses,
        // formatPlantDerivatives: formatPlantDerivatives,
        // data: {},
    }

    var formatted = {}

    function format(raw) {
        // console.log(raw);
        // formatted.inventory = formatInventory(raw.inventory, raw.qa, raw.inventory_room);
        formatted.manifests = formatManifests(raw.manifest, raw.manifest_stop_data, raw.manifest_stop_items,  raw.inventory_transfer);
        // formatted.vendors = formatVendors(raw.vendor);
        // formatted.employees = formatEmployees(raw.employee);
        // formatted.vehicles = formatVehicles(raw.vehicle);
        // formatted.plants = formatPlants(raw.plant, raw.plant_room);
        // formatted.plant_rooms = formatPlantRooms(raw.plant_room);
        // formatted.inventory_rooms = formatInventoryRooms(raw.inventory_room);
        formatted.labs = raw.qa_lab;
        formatted.summary = raw.summary;
        return formatted;
    };
    function formatBusinesses(raw_businesses) {
        // console.log(raw_businesses);
        var formatted_businesses = []
        _.map(raw_businesses, function(biz, index){
            if(biz.length > 1) {
                var bstring = "";
                _.map(biz, function(b) {
                    bstring += b;
                });
                biz = [bstring];
            };
            // console.log(biz);
            // console.log(index);
            var rowString = biz[0];
            if (!rowString) return console.log('No Row String!');
            var rowArray = rowString.split(";");
            // log
            var name = ""
            // rowArray = _.map(rowArray, function(row){
            //     return row.trim()
            // })
            // rowArray = _.filter(rowArray, function(row){
            //     return row.length > 2
            // })
            // var json_address = ""
            // var json_address = rowArray[3]
            // if (typeof rowArray[3]) {
            //     // console.log(rowArray[3]);
            //     json_address =
            // }
            formatted_businesses[index] = {
                name: rowArray[0].trim(),
                license: JSON.parse(rowArray[1]),
                ubi: JSON.parse(rowArray[2]),
                address: JSON.parse(rowArray[3]) + JSON.parse(rowArray[5]) + JSON.parse(rowArray[6]) + JSON.parse(rowArray[8]),
                type: JSON.parse(rowArray[9]),
                status: JSON.parse(rowArray[10]),
                phone: JSON.parse(rowArray[11]),

                // city: ,
                // state: JSON.parse(rowArray[6]),
            }
            // console.log(formatted_businesses);

            // console.log(JSON.parse(biz));
        })
        // console.log(raw_businesses.producers);
        // console.log(JSON.parse(raw_businesses));
        formatted_businesses = _.filter(formatted_businesses, function(row){
            return row.name.length > 2
        })
        return formatted_businesses
        //
        // // console.log(raw_businesses);
        // var formatted_busiensses =[]
        // _.map(raw_businesses, function(raw_business_array){
        //     _.map(raw_business_array, function(business){
        //         var business_string = business[0];
        //         formatted_busiensses.push(business_string)
        //
        //         // var formatted_business_array = business_string.split(";");
        //         // formatted_busiensses.push(formatted_business_array);
        //     });
        // });
        // return formatted_busiensses;
    }




    function formatManifests(mans, stops, items, transfers) {
        // console.log("lets format those manifests!");
        var totalUntransferredOutboundManifests = 0;
        var manifests = aggregatemanifests(mans, stops, items)
        // console.log(transfers);
        if (!manifests) return console.log('No Manifests! What the heck');
        manifests.map( function (fest) {
            fest.totalprice = 0;
            transfers.map( function (fer) {
                if (fest.manifestid === fer.manifestid) {
                    fest.transferred = true
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
            fest.label += ''
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
            manifest.category =  b[0]  +'/' +  b[2]
            // console.log(a + ' ' + b + ' ' + manifest.category);
            // console.log(new Date(manifest.sessiontime).getMonth())
            // manifest.category =
        })

        // sortbykey(manifests, 'sessiontime');
        manifests = _.sortBy(manifests, 'sessiontime')
        pnDB.saveToDB('totalUntransferredOutboundManifests', {ubi: sessionStorage.ubi, count: totalUntransferredOutboundManifests}).then(function(res){console.log(res);})
        // sessionStorage.totalUntransferredOutboundManifests = totalUntransferredOutboundManifests

        // localStorage.setItem('manifests', JSON.stringify(manifests));
        return manifests
    }
    function gettimestring (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime * 1000).toLocaleString();
        // return unixtime *
    }
    function getdatestringfor (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime * 1000).toLocaleDateString();
        // return unixtime *
    }
    //////////////////////////////////////////////
    function aggregatemanifests (mans, stops, items) {
        var aggmanifests = []
        if (!mans) return console.log('No manifests');
        var manifest = mans
        var manifest_stop_data = stops
        var manifest_stop_items = items
        aggmanifests = _.clone(manifest);
        aggmanifests.map (function (agg) {
            agg.stops = [];
            manifest_stop_data.map(function (stopdata) {
                if (typeof stopdata.items === 'undefined') {
                    //stopdata.items = [];
                }
                if (agg.manifestid === stopdata.manifestid) {
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









    function formatPlants(plants, plant_rooms) {
        if (!plants) return
        var plantstatus = {
            0: 'Growing',
            1: 'Drying',
            2: 'Cured'
        }
        var plant_rooms_by_id = {}
        plant_rooms.map(function(room) {
            plant_rooms_by_id[room.roomid] = room.name
        })
        plants.map(function(plant){
            plant.plantStatus = plantstatus[plant.state]
            plant.plantBirthday = new Date(plant.sessiontime*1000).toISOString().slice(0,10)
            plant.plantlabel =  '['+plant.id+']' + ' ' + plant.strain + ' ' + plant.plantbirthday + ' ('+plant.plantstatus+')'
            plant.roomLabel = plant_rooms_by_id[plant.room]
            plant.category = plant.plant_room_name

        })
        return plants
    };
    function formatPlantRooms (pr) {
        return _.map(pr, function(room){
            room.id = room.roomid
            room.label = room.name
            return room
        })
    }






    function formatInventoryRooms(rooms) {
        var r = _.map(rooms, function(room) {
            room.id = room.roomid
            room.label = room.name
            return room;
        })
        return r
    }

    function formatInventory(raw) {
        var inventory = raw.inventory
        var qa = raw.qa
        var rooms = raw.inventory_rooms
        _.map(inventory, function(i) {

            _.map(rooms, function(r) {
                if (r.roomid === i.currentroom) {
                    i.roomLabel = r.name;
                }
            })

            i.qa = {potency: {}, moisture: {}, coliforms:{}, bacteria:{} };
            _.map(qa, function(q) {
                if (q.barcode_id === i.id) {
                    i.qa = q;
                    _.map(q.test, function(t){
                        if(t.THC) return i.qa.potency = t
                        if(t.moisture) return i.qa.moisture = t
                        if(t.coliforms) return i.qa.bacteria = t
                    })

                    if (i.qa.potency) {
                        i.thc = +i.qa.potency.THC;
                        i.thca = +i.qa.potency.THCA;
                        i.cbd = +i.qa.potency.CBD;
                    } else {
                        i.thc = 0;
                        i.thca = 0;
                        i.cbd = 0;
                    }
                    if (i.qa.result) {
                        i.passedQA = true;
                    };
                    i.inventorytypeInfo = getTypeInfo(i.inventorytype);
                    i.inventorytypelabel = i.inventorytypeInfo.label;
                    if (!i.strain) i.strain = "Mixed";
                    i.clientGroupTag = i.strain + ' - ' + i.inventorytypelabel;
                    i.sessiontimelabel = pnToTime(i.sessiontime);
                    if (i.inventorytypeInfo.weighable) i.pnQuantitiyLabel = i.remaining_quantity + ' g';
                    if (!i.inventorytypeInfo.weighable) i.pnQuantitiyLabel = i.remaining_quantity + ' x '+ i.usable_weight + ' g';

                    i.usable_weight = +i.usable_weight;
                    i.remaining_quantity = +i.remaining_quantity;
                };
            });
        });

        return inventory;
    };

    function pnToTime(sessiontime) {
        return new Date(sessiontime * 1000).toLocaleString()
    }
    function getTypeInfo(type) {
        var typemap = {
            5: {label:'Kief', weighable:true, backrgound:'red'},
            6: {label: 'Flower', weighable:true, background:'blue'},
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
            30: {label: 'Mix', weighable: true},
            31: {label: 'Mix Packaged', weighable: false},
            32: {label: 'Mix Infused', weighable: false}
        }
        return typemap[type];
    };



    function formatInventoryTransferInbound(inbound_transfers) {
        // console.log(inbound_transfers);
        if (!inbound_transfers) return console.log('Erorr! NO INBUOND TRAN' );
        var typemap = gettypemap()
        inbound_transfers.map(function(inbound_item){
            inbound_item.inventorytypelabel = typemap[inbound_item.inventorytype].label
            inbound_item.datestring = getdatestringfor(inbound_item.sessiontime)
            inbound_item.datetimestring = gettimestring(inbound_item.sessiontime)
            inbound_item.label =  '['+inbound_item.inventoryid+'] ' + parseFloat(inbound_item.quantity).toFixed(2) + ' x ' + inbound_item.strain + ' ' + inbound_item.inventorytypelabel + ' ($'+ inbound_item.price +')'
        })
        sortbykey(inbound_transfers, 'sessiontime');

        // localStorage.setItem('inbound_transfers', JSON.stringify(inbound_transfers));
        return inbound_transfers
    }
    function sortbykey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }
    // function formatPlantDerivatives(plant_derivatives, plant_rooms){
    //     var plant_rooms_by_id = {}
    //
    //     plant_rooms.map(function(room) {
    //         plant_rooms_by_id[room.roomid] = room.name
    //     })
    //     // plant_derivatives
    //     var toCure = []
    //     plant_derivatives.map(function(der){
    //         if (der.inventorytype === 29) {
    //             return toCure.push(der)
    //         }
    //         else {
    //             // console.log('NO! ');
    //         }
    //     })
    //     toCure.map(function(plant){
    //         // console.log(plant);
    //         plant.roomlabel = plant_rooms_by_id[plant.room]
    //         plant.typelabel = gettypemap()[plant.inventorytype].label
    //
    //         var plants_by_id = {}
    //         formatted.plants.map(function(p){
    //             // console.log(p);
    //             plants_by_id[p.id] = p
    //         })
    //
    //         // plant.strain =  ''
    //         // plant.strain =  plants_by_id[plant.plantid]
    //         plant.label = '['+plant.plantid+']' + ' ' +getdatestringfor(plant.sessiontime) +' '+ plant.weight + 'g ' //chroe + plant.strain
    //         // if (plant.inve)
    //         plant.category = plant.roomlabel
    //         // if (plant.inventorytype)
    //         //   "plant": {
    //         //     "wholeweight": "118.90",
    //         //     "room": "3",
    //         //     "location": "416545",
    //         //     "deleted": 0,
    //         //     "collectadditional": 0,
    //         //     "inventoryid": "3371766638471872",
    //         //     "sessiontime": "1419640549",
    //         //     "weight": "118.9",
    //         //     "harvestcollect": 1,
    //         //     "inventorytype": 27,
    //         //     "transactionid": "1346503",
    //         //     "plantid": "9246182783137305",
    //         //     "transactionid_original": "1346503",
    //         //     "curecollect": 0,
    //         //     "roomlabel": "Flowering B"
    //
    //     })
    //     // console.log(toCure.length);
    //     // console.log(plant_derivatives.length);
    //     // var byPlantID = {}
    //     // plant_derivatives.map(function(plant){
    //     //     byPlantID[plant.inventoryid] = plant
    //     // })
    //     var pd = { plant_derivatives_array: plant_derivatives, toCure:toCure}
    //     console.log(pd);
    //     // console.log(byPlantID);
    //     // console.log(byPlantID['9386360055820751'])
    //
    //     return pd
    // }
    function formatQALabs(qa_lab) {
        // {"transactionid":"122258","state":"WA","address1":"31 North 1st Avenue","transactionid_original":"122258","city":"Yakima","address2":null,"zip":"98902","name":"Analytical 360, LLC.","location":"0004"},{"city":"Spokane","transactionid_original":"206227","address1":"504 E. Sprague","transactionid":"206227","state":"WA","location":"0010","name":"Anatek Labs","zip":"99202","address2":"Suite D"},{"state":"WA","transactionid":"776907","address1":"2305 NE Hopkins Court","city":"Pullman","transactionid_original":"776907","zip":"99163","address2":null,"name":"CannaSafe Analytics","location":"0005"},{"zip":"98052","address2":null,"name":"Confidence Analytics","location":"0003","state":"WA","transactionid":"122259","address1":"14797 NE 95th St","city":"Redmond","transactionid_original":"122259"}
        return qa_lab.map(function(lab){
            var a = lab.address1
            if (!!lab.address2) a += ' ' + lab.address2
            var b =  " " + lab.city + " WA, " + lab.zip
            var address = a + b

            return {
                name: lab.name,
                address: address
            }
        });
    }
    function gettypemap () {
        var typemap = {
            5: {label:'Kief', weighable:true, backrgound:'red'},
            6: {label: 'Flower', weighable:true, background:'blue'},
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
            22: {label: 'Solid Marijuana Infused Edible', weighable: false},
            23: {label: 'Liquid Marijuana Infused Edible', weighable: false},
            24: {label: 'Extract for Inhalation', weighable: false},
            25: {label: 'Infused Topicals', weighable: false},
            26: {label: 'Sample Jar', weighable: false},
            27: {label: 'Waste', weighable: true},
            28: {label: 'Usable Flower', weighable: false},
            29: {label: 'Wet Flower', weighable: true},
            30: {label: 'Marijuana Mix', weighable: true},
            31: {label: 'Marijuana Mix Packaged', weighable: false},
            32: {label: 'Marijuana Mix Infused', weighable: false}
        }
        return typemap;
    }

return _ResponseFormatter
}
