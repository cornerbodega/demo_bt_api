(function(){
    angular
    .module('countryApp')
    .factory('TraceabilityMenuService', [ TraceabilityMenuService ]);

    function TraceabilityMenuService() {
        return{

            paths: function(){
                return {
                    "/traceability": [
                        // { label: 'Traceability', id: 'dashboard', icon: 'fa-pencil-square-o' },

                        { label: 'Plants', id: 'plants', icon: 'fa-pagelines' },
                        { label: 'Inventory', id: 'inventory', icon: 'fa-barcode' },
                        { label: 'Labels', id: 'labels', icon: 'fa-print' },

                        { label: 'Manifests', id: 'manifests', icon: 'fa-telegram' },
                        { label: 'Transfers', id: 'transfers', icon: 'fa-truck' },

                        // { label: 'Labs', id: 'qa_lab', icon: 'fa-graduation-cap' },
                        { label: 'My Location', id: 'location', icon: 'fa-building-o' },

                        { label: 'Reports', id: 'reports', icon: 'fa-pie-chart' },

                        // FUNCTIONAL BUT UNEEDED
                        { label: 'Favorite Vendors', id: 'favorite_vendors', icon: 'fa-address-book-o' },

                        // Not Ready. I killed pnCuratedDetailsTable, but otherwise it's functional.
                        { label: 'ABC Exchange', id: 'market', icon: 'fa-exchange' },
                        { label: 'Timeclock', id: 'timesheet', icon: 'fa-clock-o' },

                        { label: 'Options', id: 'settings', icon: 'fa-gear' },
                        { label: 'Forum', id: 'forum', icon: 'fa-university' },

                        // { label: 'Businesses', id: 'vendors', icon: 'fa-address-book-o' },
                        // { label: 'Sales', id: 'sales', icon: 'fa-line-chart' },
                        // { label: 'Tax Report', id: 'tax_report', icon: 'fa-meh-o' },
                    ],

                    "/":[
                        { label: 'ABC Home', id: 'traceability', img: 'img/dopelogo/dark-bg/dopelogo-dark-bg.png'},
                        // { label: 'Potnet', id: 'traceability', img: 'img/potlogo.svg'},

                    ],
                    "/traceability/labels":[
                        // {''},
                        { label: 'Print Labels', id: 'generate_labels', icon: 'fa-print' },
                        // { label: 'Print Labels', id: 'label_view', icon: 'fa-print' },

                        { label: 'Label Templates', id: 'label_templates', icon: ' fa-sticky-note-o' },
                        { label: 'Page Templates', id: 'page_templates', icon: 'fa-newspaper-o' },
                        // { label: 'Inventory Labels', id: 'inventory_labels', icon: 'fa-barcode' },
                        // { label: 'Manifest Labels', id: 'manifests_labels', icon: 'fa-telegram' },


                        // { label: 'Potnet', id: 'traceability', img: 'img/potlogo.svg'},

                    ],
                    "/traceability/labels/label_templates":[
                        { label: 'Create Label Tempate', id: 'label_add', icon: 'fa-plus-circle' },
                        { label: 'Modify Label Template', id: 'label_modify', icon: 'fa-edit' },
                        { label: 'Delete Label Template', id: 'label_remove', icon: 'fa-remove' },


                    ],
                    "/traceability/labels/page_templates":[
                        // {''},
                        { label: 'View Page Templates',  id: 'page_templates_view', icon: 'fa-newspaper-o' },
                        { label: 'Create Page Template', id: 'page_templates_add', icon: 'fa-plus-circle' },
                        { label: 'Modify Page Template', id: 'page_templates_modify', icon: 'fa-edit' },
                        { label: 'Delete Page Template', id: 'page_templates_remove', icon: 'fa-remove' },
                    ],

                    // "/traceability/timesheet": [
                    //     { label: 'View Timesheet', id: 'browse_timesheet', icon: 'fa-clock-o' },
                    //     { label: 'Add Entry', id: 'timesheet_entry_add', icon: 'fa-plus-circle' },
                    //     { label: 'Remove Entry', id: 'timesheet_entry_remove', icon: 'fa-remove' },
                    //
                    // ],
                    "/traceability/timesheet": [
                        { label: 'View Timesheet', id: 'browse_timesheet', icon: 'fa-clock-o' },
                        { label: 'Add Entry', id: 'timesheet_entry_add', icon: 'fa-plus-circle' },
                        { label: 'Remove Entry', id: 'timesheet_entry_remove', icon: 'fa-remove' },
                    ],
                    "/traceability/help": [
                        { label: 'Feedback', id: 'help' },
                    ],
                    "/traceability/favorite_vendors": [
                        { label: 'View Favorite Vendors', id: 'view_favorite_vendors', icon: 'fa fa-address-book-o' },
                        { label: 'Add Favorite Vendors', id: 'favorite_vendor_add', icon: 'fa-plus-circle'  },
                        { label: 'Remove Favorite Vendors', id: 'favorite_vendor_remove', icon: 'fa-remove'  },
                    ],
                    "/traceability/settings": [
                        { label: 'History & Undo', id: 'undo', icon: 'fa-undo' },
                        { label: 'User Guide', id: 'user_guide', icon: 'fa-binoculars' },

                        { label: 'Site Map', id: 'features', icon: 'fa-map-signs' },



                        { label: 'Sync', id: 'sync', icon: 'fa-refresh' },

                        { label: 'My Subscription', id: 'select_plan', icon:'fa-money'},
                        { label: 'Log Out', id: 'logout', icon:'fa-sign-out'},
                    ],
                    // "/traceability/settings/billing":[
                    //     { label: 'Checkout', id: 'payments', icon: 'fa-money' },
                    // ],
                    "/traceability/location/users":[
                        // { label: 'View Users', id: 'browse_users', icon:'fa-id-card' },
                        { label: 'Add User', id: 'user_add', icon:'fa-user-plus' },
                        // { label: 'Modify User', id: 'employee_modify', icon:'' },
                        { label: 'Remove User', id: 'user_remove', icon:'fa-user-times' }
                    ],
                    "/extra": [
                        { label: 'My Membership', id: 'my_membership', icon: 'fa-user'},
                        { label: 'Request Manifest', id: 'request_manifest', icon: 'fa-magnet' },
                        { label: 'Access', id: 'new_client', icon: 'fa-unlock-alt' },
                        { label: 'Cancel Subscription', id: 'cancel', icon: 'fa-remove' },
                        { label: 'Create Manifest', id: 'generate_manifest_for_request', icon: 'fa-telegram' },
                        { label: 'Undo Inventory Convert', id: 'inventory_convert_undo', icon: 'fa-undo' },
                        { label: 'Undo Schedule Destruction', id: 'inventory_destroy_schedule_undo', icon: 'fa-undo' },
                        { label: 'User Manual', id: 'user-manual', icon: 'fa-user' },
                        { label: 'Create Label', id: 'labels3', icon: 'fa-plus-circle' },


                    ],
                    "/admin": [
                        {label: 'Clients', id: 'clients', icon: 'fa-users'}
                    ],

                    "/traceability/market": [
                        { label: 'View Listings', id: 'browse_market', icon: 'fa-exchange' },

                        { label: 'Create Listing', id: 'want_to_sell', icon: 'fa-plus-circle' },
                        // { label: 'My Listings', id: 'mine', icon: 'fa-line-chart' },
                        { label: 'Request Inbox', id: 'manifest_request_inbox', icon: 'fa-inbox' },
                        // { label: 'Manifest Requests Outbox', id: 'mine', icon: 'fa-line-chart' },
                    ],
                    "/traceability/market/create": [
                        { label: 'I Want To Sell', id: 'want_to_sell', icon: 'fa-bullhorn' },
                        { label: 'I Want To Buy', id: 'want_to_buy', icon: 'fa-shopping-cart' },
                    ],
                    "/traceability/location": [
                        { label: 'Traceability Users', id: 'users', icon: 'fa-users' },
                        { label: 'Rooms', id: 'rooms', icon: 'fa-object-group' },
                        { label: 'Vehicles', id: 'vehicles', icon: 'fa-car' },
                        { label: 'Drivers', id: 'employees', icon: 'fa-id-card-o' },
                    ],
                    "/traceability/location/rooms/inventory_rooms": [
                        { label: 'View Inventory Rooms', id: 'browse_inventory_rooms', icon:'fa-barcode' },
                        { label: 'Add Inventory Room', id: 'inventory_room_add', icon:'fa-plus-circle' },
                        // { label: 'Modify Inventory Room', id: 'inventory_room_modify', icon:'' },
                        { label: 'Remove Inventory Room', id: 'inventory_room_remove', icon:'fa-remove' },
                    ],
                    "/traceability/location/rooms/plant_rooms":
                    [
                        { label: 'View Plant Rooms', id: 'browse_plant_rooms', icon:'fa-pagelines' },
                        { label: 'Add Plant Room', id: 'plant_room_add', icon:'fa-plus-circle' },
                        // { label: 'Modify Plant Room', id: 'plant_room_modify', icon:'' },
                        { label: 'Remove Plant Room', id: 'plant_room_remove', icon:'fa-remove' },
                    ],
                    "/traceability/location/rooms":
                    [
                        { label: 'Plant Rooms', id: 'plant_rooms', icon:'fa-pagelines' },
                        { label: 'Inventory Rooms', id: 'inventory_rooms', icon:'fa-barcode' },
                    ],
                    "/traceability/location/vehicles": [
                        { label: 'View Vehicles', id: 'browse_vehicles', icon:'fa-car' },
                        { label: 'Add Vehicle', id: 'vehicle_add', icon:'fa-plus-circle' },
                        // { label: 'Modify Vehicle', id: 'vehicle_modify', icon:'' },
                        { label: 'Remove Vehicle', id: 'vehicle_remove', icon:'fa-remove' }
                    ],

                    "/traceability/location/employees": [
                        { label: 'View Drivers', id: 'browse_employees', icon:'fa-id-card' },
                        { label: 'Add Driver', id: 'employee_add', icon:'fa-user-plus' },
                        // { label: 'Modify Employee', id: 'employee_modify', icon:'' },
                        { label: 'Remove Driver', id: 'employee_remove', icon:'fa-user-times' }
                    ],

                    // "/traceability/samples": [
                    //     { label: 'Remove Driver', id: 'employee_remove', icon:'fa-user-times' }
                    //
                    //     // { label: 'View QA Sample Results', id: 'qa_view_sample_results'},
                    // ],
                    "/traceability/inventory":
                    [
                        { label: 'View Inventory', id: 'browse_inventory', icon: 'fa-barcode' },
                        { label: 'Create Inventory', id: 'inventory_new', icon: 'fa-plus-circle' },
                        { label: 'Move Inventory', id: 'inventory_move', icon: 'fa-object-group' },
                        { label: 'QA', id: 'qa', icon: 'fa-flask' },
                        { label: 'Convert', id: 'inventory_convert', icon: 'fa-code-fork' },
                        { label: 'Create Marketing Sample', id: 'inventory_sample', icon: 'fa-hand-peace-o' },
                        { label: 'Split Inventory', id: 'inventory_split', icon: 'fa-arrows-h' },
                        { label: 'Combine Inventory', id: 'inventory_create_lot', icon: 'fa-toggle-up' },
                        { label: 'Adjust Quantity', id: 'inventory_adjust', icon: 'fa-crop' },
                        { label: 'Schedule Destruction', id: 'inventory_destroy_schedule', icon: 'fa-calendar-times-o' },
                        { label: 'Destroy', id: 'inventory_destroy', category: 'Inventory Cleanup', icon: 'fa-trash' },
                    ],
                    //
                    "/traceability/inventory/qa":
                    [
                        { label: 'View QA Samples', id: 'browse_qa_sample', icon: 'fa-flask' },
                        { label: 'Create QA Sample', id: 'inventory_qa_sample', icon: 'fa-plus-circle' },
                        { label: 'Create Non-Mandatory QA Sample', id: 'inventory_qa_sample_non_mandatory', icon: 'fa-plus-square' },

                        { label: 'Void QA Sample', id: 'inventory_qa_sample_void', icon: 'fa-remove' },

                    ],

                    "/traceability/manifests":
                    [
                        { label: 'View Manifests', id: 'browse_manifests', icon: 'fa-telegram'},
                        { label: 'Create Manifest', id: 'inventory_manifest', icon: 'fa-plus-circle'},
                        { label: 'Modify Manifest', id: 'modify_manifest', icon: 'fa-edit' },
                        { label: 'Cancel Manifest', id: 'inventory_manifest_void', icon:'fa-remove'},

                    ],
                    "/traceability/manifests/modify_manifest":
                    [
                        { label: 'Change Driver', id: 'inventory_manifest_modify', icon: 'fa-car' },

                        // { label: 'Manifest Inventory', id: 'inventory_manifest', icon: 'fa-barcode'},
                        // { label: 'Manifest QA Sample', id: 'inventory_manifest', icon: 'fa-flask'},
                        // { label: 'Manifest Marketing Sample', id: 'inventory_manifest', icon: 'fa-hand-peace-o'},
                        { label: 'Remove Items', id: 'inventory_manifest_void_items', icon:'fa-remove'},

                    ],
                    "/traceability/transfers/outbound":
                    [
                        { label: 'View Outbound Transfers', id: 'browse_outbound_transfers', icon: 'fa-envelope' },
                        { label: 'New Outbound Transfer',   id: 'inventory_transfer_outbound', icon: 'fa-plus-circle' },
                        { label: 'Void Outbound Transfer',  id: 'inventory_transfer_outbound_void', icon: 'fa-remove' },
                        { label: 'Return Outbound Transfer',id: 'inventory_transfer_outbound_return', icon: 'fa-undo' },
                    ],
                    "/traceability/transfers/inbound":
                    [
                        { label: 'View Inbound Transfers',  id: 'transfers_view_inbound', icon: 'fa-cart-arrow-down' },
                        { label: 'New Inbound Transfer',    id: 'inventory_transfer_inbound', icon: 'fa-plus-circle' },
                        { label: 'Modify Inbound Transfer', id: 'inventory_transfer_inbound_modify', icon:'fa-pencil-square-o' },
                    ],

                    "/traceability/transfers":
                    [
                        { label: 'Outbound', id: 'outbound', icon: 'fa-envelope'},
                        { label: 'Inbound', id: 'inbound', icon: 'fa-cart-arrow-down'},

                    ],

                    "/traceability/plants":
                    // machine-learning opportunity here. have a stored order
                    // variable that changes the rank of nav boxes per click
                    // so that over time, the most clicked box is on top for a user
                    [
                        { label: 'View Plants', id: 'browse_plants', icon: 'fa-pagelines' },
                        { label: 'Create a New Plant', id: 'plant_new', icon: 'fa-plus-circle'},
                        { label: 'Move Plants', id: 'plant_move', icon: 'fa-object-group' },
                        { label: 'Schedule Harvest', id: 'plant_harvest_schedule', icon: 'fa-calendar-check-o' },
                        { label: 'Harvest', id: 'plant_harvest',  icon: 'fa-scissors' },
                        { label: 'Cure', id: 'plant_cure', icon: 'fa-cloud-upload' },
                        // { label: 'Create Lot', id: 'inventory_create_lot', icon: 'fa-shopping-basket' },
                        { label: 'Schedule Destruction', id: 'plant_destroy_schedule', icon: 'fa-calendar-times-o' },
                        { label: 'Destroy', id: 'plant_destroy', icon: 'fa-trash' },
                        { label: 'Convert to Inventory', id: 'plant_convert_to_inventory', icon: 'fa-clone' },
                        // { label: 'Modify Plant Yield', id: 'plant_yield_modify', icon: 'fa-asterisk' },
                        // { label: 'Modify Plant', id: 'plant_modify', icon: 'fa-balance-scale' },
                    ],
                }
            },
            getActionsForViewDatagory: function (datagory) {
                if(datagory === 'inventory') {
                    return [
                        { label: 'Move Inventory', id: 'inventory_move', icon: 'fa-object-group' },

                    ]
                }
            },
            getIconAndLabel: function(pathpart){
                // console.log(this.paths());
                var paths = this.paths()
                // console.log(paths);
                //console.log(pathpart);
                var icon_map = {}
                _.map(paths, function(options){
                    // console.log(options);
                    _.map(options, function(option){
                        // console.log(option.id);
                        // console.log(option.img);
                        if (!!option.icon) icon_map[option.id] = {label:option.label,icon:option.icon}
                        if (!!option.img) icon_map[option.id] = {label:option.label,img:option.img}

                    });
                });

                return icon_map[pathpart]

            },
        };
    };
})();
