angular
.module('countryApp')
.factory('FormRequestFormatter', [ FormRequestFormatter ])
function FormRequestFormatter() {
    return function (form) {
        console.log(form);

        var req = { action: form.action };
        var at = Date.now()
        console.log(at);
        var format = {
            inventory_qa_sample_void: function () {
                req.transactionid = form.qa_samples[0].transactionid
                return req
            },
            label_modify: function () {
                req.id = form.my_label.id
                req.name = form.label_nickname
                req.category = form.label_category.id
                req.page_template = JSON.stringify(form.page_template)
                req.label_template = JSON.stringify(form.label_template)
                return req
            },
            label_add: function () {
                var id = makeid();
                req.id = id;
                req.created_by = sessionStorage.ubi;
                req.name = form.label_nickname ? form.label_nickname : 'Label ' + id ;
                req.category = form.label_category.id;
                req.page_template = JSON.stringify(form.page_template);
                req.label_template = JSON.stringify(form.label_template);
                req.deleted = 0
                return req
            },
            label_remove: function () {
                req.id = form.my_label.id
                return req
            },
            page_templates_remove: function () {
                req.id = form.page_template.id
                return req
            },
            page_templates_modify: function () {

                var r = {
                    id: form.id,
                    action: req.action,
                    labelName: form.labelName? form.labelName: 'Page Template ' + form.id,
                    continuous: form.continuous,
                    printVertically: form.printVertically,
                    pageSize: (function () {
                        // if (!form.pageHeight) form.pageHeight = 11
                        if (!form.pageWidth) {
                            if(!form.continuous) form.pageWidth = 8.5
                            else form.pageWidth = form.labelWidth;
                        }
                        if(!form.continuous) {
                            if (!form.pageHeight) {
                                if(!form.continuous) form.pageHeight = 11
                                else form.pageHeight = form.labelHeight
                            }
                            return "height:"+form.pageHeight+"in; width:"+form.pageWidth+"in;"
                        } else {
                            return "height:"+form.labelHeight +"in; width:"+form.labelWidth+"in;"
                        }
                    }()),
                    topMargin: form.topMargin ? "height:"+form.topMargin+"in;" : "",
                    bottomMargin: form.bottomMargin ? "height:"+form.bottomMargin+"in;" : "",
                    leftMargin: form.leftMargin ? "width:"+form.leftMargin+"in;" : "",
                    rightMargin: form.rightMargin ? "width:"+form.rightMargin+"in;" :  "",
                    hSpacing: form.hSpacing ? "width:"+form.hSpacing+"in;": "",
                    vSpacing: form.vSpacing ? "height:"+form.vSpacing+"in;" :"",
                    labelSize: form.labelHeight ? "height:"+form.labelHeight+"in;width:"+form.labelWidth+"in;" :"",
                    rows: form.labelRows ? form.labelRows : 1,
                    cols: form.labelColumns ? form.labelColumns : 1,
                    isDefaultTemplate: form.isDefaultTemplate ? 1 : 0,
                    deleted:0,
                    created_by: sessionStorage.ubi
                }
                return r
            },
            page_templates_add: function () {
                var id = makeid()
                var r = {
                    id: id,
                    action: req.action,
                    labelName: form.labelName? form.labelName: 'Page Template ' + id,
                    continuous: form.continuous,
                    printVertically: form.printVertically,
                    pageSize: (function () {
                        // if (!form.pageHeight) form.pageHeight = 11
                        if (!form.pageWidth) {
                            if(!form.continuous) form.pageWidth = 8.5
                            else form.pageWidth = form.labelWidth;
                        }
                        if(!form.continuous) {
                            if (!form.pageHeight) {
                                if(!form.continuous) form.pageHeight = 11
                                else form.pageHeight = form.labelHeight
                            }
                            return "height:"+form.pageHeight+"in; width:"+form.pageWidth+"in;"
                        } else {
                            return "height:"+form.labelHeight +"in; width:"+form.labelWidth+"in;"
                        }
                    }()),
                    topMargin: form.topMargin ? "height:"+form.topMargin+"in;" : "",
                    bottomMargin: form.bottomMargin ? "height:"+form.bottomMargin+"in;" : "",
                    leftMargin: form.leftMargin ? "width:"+form.leftMargin+"in;" : "",
                    rightMargin: form.rightMargin ? "width:"+form.rightMargin+"in;" :  "",
                    hSpacing: form.hSpacing ? "width:"+form.hSpacing+"in;": "",
                    vSpacing: form.vSpacing ? "height:"+form.vSpacing+"in;" :"",
                    labelSize: form.labelHeight ? "height:"+form.labelHeight+"in;width:"+form.labelWidth+"in;" :"",
                    rows: form.labelRows ? form.labelRows : 1,
                    cols: form.labelColumns ? form.labelColumns : 1,
                    isDefaultTemplate: 0,
                    deleted:0,
                    created_by: sessionStorage.ubi
                }
                return r
            },
            favorite_vendor_add: function () {
                return req = form
            },
            favorite_vendor_remove: function () {
                return req = form
            },
            inventory_new: function(){
                req.data = [{
                    source_id: form.inventory[0].id,
                    invtype: form.invtype.id,
                    quantity: form.quantity,
                    strain: form.strain,
                }]

                req.location = form.vendors[0].location
                return req
            },
            timesheet_entry_remove: function() {
                console.log(form.my_timesheet[0]);
                var toRemove = form.my_timesheet[0]
                toRemove.deleted = 1
                req.timesheet = toRemove
                return req
            },
            timesheet_entry_add: function() {
                req.ubi = sessionStorage.ubi
                req.username = sessionStorage.username
                req.name = form.employees[0].employee_name
                req.time_in = form.time_in
                req.time_out = form.time_out
                req.hours_worked = form.hours_worked
                req.at = at
                console.log(req);
                return req
            },
            user_add: function() {
                req.new_username = form.new_username;
                req.new_password = form.new_password;
                req.new_permissions = form.new_user_permissions

                return req
            },
            user_remove: function() {

                return req = form
            },
            inventory_destroy_schedule_undo: function() {
                req.barcodeid = _.pluck(form.inventory, 'id')
                return req
            },
            plant_destroy_schedule_undo: function() {
                req.barcodeid = _.pluck(form.plants, 'id')
                return req
            },
            inventory_convert_undo: function() {
                req.barcodeid = form.inventory[0].id
                return req
            },
            inventory_transfer_inbound_modify: function() {
                req.transactionid = form.inbound_transfers[0].transactionid
                req.barcodeid = form.inbound_transfers[0].inventoryid
                req.price = form.price
                return req
            },
            plant_convert_to_inventory: function() {
                req.barcodeid = _.pluck(form.plants, 'id')
                return req;
            },
            inventory_split: function(){
                req.data = []
                _.map(form.inventory, function(item) {
                    req.data.push({barcodeid:item.id, remove_quantity:form.remove_quantity[item.id]})
                })
                return req;
            },
            inventory_manifest_modify: function () {
                req.manifest_id = form.manifests[0].manifestid
                if(form.employee_name) req.employee_name = form.employee_name
                if(form.employee_dob) req.employee_dob = form.employee_dob
                if(form.third_party_license) req.employee_dob = form.third_party_license
                if(form.employees) req.employee_id = form.employees[0].id
                return req
            },
            inventory_manifest_void_items: function() {
                req.manifest_id = form.manifests[0].manifestid
                req.barcodeid = _.pluck(form.inventory, 'id')
                return req;
            },
            inventory_manifest_void: function() {
                console.log(form.manifests);
                req.manifest_id = form.manifests[0].manifestid
                return req;
            },
            inventory_sample: function(){
                if (!form.inventory[0]) return console.log('They are trying to send an empty manifest');
                req.barcodeid = form.inventory[0].id;
                req.quantity = form.quantity
                if(form.employees) req.employee_id = form.employees[0].id
                if(form.vendors) req.vendor_license = form.vendors[0].location
                req.sample_type = form.sample_type;
                return req;
            },
            inventory_qa_sample_non_mandatory: function() {
                console.log(form);
                req.quantity = form.quantity
                req.quantity_uom = form.uom
                req.lab_id = form.labs.id
                req.barcodeid = form.inventory[0].id
                return req
            },
            inventory_qa_sample: function() {
                console.log(form);
                req.quantity = form.quantity
                req.quantity_uom = form.uom
                req.lab_id = form.labs.id
                req.barcodeid = form.inventory[0].id
                return req
            },
            inventory_create_lot: function() {
                req.lot_type = form.lot_type
                req.is_medical = form.is_medical
                req.data = []
                _.map(form.inventory, function(item) {
                    req.data.push({barcodeid:item.id, remove_quantity:form.remove_quantity[item.id]})
                })
                return req;
            },
            generate_manifest_for_request: function() {
                req.action = 'inventory_manifest'

                req.location = sessionStorage.myLocation;
                req.employee_id = form.employees[0].id
                req.vehicle_id = form.vehicles[0].vehicle_id
                req.stop_overview = [{
                    approximate_route: form.approximate_route,
                    approximate_departure: new Date(form.approximate_departure).getTime()/1000,
                    approximate_arrival: new Date(form.approximate_arrival).getTime()/1000,
                    vendor_license: form.recipient,
                    stop_number: 1,
                    barcodeid: form.inventoryitem
                }]
                return req;
            },
            want_to_sell: function() {
                var new_want_to_sell_listings = [];
                _.map(form.inventory, function(item){
                    // console.log(item);
                    // item.price = form.price[item.id];
                    // item.description = form.description[item.id];
                    // item.ready_by = form.ready_by[item.id];
                    var at = Date.now();
                    var ready_by = new Date(item.ready_by).getTime()/1000
                    console.log(ready_by);
                    // console.log(new);
                    new_want_to_sell_listings.push({
                        item_id: item.id,
                        uom: item.uom,
                        status: 'new',
                        strain: item.strain,
                        image: zeroIfNull(item.image),
                        price: item.price,
                        item_type: item.inventorytypelabel,
                        amount: item.pnQuantitiyLabel,
                        thc: zeroIfNull(item.thc),
                        thca: zeroIfNull(item.thca),
                        cbd: zeroIfNull(item.cbd),
                        ready_by: item.ready_by,
                        creator_ubi: sessionStorage.ubi,
                        creator_name: sessionStorage.myName,
                        creator_address: sessionStorage.myAddress,
                        creator_location: sessionStorage.myLocation,
                        description: item.description,
                        at: at
                    });
                });
                console.log(req);
                req.new_want_to_sell_listings = new_want_to_sell_listings;
                return req;
            },

            plant_cure: function() {
                req.barcodeid = form.plants[0].plantid
                if (!form.final) req.collectadditional = 1
                if (form.final) req.collectadditional = 0
                req.new_room = form.plant_rooms[0].id
                req.location = sessionStorage.myLocation
                req.weights = [
                    {
                        amount: form.plant_harvest_other_plant_material_amount,
                        uom: 'g',
                        invtype: 9
                    },
                    {
                        amount: form.plant_harvest_waste_amount,
                        uom: 'g',
                        invtype: 27
                    },
                    {
                        amount: form.plant_harvest_flower_amount,
                        uom: 'g',
                        invtype: 6
                    }
                ];
                return req

            },
            plant_harvest_schedule: function() {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
                return req;
            },
            plant_harvest: function() {
                req.barcodeid = form.plants[0].id
                if (!form.final) req.collectadditional = 1
                if (form.final) req.collectadditional = 0
                req.new_room = form.plant_rooms[0].id
                req.weights = [
                    {
                        amount: form.plant_harvest_other_plant_material_amount,
                        uom: 'g',
                        invtype: 9
                    },
                    {
                        amount: form.plant_harvest_waste_amount,
                        uom: 'g',
                        invtype: 27
                    },
                    {
                        amount: form.plant_harvest_flower_amount,
                        uom: 'g',
                        invtype: 6
                    }
                ]
                return req;

            },
            plant_destroy: function() {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
                return req;
            },
            plant_move: function() {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
                req.room = form.plant_rooms.id
                return req;
            },
            inventory_move: function() {
                req.data = []
                form.inventory.map(function(i){
                    req.data.push({barcodeid: i.id, room:form.inventory_rooms.id})
                })
                // req.room = form.inventory_rooms.id
                return req;
            },
            plant_destroy_schedule: function() {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
                req.reason = form.reason
                req.reason_extended = form.reason_extended
                req.override = 1
                return req;
            },
            inventory_room_remove: function() {
                req.id = form.inventory_rooms[0].id;
                return req;
            },
            inventory_room_add: function() {
                req.name = form.name
                req.location = form.vendors[0].location
                req.id = form.id
                return req;
            },
            plant_room_remove: function() {
                req.id = form.plant_rooms[0].id
                return req;
            },
            plant_room_add: function() {
                req.name = form.name
                req.location = form.vendors[0].location
                req.id = form.id
                return req;
            },
            plant_new: function() {
                req.location = sessionStorage.myLocation
                req.source = form.inventory[0].id
                req.room = form.plant_rooms[0].id
                req.strain = form.strain
                req.quantity = form.quantity
                var m = 0
                if (form.mother) m = 1
                req.mother = m
                return req;
            },
            inventory_transfer_inbound: function() {
                req.data = []
                form.accepted_items = {}
                console.log(form);
                // form.itemsInfo.map(function(item){
                //
                // })
                _.map(form.accept, function(accepted, id){
                    // console.log( accepted);
                    // console.log(accepted);
                    var quantity = _.find(form.itemsInfo, {barcode_id:id}).quantity
                    console.log(quantity);
                    if(accepted) form.accepted_items[id] = quantity
                })
                for (id in form.accepted_items) {
                    req.data.push({barcodeid:id, quantity: form.accepted_items[id], uom:'g'})
                }
                req.location = sessionStorage.myLocation
                return req;
            },
            inventory_transfer_outbound_return: function () {
                var data = []
                _.map(form.inventory_transfer_outbound_return, function (transfer) {
                    data.push(
                        {
                            barcodeid: transfer.barcode_id,
                            manifest_id: transfer.manifest_id,
                            price: transfer.price
                        }
                    )
                })
                req.data = data;
                return req;
            },
            inventory_transfer_outbound: function() {
                req.manifest_id = form.manifest_to_transfer.manifestid
                req.data = []
                for (property in form.manifest_prices) {
                    req.data.push({barcodeid: property, price: form.manifest_prices[property]})
                }
                return req;
            },
            inventory_manifest: function() {
                req.location = sessionStorage.myLocation;

                req.stop_overview = []
                var dest = []
                if (form.manifest_destination_type == 0) dest = form.vendors
                if (form.manifest_destination_type == 1) dest = form.labs
                console.log(dest);
                _.map(dest, function(vendor, index) {
                    if (vendor.id) vendor.location = vendor.id
                    req.stop_overview.push({
                        approximate_route: form.stops[index].approximate_route,
                        approximate_departure: new Date(form.stops[index].approximate_departure).getTime()/1000,
                        approximate_arrival: new Date(form.stops[index].approximate_arrival).getTime()/1000,
                        vendor_license: vendor.location,
                        stop_number: index+1,
                        barcodeid: _.pluck(form.stops[index].inventoryitems, 'id')
                    })
                })
                if(form.manifest_delivery_type == 0) {
                    req.action = "inventory_manifest"
                    req.employee_id = form.employees[0].id
                    req.vehicle_id = form.vehicles[0].vehicle_id
                }
                if(form.manifest_delivery_type == 1) {
                    req.action = "inventory_manifest_pickup"
                    req.employee_id = form.employee_id
                    req.employee_dob = form.employee_dob
                    req.employee_name = form.employee_name
                    req.vehicle_color = form.vehicle_color
                    req.vehicle_make = form.vehicle_make
                    req.vehicle_model = form.vehicle_model
                    req.vehicle_vin = form.vehicle_vin
                    req.vehicle_plate = form.vehicle_plate
                    req.vehicle_year = form.vehicle_year
                }
                if(form.manifest_type == 2) {
                    req.action = "inventory_manifest_third_party"
                }
                return req;
            },
            employee_remove: function() {
                req.employee_id = form.employees[0].id;
                console.log(req);
                return req;

            },
            employee_modify: function() {
                req.employee_name = form.employee_name
                var hirearray = new Date(form.hire_date).toISOString().slice(0,10).split("-")
                var birtharray = new Date(form.birth_date).toISOString().slice(0,10).split("-")
                req.birth_day = birtharray[2]
                req.birth_year = birtharray[0]
                req.birth_month = birtharray[1]
                req.hire_day = hirearray[2]
                req.hire_year = hirearray[0]
                req.hire_month = hirearray[1]
                req.employee_id = form.employee.employee_id
                return req;

            },
            employee_add: function() {
                req.employee_name = form.employee_name
                var hirearray = new Date(form.hire_date).toISOString().slice(0,10).split("-")
                var birtharray = new Date(form.birth_date).toISOString().slice(0,10).split("-")
                req.birth_day = birtharray[2]
                req.birth_year = birtharray[0]
                req.birth_month = birtharray[1]
                req.hire_day = hirearray[2]
                req.hire_year = hirearray[0]
                req.hire_month = hirearray[1]

                req.employee_id = form.employee_id
                return req;


            },
            vehicle_remove: function() {
                console.log(form.vehicles);
                req.vehicle_id = form.vehicles[0].vehicle_id
                return req;
            },
            // vehicle_modify: function() {
            //     req.color = form.color
            //     req.make = form.make
            //     req.model = form.model
            //     req.plate = form.plate
            //     req.vin = form.vin
            //     req.year = form.year
            //     req.vehicle_id = form.vehicle.vehicle_id
            //     return req;
            //
            // },
            vehicle_add: function() {
                // set vehicle_id to max vehicle_id + 1
                // var vehicle_ids = JSON.parse(localStorage.getItem('vehicles')).map( function (vehicle) {
                //     return vehicle.vehicle_id
                // })

                // max = Math.max.apply(null, vehicle_ids);
                req.vehicle_id = form.vehicle_id
                req.color = form.color
                req.make = form.make
                req.model = form.model
                req.plate = form.plate
                req.vin = form.vin
                req.year = form.year
                req.nickname = form.nickname
                return req;

            },
            inventory_destroy: function() {
                req.barcodeid = form.inventory.map( function(item) {
                    return item.id
                })
                return req;

            },
            inventory_convert: function() {
                var data = form.inventory.map( function(item) {
                    return {
                        barcodeid: item.id,
                        remove_quantity: form.remove_quantity[item.id],
                        remove_quantity_uom: form.uom,
                    }
                });
                req.data = data;
                req.derivative_type = form.derivative_type.id
                req.derivative_quantity = form.derivative_quantity
                req.derivative_usable = form.derivative_usable
                req.derivative_strain = form.derivative_strain
                req.derivative_product = form.derivative_product
                req.waste = form.waste
                req.waste_uom = form.uom
                req.derivative_quantity_uom = form.uom
                req.no_modification = 1
                return req
            },
            inventory_adjust: function() {
                var data = form.inventory.map( function(item) {
                    return {
                        barcodeid: item.id,
                        quantity: form.quantity[item.id],
                        quantity_uom: form.uom,
                        reason: form.adjust_reason,
                        type: form.adjust_type.id
                    }
                });
                req.data = data;
                return req
            },
            inventory_destroy_schedule: function() {
                var barcodeid = form.inventory.map ( function(item) {
                    return item.id
                })
                req.barcodeid = barcodeid
                req.reason = form.reason
                req.reason_extended = form.reason_extended
                return req;

            }
        };
        console.log(format[form.action]());

        if (!format[form.action]) return console.log('OH NO! IMPLEMENT RESPONSE FORMATTER FOR ' + form.action);
        // console.log(format[form.action]);
        return format[form.action]();
    };
    function zeroIfNull(term) {
        // console.log(term);
        if(term) return term;
        else return 0
        // return (term ? term : 0 );
    }
    function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}
