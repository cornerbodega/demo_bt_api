angular.module('countryApp')
.factory('pnCols', pnCols)
.factory('pnShowCols', pnShowCols)
function pnCols(){
    return function(id) {
        var actionButtonClass = 'md-raised pnGreenDarken3 white-text'
        var cols = {
            'inventory_transfer_outbound_return': [
                {id: 'barcode_id', label: 'Barcode ID'},
                {id: 'manifest_id', label: 'Manifest ID'},
                {id: 'received', label: 'Received'},
                {id: 'license_number', label: 'License Number'},
                {id: 'price', label: 'Price'},
                {id: 'return_quantity', label: 'Return Quantity'},
                {id: 'return_available', label: 'Return Available'},
                {id: 'strain', label: 'Strain'},
                {id: 'trade_name', label: 'Trade Name'},
                {id: 'transfer_date', label: 'Transfer Date'},
                {id: 'description', label: 'Description'},
                {id: 'type', label: 'Type'},
            ],
            'inventory':  [
                {id: 'id', label: 'ID'},

                {id: 'period', label: 'Period', detail: true},
                {id: 'sessiontime', label: 'Session Time', detail: true},
                {id: 'sessiontimeLabel', label: 'Created', detail: true},
                {id: 'roomLabel', label: 'Room'},

                // {id: 'barcodeImage', label: 'Barcode',image: true, barcode: true},
                {id: 'strain', label: 'Strain'},
                {id: 'inventorytypelabel', label: 'Type'},
                {id: 'pnQuantitiyLabel', label: 'Quantity', quantityLabel: true},
                // {id: 'manifestedToName', label: 'To' },
                {id: 'manifestedToNameLicense', label: 'To' },
                {id: 'manifestid', label: 'Manifested ID' },
                // {id: 'pnInventoryQuantity', label: 'Quantity', pnInventoryQuantity: true},
                {id: 'totalCannabinoids', label: 'Total Cannabinoids%', detail: true},
                {id: 'totalThc', label: 'Total THC%'},
                {id: 'thc', label: 'THC%', detail: true},
                {id: 'thca', label: 'THCA%', detail: true},
                {id: 'thca', label: 'THCA%', detail: true},
                {id: 'cbd', label: 'CBD%'},
                {id: 'aerobic_bacteria', label: 'Aerobic Bacteria', detail: true},
                {id: 'bile_tolerant', label: 'Bile Tolerant', detail: true},
                {id: 'coliforms', label: 'Coliforms',  detail: true},
                {id: 'e_coli_and_salmonella', label: 'E. Coli & Salmonella',  detail: true},
                {id: 'is_sample', label: 'Sample', detail: true},
                {id: 'is_medical', label: 'Medical', detail: true},
                {id: 'remaining_quantity', label: 'Remaining Quantity', detail: true},
                {id: 'usable_weight', label: 'Usable Weight', detail: true},
                {id: 'inventoryparentid', label: 'QA Parent(s)', detail: true},
                {id: 'parentid', label: 'Lot Parent(s)', detail: true},
                {id: 'notes', label: 'Notes', notes: true},
            ],
            'plants': [
                {id: 'sessiontimeLabel', label: 'Created', detail: true},
                {id: 'sessiontime', label: 'Sessiontime',detail: true},
                {id: 'roomLabel', label: 'Room'},
                {id: 'strain', label: 'Strain'},
                {id: 'plantStatus', label: 'Phase'},
                {id: 'id', label: 'ID'},
                {id: 'plantBirthday', label: 'Birthday'},
                {id: 'notes', label: 'Notes', notes: true},

            ],
            'plant_rooms': [
                {id: 'name', label: 'Name'},
                // {id: '', label: ''},
            ],
            'inventory_rooms': [
                {id: 'name', label: 'Name'},
                // {id: '', label: ''},
            ],
            'manifests': [
                {id: 'sessiontimeLabel', label: 'Created'},
                {id: 'sessiontime', label: 'Sessiontime', detail: true},
                {id: 'period', label: 'Period'},
                {id: 'toLabel', label: 'To'},
                {id: 'manifestid', label: 'Manifest ID'},
                {id: 'fulfilled', label: 'Fulfilled'},
                {id: 'totalprice', label: '$',dollars: true},
            ],
            'qa_samples': [
                {id: 'sessiontimeLabel', label: 'Created'},
                {id: 'sessiontime', label: 'Sessiontime',detail: true},
                {id: 'inventoryid', label: 'ID'},
                {id: 'strain', label: 'Strain'},
                {id: 'typeLabel', label: 'Type'},
                {id: 'resultLabel', label: 'Result'},
                {id: 'labLabel', label: 'Lab'},
            ],
            'outbound_transfers': [
                {id: 'sessiontimeLabel', label: 'Created'},
                {id: 'sessiontime', label: 'Created',detail: true},
                {id: 'period', label: 'Period'},
                {id: 'toLabel', label: 'To'},
                {id: 'price', label: 'Price'},
                {id: 'inventoryid', label: 'ID'},
                {id: 'quantity', label: 'Quantity'},
                {id: 'strain', label: 'Strain'},
                {id: 'typeLabel', label: 'Type'},
                // {id: 'category', label: 'Period'},
                // {id: 'isrefund', label: 'Refund'}

            ],
            employees: [
                {id: 'employee_name', label: 'Name'},
                {id: 'employee_id', label: 'Employee ID'},
                {id: 'birthday', label: 'Birthday'},
                {id: 'hireday', label: 'Hired On'},

            ],
            vehicles: [
                {id: 'nickname', label: 'Nickname'},
                {id: 'color', label: 'Color'},
                {id: 'make', label: 'Make'},
                {id: 'model', label: 'Model'},
                {id: 'plate', label: 'License Plate'},
                {id: 'vin', label: 'Vehicle Identification Number'},
                {id: 'vehicle_id', label: 'Internal Vehicle ID'},
                {id: 'year', label: 'Year'},
            ],
            inbound_transfers: [
                {id: 'datetimestring', label: 'Created', detail: true},
                {id: 'sessiontime', label: 'Sessiontime',detail: true},
                // {id: 'datetimestring', label: 'At'},
                {id: 'period', label: 'Period'},
                {id: 'inventoryid', label: 'ID'},
                {id: 'strain', label: 'Strain'},
                {id: 'inventorytypelabel', label: 'Type'},
                {id: 'price', label: 'Price ($)', dollars: true},
                {id: 'quantity', label: 'Quantity'},
                {id: 'vendorName', label: 'From'},

            ],
            manifest_requests: [
                {id: 'at', label: 'Date', atTime: true},
                {id: 'message', label: 'Message'},
                {id: 'item_id', label: 'Item ID'},
                {id: 'requester_name', label: 'Requester Name'},
                {id: 'requester_ubi', label: 'Requster UBI', detail: true},
                {id: 'requester_address', label: 'Requester Address'},
                {id: 'request_manfiest_inbox_generate_manifest', actionButton: true, actionButtonClass: actionButtonClass},
                {id: 'request_manfiest_inbox_remove', actionButton: true, actionButtonClass: 'md-raised red darken-3 white-text'},


            ],
            timesheet: [

                {id: 'name', label:'Full Name'},
                {id: 'time_in', label: 'Time In', timeString:true},
                {id: 'time_out', label: 'Time Out', timeString: true},
                {id: 'hours_worked', label: 'Hours Worked'},
                {id: 'username', label: 'By'},
                {id: 'at', label: 'Log ID', atTime: true},
            ],
            my_timesheet: [

                {id: 'name', label:'Full Name'},
                {id: 'time_in', label: 'Time In', timeString:true},
                {id: 'time_out', label: 'Time Out', timeString: true},
                {id: 'hours_worked', label: 'Hours Worked'},
                {id: 'username', label: 'By'},
                {id: 'at', label: 'Logged', atTime: true},
            ],
            wts_listings: [

                {id: 'image', label: '', image: true,noLabel: true},
                {id: 'creator_name', label:'Creator'},

                {id: 'strain', label: 'Strain'},
                {id: 'item_type', label: 'Type'},

                {id: 'amount', label: 'Amount'},

                {id: 'price', label: 'Price', dollars: true},
                {id: 'thc', label: 'THC%'},
                {id: 'thca', label: 'THCA%'},
                {id: 'cbd', label: 'CBD%'},
                {id: 'at', label: 'Date', atTime: true},

                {id: 'creator_address', label: 'Address', detail: true},
                {id: 'request_manifest', label: 'Request Manifest', actionButton: true, actionButtonClass: actionButtonClass},
                {id: 'remove_wts', label:'Remove Listing',actionButton: true, actionButtonClass: actionButtonClass},
                // {id: 'request_manifest_void', label: 'Void Request', actionButton: true, actionButtonClass: actionButtonClass},
            ],
            vendors: [
                {id: 'vendorName',label: 'Name'},
                {id: 'type',label: 'Type'},
                {id: 'city',label: 'City'},
                {id: 'addresslabel',label: 'Address', detail: true},
            ],
            favorite_vendors: [
                {id: 'vendorName',label: 'Name'},
                {id: 'type',label: 'Type'},
                {id: 'city',label: 'City'},
                {id: 'addresslabel',label: 'Address', detail: true},
            ],
            page_template: [
                {id: 'labelName', label: 'Name'},
                {id: 'labelSizeString', label: 'Label Size'},
                {id: 'labelsPerPage', label: 'Labels Per Page'},
            ]

        }
        return cols[id]
    }
};

function pnShowCols($rootScope) {
    var _pnShowCols = {
        setShowCalls: setShowCalls,
        getShowCols: getShowCols,
        showCols: {}
    };

    init()
    function init(){
        _pnShowCols.showCols = JSON.parse(localStorage.getItem('showCols'))
        console.log(JSON.parse(localStorage.getItem('showCols')));
        $rootScope.$broadcast('showCols');


    }
    function setShowCalls(s) {
        var g = getShowCols()
        // if(g) s = g
        _pnShowCols.showCols = s;
        $rootScope.$broadcast('showCols');
        // localStorage.setItem('showCols', JSON.)
        localStorage.setItem('showCols', JSON.stringify(s))

        console.log('Set Show Cols');
        // console.log();
    };

    function getShowCols() {
        console.log(JSON.parse(localStorage.getItem('showCols')));
        console.log('Get Show Cols');
        return _pnShowCols.showCols;
    };

    return _pnShowCols;
};
