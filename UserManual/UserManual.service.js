angular.module('countryApp')
.factory('UserManualService', UserManualService)

function UserManualService(pnLcbFunctionExplainer, TraceabilityMenuService, FormDataService) {
    _m = [
        {
            title: 'User Access',
            tasks: [
                {
                    label: 'Add a New Traceability User',
                    id: 'user_add',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s_location.png',
                            text: 'To add a new traceability user, starting from the home screen, select My Location'
                        },
                        {
                            // image: 'img/usermanual/location/s.users.png',
                            text: 'Next, select Traceability Users'
                        },
                        {
                            // image: 'img/usermanual/location/users/s_new_user.png',
                            text: 'Next, select Add User'
                        },
                        // {
                        //     // image: 'img/usermanual/location/users/add_user.png',
                        //     text: '.'
                        // },
                        completeButtonDescription('Add User')
                    ]
                },
                {
                    label: 'Remove an Existing User',
                    id: 'user_remove',
                    paragraphs: [
                        {
                            //image: 'img/usermanual/dashboard/s_location.png',
                            text: 'To remove an existing traceability user, starting from the home screen, select My Location'
                        },
                        {
                            //image: 'img/usermanual/location/s.users.png',
                            text: 'Next, select Traceability Users'
                        },
                        {
                        //    image: 'img/usermanual/location/users/s_remove_user.png',
                            text: 'Next, select Remove User'
                        },
                        // {
                        // //    image: 'img/usermanual/location/users/remove_user.png',
                        //     text: ''
                        // },
                        completeButtonDescription('Remove User')

                    ]
                }
            ]
        },
        {
            title: 'Drivers (Employees)',
            tasks: [
                {
                    label: 'Regulations',
                    id: 'driver_regulations',
                    paragraphs: [
                        {
                            image: 0,
                            text: 'WAC 314-55-081 (2) All applicants	and	employees	working	in	each	licensed	establishment	must	be	at least twenty-one	years	of	age.'
                        },
                        {
                            image: 0,
                            text: 'WAC	314-55-083 (6)	(f)	Producers	may	sample	one	gram	of	useable	marijuana	per	strain,	per	month	for quality	sampling.	Sampling	for	quality	may	not	take	place	at	a	licensed	premises.	Only	the producer	or	employees	of	the	licensee	may	sample	the	useable	marijuana	for	quality.	The producer	must	record	the	amount	of	each	sample	and	the	employee(s)	conducting	the sampling	in	the	traceability	system.'
                        },
                        {
                            image: 0,
                            text: 'WAC	314-55-085 (1)	Notification	of	shipment.	Upon	transporting	any	marijuana	or	marijuana	product,	a producer,	processor	or	retailer	shall	notify	the	board	of	the	type	and	amount	and/or	weight of	marijuana	and/or	marijuana	products	being	transported,	the	name	of	transporter,	times of	departure	and	expected	delivery.	This	information	must	be	reported	in	the	traceability system	described	in	WAC	314-55-083(4).'
                        },
                        {
                            image: 0,
                            text: '(5)	(a)	Only the	marijuana	licensee	or	an	employee	of	the	licensee	may	transport	product;'
                        },

                    ]
                },
                {
                    label: 'Add a New Driver',
                    id: 'employee_add',
                    paragraphs: [
                        {
                        //    image: 'img/usermanual/dashboard/s_location.png',
                            text: 'Starting from the home screen, select My Location.'
                        },
                        {
                        //    image: 'img/usermanual/location/s.drivers.png',
                            text: 'Select Drivers.'
                        },
                        {
                        //    image: 'img/usermanual/location/drivers/s.add.driver.png',
                            text: 'Select Add Driver.'
                        },
                        // {
                        // //    image: 'img/usermanual/location/drivers/add.driver.png',
                        //     text: 'Type the name of the Driver. Next, enter the driver\'s license number. Next, enter the hire date of the driver was hired. Next, enter the birth date of the driver.'
                        // },
                        completeButtonDescription('Add Driver')

                    ]
                },
                {
                    label: 'View Drivers',
                    id: 'browse_employees',
                    paragraphs: [
                        {
                        //    image: 'img/usermanual/dashboard/s_location.png',
                            text: 'Starting from the home screen, select My Location'
                        },
                        {
                            // image: 'img/usermanual/location/s.drivers.png',
                            text: 'Select Drivers'
                        },
                        {
                            // image: 'img/usermanual/location/drivers/s.view.driver.png',
                            text: 'Select View Drivers'
                        },
                    ]
                },
                {
                    label: 'Remove an Existing Driver',
                    id: 'employee_remove',
                    paragraphs: [
                        {
                        //    image: 'img/usermanual/dashboard/s_location.png',
                            text: 'Starting from the home screen, select My Location'
                        },
                        {
                        //    image: 'img/usermanual/location/s.drivers.png',
                            text: 'Select Drivers'
                        },
                        {
                        //    image: 'img/usermanual/location/drivers/s.remove.driver.png',
                            text: 'Select Remove Driver'
                        },
                        // formFieldDescriptions('employee_remove'),
                        // {
                        // //    image: 'img/usermanual/location/drivers/remove.driver.png',
                        //     text: 'Select the driver to remove. '
                        // },
                        completeButtonDescription('Remove Driver')

                    ]
                },

            ]
        },
        {
            title: 'Vehicles',
            tasks: [
                // {
                //     label: 'Accessing the Vehicle Screen',
                //     id: 'employee_add'
                // },
                {
                    label: 'Add a New Vehicle',
                    id: 'vehicle_add',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s_location.png',
                            text: 'Starting from the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/location/s.vehicles.png',
                            text: 'Select Vehicles.'
                        },
                        {
                            // image: 'img/usermanual/location/vehicles/s.add.vehicle.png',
                            text: 'Select Add Vehicle.'
                        },
                        // {
                        //     // image: 'img/usermanual/location/vehicles/add.vehicle.png',
                        //     text: 'Enter the color, make, model, license plate, Vehicle Identification Number (VIN), year, and vehicle nickname. '
                        // },
                        completeButtonDescription('Add Vehicle')
                    ]
                },
                {
                    label: 'View Vehicles',
                    id: 'browse_vehicles',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s_location.png',
                            text: 'Starting from the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/location/s.vehicles.png',
                            text: 'Select Vehicles.'
                        },
                        {
                            // image: 'img/usermanual/location/vehicles/s.view.vehicle.png',
                            text: 'Select View Vehicles.'
                        }
                    ]
                },
                {
                    label: 'Remove an Existing Vehicle',
                    id: 'vehicle_remove',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s_location.png',
                            text: 'Starting from the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/location/s.vehicles.png',
                            text: 'Select Vehicles.'
                        },
                        {
                            // image: 'img/usermanual/location/vehicles/s.remove.vehicle.png',
                            text: 'Select Remove Vehicle.'
                        },
                        // {
                        //     // image: 'img/usermanual/location/vehicles/remove.vehicle.png',
                        //     text: 'Select the vehicle to remove from the list.'
                        // },
                        completeButtonDescription('Remove Vehicle')

                    ]
                },

            ]
        },
        // {
        //     title: 'Vendors',
        //     tasks: [
        //
        //         {
        //             label: 'Add a Favorite Vendor',
        //             id: 'favorite_vendor_add',
        //             paragraphs: [
        //                 {
        //                     // image: 'img/usermanual/dashboard/s.vendors.png',
        //                     text: 'Starting from the home screen, select Favorite Vendors'
        //                 },
        //                 {
        //                     // image: 'img/usermanual/location/s.add.vendors.png',
        //                     text: 'Select Add Favorite Vendors'
        //                 },
        //                 {
        //                     // image: 'img/usermanual/location/s.add.vendors.png',
        //                     text: 'Select the vendors you wish to favorite from the list. To see the full list of vendors, click the Show All button in the bottom left of the list. Alternatively, you can search for vendors using the search button in the top left of the list. '
        //                 },
        //                 completeButtonDescription('Add Favorite Vendors')
        //
        //             ]
        //         },
        //         {
        //             label: 'View Favorite Vendors List',
        //             id: 'view_favorite_vendors',
        //             paragraphs: [
        //                 {
        //                     // image: 'img/usermanual/dashboard/s.vendors.png',
        //                     text: 'Starting from the home screen, select Favorite Vendors'
        //                 },
        //                 {
        //                     // image: 'img/usermanual/location/s.view.vendors.png',
        //                     text: 'Select View Favorite Vendors'
        //                 },
        //             ]
        //         },
        //         {
        //             label: 'Remove a Favorite Vendor',
        //             id: 'favorite_vendor_remove',
        //             paragraphs: [
        //                 {
        //                     // image: 'img/usermanual/dashboard/s.vendors.png',
        //                     text: 'Starting from the home screen, select Favorite Vendors'
        //                 },
        //                 {
        //                     // image: 'img/usermanual/location/s.remove.vendors.png',
        //                     text: 'Select Remove Favorite Vendors'
        //                 },
        //                 {
        //                     // image: 'img/usermanual/location/s.remove.vendors.png',
        //                     text: 'Select the vendors you wish to unfavorite from the list. To see the full list of vendors, click the Show All button in the bottom left of the list. Alternatively, you can search for vendors using the search button in the top left of the list.'
        //                 },
        //                 completeButtonDescription('Remove Favorite Vendors')
        //
        //
        //             ]
        //         },
        //     ]
        // },
        {
            title: 'Traceability Logic: Rooms, Inventory, and Plants',
            tasks: [
                {
                    label: 'About Rooms, Inventory, and Plants',
                    id: 'about_rooms_inventory_plants',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Within	the	Traceability	System,	rooms	represent	a	way	to	logically	segregate	inventory. This	allows	for	a	representation	not	only	of	the	overall	on-hand	amount	of	a	specific	item	at	 the	Licensee	location,	but	also	the	amount	within	a	specific	area	of	the	facility.		'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Plant	rooms contain	plants	that	are	in	production, while inventory	rooms contain all	other	inventory	types,	including mature	plants	that	are	not	in	production because	they	were	either	 recently	purchased	and	have	yet	to	be	planted	or	they	are	ready	for	sale	to	another	Producer.'
                        },
                    ]
                },
            ]
        },
        {
            title: 'Plant Rooms',
            tasks: [

                {
                    label: 'Add a Plant Room',
                    id: 'plant_room_add',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'From the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Rooms.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Add Plant Room.'
                        },
                        // {
                        //     // image: 'img/usermanual/dashboard/s.vendors.png',
                        //     text: 'Enter the name of the new room to be added to the traceability system. Next, select the licensed premesis in which this room will be created. '
                        // },
                        completeButtonDescription('Add Plant Room')

                    ]
                },
                {
                    label: 'View Plant Rooms',
                    id: 'browse_plant_rooms',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'From the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Rooms.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select View Plant Rooms.'
                        },

                    ]
                },
                {
                    label: 'Remove a Plant Room',
                    id: 'plant_room_remove',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'From the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Rooms.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Remove Plant Room.'
                        },
                        // {
                        //     // image: 'img/usermanual/dashboard/s.vendors.png',
                        //     text: 'Select the Plant Room to be removed.'
                        // },
                        completeButtonDescription('Remove Plant Room')

                    ]
                },
            ]
        },
        {
            title: 'Inventory Rooms',
            tasks: [

                {
                    label: 'Add Inventory Room',
                    id: 'inventory_room_add',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'From the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Rooms.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Add Inventory Room.'
                        },
                        // {
                        //     // image: 'img/usermanual/dashboard/s.vendors.png',
                        //     text: 'Enter the name of the new room to be added to the traceability system. Next, select the licensed premesis in which this room will be created.'
                        // },
                        completeButtonDescription('Add Inventory Room')

                    ]
                },
                {
                    label: 'View Inventory Rooms',
                    id: 'browse_inventory_rooms',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'From the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Rooms.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select View Inventory Rooms.'
                        },

                    ]
                },
                {
                    label: 'Remove Inventory Room',
                    id: 'inventory_room_remove',
                    paragraphs: [
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'From the home screen, select My Location.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Rooms.'
                        },
                        {
                            // image: 'img/usermanual/dashboard/s.vendors.png',
                            text: 'Next, select Remove Plant Room.'
                        },
                        // {
                        //     // image: 'img/usermanual/dashboard/s.vendors.png',
                        //     text: 'Select the Plant Room to be removed.'
                        // },
                        completeButtonDescription('Remove Inventory Room')

                    ]
                },

            ]
        },
        {
            title: 'Start Up Inventory (15 Day Window)',
            tasks: [
                {
                    label: 'Regulations',
                    id: 'start_up_inventory_regulations',
                    paragraphs: [
                        {
                            text: 'WAC	314-55-083	(5)	Start-up	Inventory	for	marijuana	producers.		Within	fifteen	days	of	starting	production	operations	a	producer	must	have	all	nonflowering	marijuana	plants	physically	on	the	licensed	premises.	The	producer	must	immediately	record	each	marijuana	plant	that	enters	the	facility	in	the	traceability	system	during	this	fifteen	day	time	frame.	No	flowering	marijuana	plants	may	be	brought	into	the	facility	during	this	fifteen	day	time	frame.	After	this	fifteen	day	time	frame	expires,	a	producer	may	only	start	plants	from	seed	or	create	clones	from	a	marijuana	plant	located	physically	on	their	licensed	premises,	or	purchase	marijuana	seeds,	clones,	or	plants	from	another	licensed	producer.'
                        }
                    ]
                },
                {
                    label: 'Recording 15 Day Startup Inventory',
                    id: 'inventory_new',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Select Create Inventory.'
                        },
                        // {
                        //     text: 'Select the type of inventory being created.'
                        // },
                        // {
                        //     text: 'The source field may be left blank if you are within the 15 day startup period.'
                        // },
                        // {
                        //     text: 'Enter the quantity of the new inventory item being created.'
                        // },
                        // {
                        //     text: 'Select the licensed location in which this new inventory will be created.'
                        // },
                        // {
                        //     text: 'When complete, click the Create Inventory button at the bottom of the page.'
                        // },
                    ]
                },
                {
                    label: 'Adding Plants to Cultivation',
                    id: 'plant_new',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Plants.'
                        },
                        {
                            text: 'Select Create a New Plant.'
                        },
                        // {
                        //     text: 'Select the inventory source of the new plant being added to Cultivation.'
                        // },
                        // {
                        //     text: 'Enter the strain of the new plant.'
                        // },
                        // {
                        //     text: 'Select the destination plant room.'
                        // },
                        // {
                        //     text: 'Enter the quantity of the new plant being added the cultivation.'
                        // },
                        // {
                        //     text: 'Enter the number of plants being created. You may create up to 1,000 plants at a time.'
                        // },
                        // {
                        //     text: 'Select This will be a mother plant if plant(s) will be used as a source for new plants in the future.'
                        // },
                        completeButtonDescription('Create a New Plant')

                    ]
                },
            ]
        },
        {
            title: 'Labels',
            tasks: [

                {
                    label: 'Label Templates and Page Templates',
                    id: '',
                    paragraphs: [
                        {
                            text: 'Label Templates represent the layout of text on a given label.'
                        },
                        {
                            text: 'Page Templates represent the layout of labels on a page.'
                        },

                    ]
                },
                {
                    label: 'Generate Labels',
                    id: 'generate_labels',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Generate Labels.'
                        },
                        completeButtonDescription('Download')
                    ]
                },
                {
                    label: 'Create a Label Template',
                    id: 'label_add',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Label Templates.'
                        },
                        {
                            text: 'Select Create Label Template.'
                        },
                        completeButtonDescription('Create Label Template')
                    ]
                },
                {
                    label: 'Modify a Label Template',
                    id: 'label_modify',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Label Templates.'
                        },
                        {
                            text: 'Select Modify Label Template.'
                        },
                        completeButtonDescription('Modify Label Template')
                    ]
                },
                {
                    label: 'Remove a Label Template',
                    id: 'label_add',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Label Templates.'
                        },
                        {
                            text: 'Select Remove Label Template.'
                        },
                        completeButtonDescription('Create Remove Template')
                    ]
                },
                {
                    label: 'View Page Templates',
                    id: 'page_templates_view',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Page Templates.'
                        },
                        {
                            text: 'Select View Page Template.'
                        },
                    ]
                },
                {
                    label: 'Create a Page Template',
                    id: 'page_templates_add',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Page Templates.'
                        },
                        {
                            text: 'Select Create Page Template.'
                        },
                        completeButtonDescription('Create Page Template')
                    ]
                },
                {
                    label: 'Modify a Page Template',
                    id: 'page_templates_modify',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Page Templates.'
                        },
                        {
                            text: 'Select Create Page Template.'
                        },
                        completeButtonDescription('Modify Page Template')
                    ]
                },
                {
                    label: 'Remove a Page Template',
                    id: 'page_templates_remove',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Labels.'
                        },
                        {
                            text: 'Select Page Templates.'
                        },
                        {
                            text: 'Select Remove Page Template.'
                        },
                        completeButtonDescription('Remove Page Template')
                    ]
                },
            ],
        },
        {
            title: 'Plant Basics',
            tasks: [
                {
                    label: 'Create a New Plant',
                    id: 'plant_new',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Plants.'
                        },
                        {
                            text: 'Select Create a New Plant.'
                        },
                        // {
                        //     text: 'Select the inventory source of the new plant being added to Cultivation.'
                        // },
                        // {
                        //     text: 'Enter the strain of the new plant.'
                        // },
                        // {
                        //     text: 'Select the destination plant room.'
                        // },
                        // {
                        //     text: 'Enter the quantity of the new plant being added the cultivation.'
                        // },
                        // {
                        //     text: 'Enter the number of plants being created. You may create up to 1,000 plants at a time.'
                        // },
                        // {
                        //     text: 'Select This will be a mother plant if plant(s) will be used as a source for new plants in the future.'
                        // },
                        completeButtonDescription('Create a New Plant')

                    ]
                },
                {
                    label: 'View Plants',
                    id: 'browse_plants',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Plants.'
                        },
                        {
                            text: 'Select View Plants.'
                        },
                    ]
                },
                {
                    label: 'Moving Plants',
                    id: 'plant_move',
                    paragraphs: [
                        {
                            text: 'From the home scree, select Plants.'
                        },
                        {
                            text: 'Select Move Plants.'
                        },
                        completeButtonDescription('Move Plants')

                    ]
                },
                {
                    label: 'Plant Transfer From Cultivation To Inventory',
                    id: 'plant_convert_to_inventory',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Plants.'
                        },
                        {
                            text: 'Select Convert to Inventory.'
                        },
                        completeButtonDescription('Convert to Inventory')

                    ]
                },
            ]
        },
        {
            title: 'Plant Harvesting and Curing',
            tasks: [
                {
                    label: 'Schedule Plant Harvest',
                    id: 'plant_harvest_schedule',
                    paragraphs: [
                        {text: 'From the home screen, select Plants.' },
                        {text: 'Select Schedule Harvest.' },
                        // {text: 'From the list of plants, select the plants to be harvested.' },
                        completeButtonDescription('Schedule Harvest'),

                    ]
                },
                {
                    label: 'Plant Harvest',
                    id: 'plant_harvest',
                    paragraphs:[
                        {text: 'From the home screen, select Plants.' },
                        {text: 'Select Harvest.' },
                        // {text: 'From the list of plants, select the plants to be harvested.' },
                        completeButtonDescription('Harvest'),
                    ]
                },
                {
                    label: 'Plant Cure',
                    id: 'plant_cure',
                    paragraphs:[
                        {text: 'From the home screen, select Plants.' },
                        {text: 'Select Cure.' },
                        {text: 'Select the plants to be cured from the list.' },
                        {text: 'Select the destination room for the plants.' },
                        {text: 'Enter the dry weight of the harvested and cured flower in grams.' },
                        {text: 'Enter the dry weight of the waste in grams.' },
                        {text: 'Enter the dry weight of any Other Plant Material in grams.' },
                        {text: 'Indicate whether this is the final time this plant will be harvested.' },

                        completeButtonDescription('Cure'),
                        {text: 'Once	the	dry weights	have	been	submitted,	the	Traceability	System	will	automatically	account	for	each	of	the	three	components	(Flower,	Other	Material,	and	Waste)	as	separate	inventory	items,	generate	new	Traceability	Identifiers	for	each,	and	move	the	items	to	Inventory.' },


                    ]
                },
                {
                    label: 'Inventory Items Resulting From Harvesting and Curing',
                    id: 'inventory_items_resulting_from_harvesting_and_curing',
                    paragraphs: [
                        // {text: ''},
                        {text: 'Other	Material:	Non-flower	material	collected	during	the	harvest process. Entered	as	a	wet	weight.'},
                        {text: 'Waste: Waste	material	collected	during	the	harvest	process.		Entered	as	a	wet	weight.		'},
                        {text: 'Other Material: Additional	non-flower	material	collected	during	the	curing process,	if	applicable.		Entered	as	a	dry	weight.'},
                        {text: 'Waste: Additional	waste	material	collected	during	the	curing process,	if	applicable.'},
                        {text: 'Flower:	Entered	as	a	dry	weight.'},

                    ]
                },
            ]
        },
        {
            title: 'Producer Inventory Basics',
            tasks: [
                {
                    label: 'Regulations',
                    id: 'producer_inventory_regulations',
                    paragraphs: [
                        {
                            text: 'WAC 314-55-010 (10)	“Lot”	means	either	of	the	following: (a)	The	flowers	from	one	or	more	marijuana	plants	of	the	same	strain.	A	single	lot	of	 flowers	cannot	weigh	more	than	five	pounds;	or (b)	The	trim,	leaves,	or	other	plant	matter	from	one	or	more	marijuana	plants.	A	single	lot	 of	trim,	leaves,	or	other	plant	matter	cannot	weigh	more	than	fifteen	pounds.'
                        }

                    ]
                },
                {
                    label: 'View Inventory',
                    id:'browse_inventory',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Select View Inventory.'
                        },
                    ]
                },
                {
                    label: 'Combine Inventory',
                    id: 'inventory_create_lot',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Select Create Inventory.'
                        },
                    ]
                },
                {
                    label: 'Split Inventory (Create Sub Lot)',
                    id: 'inventory_split'
                },
                {
                    label: 'Move Inventory',
                    id: 'inventory_move'
                },
            ]
        },
        {
            title: 'Processor Basics',
            tasks: [
                {
                    label: 'Convert Inventory',
                    id: 'inventory_convert',
                    paragraphs: [
                        {text: 'From the home screen, select Inventory.'},
                        {text: 'Select Convert.'},
                        // // {id: 'derivative_type', text: 'Select the type of new product.'},
                        // {id: 'derivative_product', text: 'Enter a name for the new product.'},
                        // {id: 'derivative_strain', text: 'Enter the strain of the new product.'},
                        // {id: 'derivative_quantity', text: 'Enter the quantity of the new product.'},
                        // {id: 'uom',text: 'Select the quantity units of the new product.'},
                        // {id: 'inventory_convert_source', text: 'Select the inventory item source of the new product.'},
                        // {id: 'multiple_remove_quantity',text: 'Enter the weight of lot material that went into the conversion process.'},
                        // {id: 'inventory_convert_waste', text: 'Enter the weight of waste material produced during conversion.'},
                        completeButtonDescription('Inventory Convert'),
                    ]
                },
            ]
        },
        {
            title: 'Lab Testing',
            tasks: [
                {
                    label: 'Regulations',
                    id: 'lab_testing_regulations',
                    paragraphs: [
                        {
                            text: 'WAC 314-55-083 The following information is required and must be kept completely up-to-date in a system specified by the board: (o) All samples sent to an independent testing lab and the quality assurance test results;'
                        },
                        {
                            text: 'WAC 314-55-102 (11) No lot of usable flower or batch of marijuana-infused products may be sold or transported until the completion of all required quality assurance testing. (12) Any usable marijuana or marijuana-infused product that passed the required quality assurance tests may be labeled as “Class A.” Only “Class A” usable marijuana or marijuana- infused product will allowed to be sold.'
                        },
                    ]
                },
                {
                    label: 'Create QA Sample',
                    id: 'inventory_qa_sample',
                    paragraphs: [
                        {
                            text: 'From the home screen, select  Inventory.'
                        },
                        {
                            text: 'Next, select QA.'
                        },
                        {
                            text: 'Next, select Create QA Sample.'
                        },
                        completeButtonDescription('Create QA Sample'),
                    ]

                },
                {
                    label: 'Create QA Sample',
                    id: 'inventory_qa_sample_non_mandatory',
                    paragraphs: [
                        {
                            text: 'From the home screen, select  Inventory.'
                        },
                        {
                            text: 'Next, select QA.'
                        },
                        {
                            text: 'Next, select Create QA Sample.'
                        },
                        completeButtonDescription('Create QA Sample'),
                    ]

                },
                {
                    label: 'View QA Samples',
                    id: 'browse_qa_sample',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Next, select QA.'
                        },
                        {
                            text: 'Next, select View QA Samples.'
                        },

                    ]
                },
                // todo: is this real!?
                // {
                //     label: 'Manually Add Results',
                //     id: 'manuall_add_results'
                // },

                {
                    label: 'Void a Sample',
                    id: 'inventory_qa_sample_void',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Next, select QA.'
                        },
                        {
                            text: 'Next, select Void QA Sample.'
                        },
                        completeButtonDescription('Void QA Sample'),
                    ]
                },
            ]
        },
        {
            title: 'Transportation Manifest',
            tasks: [
                {
                    label: 'Regulations',
                    id: 'manifest_regulations',
                    paragraphs: [
                        {text: 'WAC 314-55-083 (3) (f) All marijuana or marijuana-infused products that are intended to be removed or transported from marijuana producer to marijuana processor and/or marijuana processor to marijuana retailer shall be staged in an area known as the "quarantine" location for a minimum of twenty-four hours. Transport manifest with product information and weights must be affixed to the product. At no time during the quarantine period can the product be handled or moved under any circumstances and is subject to auditing by the liquor control board or designees. (4) (g) There is a twenty-four hour mandatory waiting period after the notification described in this subsection to allow for inspection before a lot of marijuana is transported from a producer to a processor.'},
                        {text: 'WAC 314-55-085 (3) Transportation manifest. A complete transport manifest containing all information required by the board must be kept with the product at all times.' }
                    ]
                },
                {
                    label: 'Create A Transportation Manifest',
                    id: 'inventory_manifest',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Manifests.'
                        },
                        {
                            text: 'Select Create Manifest.'
                        },
                        completeButtonDescription('Create Manifest'),

                    ]
                },
                // {
                //     label: 'Multi-Stop Transportation Manifest',
                //     id: 'multi_stop_manifest'
                // },
                {
                    label: 'View Manifests',
                    id: 'browse_manifests',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Manifests.'
                        },
                        {
                            text: 'Select View Manifests.'
                        },

                    ]
                },
                {
                    label: 'Void Manifest',
                    id: 'inventory_manifest_void',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Manifests.'
                        },
                        {
                            text: 'Select Void Manifest.'
                        },
                        completeButtonDescription('Void Manifest'),

                    ]
                },
            ]
        },
        {
            title: 'Wholesale Inventory Transfers',
            tasks: [

                {
                    label: 'Inbound Shipment',
                    id: 'inventory_transfer_inbound',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Transfers.'
                        },
                        {
                            text: 'Select Inbound.'
                        },
                        {
                            text: 'Select New Inbound Transfer.'
                        },
                        completeButtonDescription('Select New Inbound Transfer.'),
                    ]
                },
                {
                    label: 'Outbound Shipment',
                    id: 'inventory_transfer_outbound',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Transfers.'
                        },
                        {
                            text: 'Select Outbound.'
                        },
                        {
                            text: 'Select New Outbound Transfer.'
                        },
                        completeButtonDescription('New Outbound Transfer'),
                    ]
                },
            ]
        },
        {
            title: 'Waste and Destruction Events',
            tasks: [
                {
                    label: 'Regulations',
                    id: 'waste_regulations',
                    paragraphs: [
                        {
                            text: 'WAC 314-55-083 (4) (f) There is a seventy-two hour mandatory waiting period after the notification described in this subsection is given before any plant may be destroyed or a lot or batch of marijuana or marijuana-infused product may be destroyed.'
                        }
                    ]
                },
                // {
                //     label: 'Collecting General Plant Waste',
                //     id: 'inventory_waste'
                // },
                {
                    label: 'Schedule Plant Destruction',
                    id: 'plant_destroy_schedule',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Plants.'
                        },
                        {
                            text: 'Select Schedule Destruction.'
                        },
                    ]
                },
                {
                    label: 'Destroy Plant',
                    id: 'plant_destroy',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Plants.'
                        },
                        {
                            text: 'Select Destroy.'
                        },
                        completeButtonDescription('Destroy Plant'),
                    ]
                },
                {
                    label: 'Schedule Inventory Destruction',
                    id: 'inventory_destroy_schedule',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Select Schedule Destruction.'
                        },
                        completeButtonDescription('Schedule Destruction'),
                    ]
                },
                {
                    label: 'Destroy Inventory',
                    id: 'inventory_destroy',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Select Destroy.'
                        },
                        completeButtonDescription('Destroy Inventory'),
                    ]
                },
            ]
        },
        // {
        //     title: 'Samples',
        //     tasks: [
        //         {
        //             label: 'Regulations',
        //             id: 'sample_regulations'
        //         },
        //         {
        //             label: 'Account for Free Sample',
        //             id: 'account_for_free_sample'
        //         },
        //     ]
        // },
        {
            title: 'Inventory Adjustments',
            tasks: [
                // {
                //     label: 'Types of Inventory Adjustments',
                //     id: 'types_of_inventory_adjustments'
                // },
                // {
                //     label: 'Access the Inventory Adjustment Screen',
                //     id: 'access_inevntory_adjustment_screen'
                // },
                {
                    label: 'Adjust Inventory',
                    id: 'inventory_adjust',
                    paragraphs: [
                        {
                            text: 'From the home screen, select Inventory.'
                        },
                        {
                            text: 'Select Adjust Quantity.'
                        },
                        completeButtonDescription('Adjust Quantity'),

                    ]
                },
                // {
                //     label: 'Instruction Specific to Seizure by Federal, State, Local, or Tribal Law Enforcement',
                //     id: 'adjust_laws'
                // },
            ]
        },
        // {
        //     title: 'Tax Obligation Report',
        //     tasks: [
        //         {
        //             label: 'Regulations',
        //             id: ''
        //         },
        //         {
        //             label: '',
        //             id: ''
        //         },
        //         {
        //             label: '',
        //             id: ''
        //         },
        //         {
        //             label: '',
        //             id: ''
        //         },
        //     ]
        // },
    ]

    _.map(_m, function(chapter){

        _.map(chapter.tasks, function(task){
            var formFieldDescriptions = []
            if(FormDataService.i[task.id]) {
                // console.log(FormDataService.i[task.id]);
                var formFields = FormDataService.i[task.id]()
                _.map(formFields, function (field) {
                    if(field.templateOptions) {
                        formFieldDescriptions.push({id: field.key, text: field.templateOptions.label})
                    }
                })
                // console.log(formFieldDescriptions);
                if(task.paragraphs) {
                    var complete = []

                    // _.map(task.paragraphs, function (p, i) {
                    //     // console.log(p);
                    //     // console.log(p.id);
                    //     // if(!p.id) return
                    //     if (p.id && p.id.startsWith('complete_')) {
                    //         complete.push({text: p.text})
                    //         task.paragraphs = task.paragraphs.splice(i, 0)
                    //     }
                    // })
                    complete = _.filter(task.paragraphs, function (p) {
                        if (!p.id) return false
                        return p.id.startsWith('complete')
                    })
                    task.paragraphs = _.reject(task.paragraphs, function (p) {
                        if (!p.id) return false

                        return p.id.startsWith('complete')
                    })
                    console.log(task.paragraphs);
                    task.steps = task.paragraphs.concat(formFieldDescriptions).concat(complete)

                } else {
                    task.steps = formFieldDescriptions
                }

                    // console.log(task.steps);
                    // console.log(task.paragraphs);
                // }

            } else {
                if(task.paragraphs) {
                    task.steps = task.paragraphs
                }

            }

            // task.show = true
            var desc = pnLcbFunctionExplainer[task.id]
            // console.log(desc);
            if (desc) {
                task.desc = desc
            }
            var labelAndIcon = TraceabilityMenuService.getIconAndLabel(task.id)
            if (labelAndIcon) task.icon = labelAndIcon.icon

        })

    })

    function completeButtonDescription(buttonType) {
        return { text: 'Click the ' + buttonType + ' button at the bottom of the page.', id: 'complete_'+buttonType}
    }

    return function () {
        return _m
    }
}
