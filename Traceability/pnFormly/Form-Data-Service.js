(function() {
    angular
    .module('countryApp')
    .factory('FormDataService', ['FieldDataService', 'pnLcbFunctionExplainer', '$location',
    FormDataService
]);

function FormDataService(FieldDataService, pnLcbFunctionExplainer, $location) {
    console.log('Input Service!!!!');
    var i = {}; // forms needed for action
    // i.page_templates = function () {
    //     return [
    //         FieldDataService
    //     ]
    // }
    // }
    i.usage = function () {
        return [FieldDataService.f.pnReport({
            needed:'usage',
            key: 'usage',
            label:'Usage',
            valueProp: 'visits',
            keyProp: 'task',
            backUnits: ' visits',
            chartType: 'pnWheelChart',
            // hideExpression: 'model.inventory_chart_type.id !="inventory_by_type" || model.report_category.id != "inventory"'
        }),]
    };

    i.reports = function () {
        var date = new Date()
        date = date.toLocaleString()
        return [
            FieldDataService.f.pnSelectList({
                key:'report_category',
                label:'Report Category'
            }),
            FieldDataService.f.pnSelectList({
                key:'inventory_chart_type',
                label:'Report Type',
                hideExpression: 'model.report_category.id !="inventory"'
            }),
            FieldDataService.f.pnSelectList({
                key:'plants_chart_type',
                label:'Report Type',
                hideExpression: 'model.report_category.id !="plants"'
            }),
            FieldDataService.f.pnSelectList({
                key:'outbound_transfers_chart_type',
                label:'Report Type',
                hideExpression: 'model.report_category.id !="outbound_transfers"'
            }),
            FieldDataService.f.pnSelectList({
                key:'inbound_transfers_chart_type',
                label:'Report Type',
                hideExpression: 'model.report_category.id !="inbound_transfers"'
            }),
            FieldDataService.f.pnReport({
                needed:'plants',
                key: 'plants_by_strain',
                label:'Plants By Strain ' + date,
                valueProp:'pnQuantity',
                keyProp:'strain',
                chartType: 'pnWheelChart',
                hideExpression: 'model.plants_chart_type.id !="plants_by_strain" || model.report_category.id != "plants"'
            }),
            FieldDataService.f.pnReport({
                needed:'inventory',
                key: 'inventory_by_strain',
                label:'Inventory By Strain ' + date,
                valueProp:'remaining_quantity',
                keyProp:'strain',
                backUnits: 'g',
                chartType: 'pnWheelChart',
                hideExpression: 'model.inventory_chart_type.id !="inventory_by_strain" || model.report_category.id != "inventory"'
            }),
            FieldDataService.f.pnReport({
                needed:'inventory',
                key: 'inventory_by_type',
                label:'Inventory By Type ' + date,
                valueProp: 'remaining_quantity',
                keyProp: 'inventorytypelabel',
                backUnits: 'g',
                chartType: 'pnWheelChart',
                hideExpression: 'model.inventory_chart_type.id !="inventory_by_type" || model.report_category.id != "inventory"'
            }),
            FieldDataService.f.pnReportDateSelector({
                needed: 'outbound_transfers',
                key: 'outbound_transfers_by_vendor_period',
                label: 'Period',
                hideExpression: 'model.outbound_transfers_chart_type.id !="outbound_transfers_by_vendor" || model.report_category.id !="outbound_transfers" || !model.outbound_transfers'

            }),
            FieldDataService.f.pnReport({
                needed:'outbound_transfers',
                key: 'outbound_transfers_by_vendor',
                label:'Outbound Transfers By Vendor',
                valueProp: 'price',
                keyProp: 'toLabel',
                frontUnits: '$ ',
                chartType: 'pnWheelChart',
                hideExpression: 'model.outbound_transfers_chart_type.id !="outbound_transfers_by_vendor" || model.report_category.id !="outbound_transfers"'
            }),
            FieldDataService.f.pnReportDateSelector({
                needed: 'inbound_transfers',
                key: 'inbound_transfers_by_vendor_period',
                label: 'Period',
                hideExpression: 'model.inbound_transfers_chart_type.id !="inbound_transfers_by_vendor" || model.report_category.id !="inbound_transfers" || !model.inbound_transfers'

            }),
            FieldDataService.f.pnReport({
                needed:'inbound_transfers',
                key: 'inbound_transfers_by_vendor',
                label:'Inbound Transfers By Vendor',
                valueProp: 'price',
                keyProp: 'vendorName',
                frontUnits: '$ ',
                chartType: 'pnWheelChart',
                hideExpression: 'model.inbound_transfers_chart_type.id !="inbound_transfers_by_vendor" || model.report_category.id !="inbound_transfers" '
            }),
            // FieldDataService.f.pnBarChart({
            //     key:'inventory',
            //     report_id: 'inventory_by_strain',
            //     label:'Inventory By Strain',
            //     hideExpression: 'model.chart_type.id !="inventory_by_strain"'
            // }),
            // FieldDataService.f.pnBarChart({
            //     key:'inventory',
            //     report_id: 'inventory_by_type',
            //     label:'Inventory By Type',
            //     hideExpression: 'model.chart_type.id !="inventory_by_type"'
            // })

            // FieldDataService.f.
        ]
    }
    i.page_templates_view = function () {
        return [
            FieldDataService.f.pnSelectTable({key:'page_template', label:'View Page Templates.', singular:true, hideSelected: true, hideExport: true, hideChangeColumns: true}),

            // FieldDataService.f.pnSelectList({key:'page_template', label:'View Page Templates.'}),
            FieldDataService.f.pnSpacer(),

            FieldDataService.f.pnPagePreview2( {hideExpression: '!model.page_template', hideLabels: true}),
        ]
    }
    i.page_templates_add = function () {
        return [
            FieldDataService.f.pnInputField({key:'labelName', label:'Enter a nickname for this template.'}),
            FieldDataService.f.pnCheckbox({key:'continuous', label:'Indicate whether this template will be printed on a continuous roll.', optional: true}),
            // FieldDataService.f.pnCheckbox({key:'printVertically', label:'Labels Are Arranged Vertically on the Label Roll (eg. Dymo 450)', hideExpression: '!model.continuous'}),

            FieldDataService.f.pnQuantityField({key:'pageWidth', label:'Enter the Page Width (inches).',hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'pageHeight', label:'Enter the Page Height (inches).', hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'labelWidth', label:'Enter the Label Width (inches).'}),
            FieldDataService.f.pnQuantityField({key:'labelHeight', label:'Enter the Label Height (inches).'}),

            // FieldDataService.f.pnQuantityField({key:'pageHeight', label:'Enter the Page Height (inches).', hideExpression: 'model.continuous'}),

            FieldDataService.f.pnQuantityField({key:'topMargin', label:'Enter the Top Page Margin (inches).',hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'bottomMargin', label:'Enter the Bottom Page Margin (inches).',hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'leftMargin', label:'Enter the Left Page Margin (inches).',hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'rightMargin', label:'Enter the Right Page Margin (inches).',hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'labelColumns', label:'Enter the Number of Columns of Labels.',hideExpression: 'model.continuous'}),

            FieldDataService.f.pnQuantityField({key:'labelRows', label:'Enter the Number of Rows of Labels Per Page.', hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'hSpacing', label:'Enter the Horizontal Spacing Between Label Columns (inches).', hideExpression: 'model.continuous'}),
            FieldDataService.f.pnQuantityField({key:'vSpacing', label:'Enter the Vertical Spacing Between Label Rows (inches).',hideExpression: 'model.continuous'}),
            FieldDataService.f.pnPagePreviewButton({create:true}),
            FieldDataService.f.pnSpacer(),

            FieldDataService.f.pnPagePreview2({hideExpression: '!model.page_template'}),


        ]
    }

    i.page_templates_modify = function () {
        return [

            FieldDataService.f.pnSelectTable({key:'page_template',  singular: true, remove: true, label:'Select the Page Template to modify.', hideSelected: true, hideExport: true, hideChangeColumns: true}),
            FieldDataService.f.pnInputField({key:'labelName', label:'Edit nickname for this template.', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnCheckbox({key:'continuous', label:'Indicate Whether Template Will Be Printed On A Continuous Roll.', hideExpression: '!model.page_template'}),

            FieldDataService.f.pnQuantityField({key:'pageWidth', label:'Enter the Page Width (inches)', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'pageHeight', label:'Enter the Page Height (inches).', hideExpression: 'model.continuous', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'labelWidth', label:'Enter the Label Width (inches).', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'labelHeight', label:'Enter the Label Height (inches).', hideExpression: '!model.page_template'}),

            FieldDataService.f.pnQuantityField({key:'topMargin', label:'Enter the Top Page Margin (inches).',hideExpression: 'model.continuous', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'bottomMargin', label:'Enter the Bottom Page Margin (inches).',hideExpression: 'model.continuous', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'leftMargin', label:'Enter the Left Page Margin (inches).', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'rightMargin', label:'Enter the Right Page Margin (inches).', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'labelColumns', label:'Enter the Number of Columns of Labels.', hideExpression: '!model.page_template'}),

            FieldDataService.f.pnQuantityField({key:'labelRows', label:'Number of Rows of Labels Per Page', hideExpression: 'model.continuous', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'hSpacing', label:'Horizontal Spacing Between Label Columns (inches)', hideExpression: 'model.continuous', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnQuantityField({key:'vSpacing', label:'Vertical Spacing Between Label Rows (inches)', hideExpression: 'model.continuous', hideExpression: '!model.page_template'}),
            FieldDataService.f.pnPagePreviewButton({create:true, hideExpression: '!model.page_template'}),
            FieldDataService.f.pnPagePreview2({hideExpression: '!model.page_template'}),
            FieldDataService.f.pnModify({key: 'page_template', hideExpression: '!model.page_template'}),
            // FieldDataService.f.pnCheckbox({key:'isDefaultTemplate', label:'Is this a default template? (Admin only).', hideExpression: '!model.page_template'}),


        ]
    }
    i.page_templates_remove = function () {
        return [
            FieldDataService.f.pnSelectTable({key:'page_template',  singular: true, remove: true, label:'Select a Page Template To remove.', hideSelected: true, hideExport: true, hideChangeColumns: true}),

            // FieldDataService.f.pnSelectList({key:'page_template', remove: true, label:'Select a Page Template To remove.'}),
            FieldDataService.f.pnSpacer(),

            FieldDataService.f.pnPagePreview2({hideExpression: '!model.page_template'}),
        ]
    }
    i.generate_labels = function () {
        return [
            FieldDataService.f.pnSelectList({key:'my_label', label:'Select a Label Template.'}),

            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the item to label (inventory).', hideExpression: "model.my_label.category != 'inventory'"}),
            FieldDataService.f.pnSelectTable({key:'plants', label:'Select the item to label (plant).', hideExpression: "model.my_label.category != 'plants'"}),
            FieldDataService.f.pnSpacer(),

            FieldDataService.f.pnPagePreview2({hideExpression: '!model.my_label || !model.inventory', myLabel: true}),
            FieldDataService.f.pnPagePreview2({hideExpression: '!model.my_label || !model.plants', myLabel: true}),
            FieldDataService.f.pnPrintLabels({hideExpression: '!model.my_label || !model.plants'}),
            FieldDataService.f.pnPrintLabels({hideExpression: '!model.my_label || !model.inventory'}),


        ]
    }
    // i.label_view = function () {
    //     return [
    //         FieldDataService.f.pnSelectList({key:'my_label', label:'My Label Templates', desc: 'Select a Label Template' }),
    //         FieldDataService.f.pnSelectTable({key:'inventory', label:'My Inventory', desc:'Select an Inventory Item for the Label', hideExpression: "model.my_label.category != 'inventory'"}),
    //         FieldDataService.f.pnSelectTable({key:'plants', label:'Plant for the Label', hideExpression: "model.my_label.category != 'plants'"}),
    //         FieldDataService.f.pnSpacer(),
    //
    //         FieldDataService.f.pnPagePreview({hideExpression: '!model.my_label || !model.inventory', myLabel: true}),
    //         FieldDataService.f.pnPagePreview({hideExpression: '!model.my_label || !model.plants', myLabel: true}),
    //         FieldDataService.f.pnPrintLabels({hideExpression: '!model.my_label || !model.plants'}),
    //         FieldDataService.f.pnPrintLabels({hideExpression: '!model.my_label || !model.inventory'}),
    //
    //
    //     ]
    // }
    i.label_modify = function () {
        return [
            FieldDataService.f.pnSelectList({key:'my_label', label:'Select a Label Template to modify'}),
            FieldDataService.f.pnSelectList({key:'label_category', label:'Choose a Label Category', modifyLabel: true, hideExpression: '!model.my_label'}),
            // FieldDataService.f.pnSelectList({key:'page_template', label:'Choose a Page Template', modifyLabel: true, hideExpression: '!model.my_label'}),
            FieldDataService.f.pnSelectTable({key:'page_template',  hideExpression: '!model.my_label', singular: true, label: 'Choose the Page Layout for the Label Template', hideSelected: true, hideExport: true, hideChangeColumns:true}),

            FieldDataService.f.pnSelectTable({key:'inventory', label: 'Select an inventory item to preview', hideExpression: "model.label_category.id != 'inventory' || !model.page_template"}),
            FieldDataService.f.pnSelectTable({key:'plants', label: 'Select a Plant to preview', hideExpression: "model.label_category.id != 'plants' || !model.page_template"}),
            FieldDataService.f.pnDragDrop({key:'label_template', modifyLabel:true, hideExpression: 'model.label_category.id!="inventory" || !model.inventory || !model.page_template'}),
            FieldDataService.f.pnDragDrop({key:'label_template', modifyLabel:true, hideExpression: 'model.label_category.id!="plants" || !model.plants || !model.page_template'}),

            FieldDataService.f.pnPagePreview2({hideExpression:'!model.page_template || !model.label_template'}),
            FieldDataService.f.pnInputField({key:'label_nickname', modifyLabel:true, label:'Enter a nickname for this Label Template', hideExpression: '!model.inventory || !model.page_template || !model.my_label'}),
        ]
    }
    i.label_remove = function () {
        return [FieldDataService.f.pnSelectList({key:'my_label', label:'Select a Label to Remove.'})]
    }
    i.label_add = function () {
        return [
            FieldDataService.f.pnSelectTable({key:'page_template',  singular: true, label: 'Choose the Page Template for the new Label Template.', hideSelected: true, hideExport: true, hideChangeColumns:true}),

            // FieldDataService.f.pnSelectList({label:'Choose a Page Template for the New Label.', key:'page_template'}),
            FieldDataService.f.pnSelectList({key:'label_category', label:'Choose a Label Category for the new Label Template.'}),
            FieldDataService.f.pnSelectTable({key:'plants', label:'Choose a Plant to Preview.', hideExpression: "model.label_category.id!='plants' || !model.page_template"}),
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Choose an Inventory Item to Preview.', hideExpression: "model.label_category.id != 'inventory' || !model.page_template"}),
            FieldDataService.f.pnDragDrop({key:'label_template',  label: 'Drag and Drop Inventory Label Layout.', hideExpression: 'model.label_category.id!="inventory" || !model.inventory || !model.page_template'}),
            FieldDataService.f.pnDragDrop({key:'label_template',  label: 'Drag and Drop Plant Label Layout.', hideExpression: 'model.label_category.id!="plants" || !model.plants || !model.page_template'}),
            FieldDataService.f.pnPagePreview2({hideExpression:'!model.page_template || !model.label_template'}),
            FieldDataService.f.pnInputField({key:'label_nickname', label:'Enter a name for this Label.'}),

        ]
    }
    i.view_favorite_vendors = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'favorite_vendors', label:'Favorite Vendors', browse: true}),
        ]
    }
    i.favorite_vendor_add = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'vendors', label:'All I-502 Licensed Vendors', multiple: true}),

        ]
    }
    i.favorite_vendor_remove = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'favorite_vendors', label:'Favorite Vendors', multiple: true}),
        ]
    }
    i.timesheet_entry_add = function () {
        return [
            FieldDataService.f.pnAutocomplete({key: 'employees', label:'Employee',  }),
            // FieldDataService.f.pnInputField({key:'name', label:'Full Name'}),
            FieldDataService.f.pnDateTimePicker({key:'time_in', label:'Time In', hideExpression: '!model.employees'}),
            FieldDataService.f.pnDateTimePicker({key:'time_out', label:'Time Out', hideExpression:'!model.employees'}),
            FieldDataService.f.pnHoursWorked()
        ]
    }
    i.timesheet_entry_remove = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'my_timesheet', label: 'Timesheet', hideSelected: true})
        ]
    }
    i.browse_timesheet = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'timesheet', label: 'Timesheet', hideSelected: true})
        ]
    }
    i.user_add = function() {
        return [
            FieldDataService.f.pnInputField({key: 'new_username', label:'Type the email address of the new user being granted access.', type:'email'}),
            FieldDataService.f.pnInputField({key: 'new_password', label:'Type the initial password of the new user being granted access.', type:'text'}),
            // FieldDataService.f.pnInputField({key: 'new_password2', label:'Repeat Password', type:'password'}),
            // FieldDataService.f.pnPasswordsDoNotMatch()
            // new_username
            // new_password
            FieldDataService.f.new_user_permissions()

        ]
    }
    i.user_remove = function() {
        return [
            FieldDataService.f.pnInputField({key: 'new_username', label:'Type the email address of the existing user being removed from the traceability system.'}),
        ]
    }
    i.browse_market = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'wts_listings', label:'Available Deals', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'wts_listings', label:'Available Deals', showActionButtons: true})
        ]
    }
    i.browse_outbound_transfers = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'outbound_transfers', label:'Outbound Transfers', browse: false}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'outbound_transfers', label:' '})

        ]
    }
    i.inventory_manifest_void_items = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'manifests', label:'Select an unfulfilled manifest to void.', unfulfilled: 1}),
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select items to void.', multiple: true, hideExpression:'!model.manifests', filterManifest: true}),

        ]
    }
    i.inventory_manifest_void = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'manifests', label:'Select an unfulfilled manifest to void.', unfulfilled: 1})
        ]
    }
    i.inventory_manifest_modify = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'manifests', label:'Select an unfulfilled manifst to modify.', unfulfilled: 1}),
            FieldDataService.f.pnAutocomplete({key: 'employees', label:'Select the driver (required for drop-off manifests).', hideExpression: '!model.manifests', optional: true}),
            FieldDataService.f.pnInputField({key: 'employee_name', label:'Enter the Driver\'s Full Name (required for pick-up manifests).', hideExpression: '!model.manifests', optional: true}),
            FieldDataService.f.pnInputField({key: 'employee_dob', label:'Driver\'s Date of Birth (required for pick-up manifests).', hideExpression: '!model.manifests', optional: true}),
            FieldDataService.f.pnInputField({key: 'third_party_license', label:'Enter the Third Party License # (required for third party manifests).', hideExpression: '!model.manifests', optional: true}),

        ]
    }
    i.inventory_qa_sample_non_mandatory  = function () {
        var labs = FieldDataService.f.pnSelectList({key:'labs', label:'Select the receiving QA lab.'})

        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the item to be sampled.', multiple: false}),
            FieldDataService.f.quantity({label: 'Enter the sample quantity.'}),
            FieldDataService.f.pnUom,
            labs,
        ]

    }
    i.inventory_qa_sample = function() {
        var labs = FieldDataService.f.pnSelectList({key:'labs', label:'Select the receiving QA lab.'})

        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the item to be sampled.', multiple: false}),
            FieldDataService.f.quantity({label: 'Enter the sample quantity.'}),
            FieldDataService.f.pnUom,
            labs,
        ]

    }
    i.inventory_sample = function() {


        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the item to be sampled.', multiple: false}),
            FieldDataService.f.quantity({label: 'Enter the sample quantity.'}),
            FieldDataService.f.pnRadioGroup({key: 'sample_type', label: 'Sample Type', staticData: 'marketingSampleType'}),
            FieldDataService.f.pnAutocomplete({key:'vendors', label:'Recipient', hideExpression:'model.sample_type!=1', optional: true}),
            FieldDataService.f.pnAutocomplete({key: 'employees', label:'Employee', hideExpression:'model.sample_type!=2', optional: true}),

            // hideExpression
            // vendor license OR employee id based on sample_type
            // FieldDataService.f.marketing_sample_type({key: 'sample_type', label: 'Sample Type', staticData: 'marketingSampleType'})
        ]
    }
    i.manifest_request_inbox = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'manifest_requests', label:'Manifest Requests', createdByMe: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'manifest_requests', showActionButtons: true}),
        ]

    }
    i.generate_manifest_for_request = function () {
        return [
            // FieldDataService.f.pnRadioGroup({key: 'manfiest_delivery_type', label: 'Manifest Type', staticData: 'manifestTypes'}),
            //
            // FieldDataService.f.selected_inventory_for_generate_manifest_for_request,
            // FieldDataService.f.selected_recipient_for_generate_manifest_for_request,
            // // FieldDataService.f.select_vehicle,
            // FieldDataService.f.pnSelectTable({key:'vehicles', label: 'vehicles'})
            // FieldDataService.f.select_employee,
            // FieldDataService.f.manifest_approximate_departure,
            // FieldDataService.f.manifest_approximate_arrival,
            // FieldDataService.f.manifest_approximate_route
            FieldDataService.f.pnRadioGroup({key: 'manfiest_delivery_type', label: 'Manifest Type', staticData: 'manifestDeliveryTypes'}),
            FieldDataService.f.pnAutocomplete({key: 'employees', label:'Driver', hideExpression:'model.manfiest_delivery_type!=0', optional: true}),
            FieldDataService.f.pnAutocomplete({key: 'vehicles', label:'Vehicles', hideExpression:'model.manfiest_delivery_type!=0', optional: true}),
            FieldDataService.f.selected_inventory_for_generate_manifest_for_request,
            FieldDataService.f.selected_recipient_for_generate_manifest_for_request,
            // FieldDataService.f.pnAutocomplete({key:'vendors', label:'Recipient':, optional: true}),
            // FieldDataService.f.pnAutocomplete({key:'thirdPartyTransporters', label:'Third Party Transporter', hideExpression:'model.manfiest_delivery_type!=2', optional: true}),

            FieldDataService.f.pnInputField({key: 'employee_name', label:'Driver Full Name', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'employee_id', label:'Transporter ID', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'employee_dob', label:'Transporter DOB', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'vehicle_color', label:'Vehicle Color', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'vehicle_make', label:'Vehicle Make', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'vehicle_model', label:'Vehicle Model', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'vehicle_plate', label:'Vehicle Plate', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'vehicle_vin', label:'Vehicle VIN', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.pnInputField({key: 'vehicle_year', label:'Vehicle Year', hideExpression:'model.manfiest_delivery_type!=1', optional: true}),
            FieldDataService.f.manifest_approximate_departure,
            FieldDataService.f.manifest_approximate_arrival,
            FieldDataService.f.manifest_approximate_route
            // FieldDataService.f.select_vendor({multiple: true, hideExpression:'model.manfiest_delivery_type!=0'}),
            // FieldDataService.f.manifest_stops(),
        ]
    }
    console.log('TODO: RETURNs!!!!!!!!!!!!!!!!! inventory_transfer_outbound_return inventory_transfer_outbound_return_lookup inventory_transfer_inbound_modify inventory_qa_sample_results');
    i.browse_inventory = function(){
        var field = FieldDataService.f.pnSelectTable({key:'inventory', label:'View Inventory.', multiple: true, browse: true})
        // field.templateOptions.repeaterContainerClass = "repeater-container-100"
        return [
            field,
            // FieldDataService.f.pnCuratedDetailsTable({key:'inventory'})
            // FieldDataService.f.pnActionGridTable({key:'inventory'})
        ]
    }
    i.browse_manifests = function(){
        return [
            FieldDataService.f.pnSelectTable({key:'manifests', label:'View Manifests.' }),
            FieldDataService.f.pnManifestDetailsTable()
        ]
    }
    i.want_to_sell = function() {
        return [
            // FieldDataService.f.select_inventory3('want_to_sell'),
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Inventory', multiple:true, passedQa:true}),
            FieldDataService.f.create_post_prices,
            // FieldDataService.f.pnInputField({label: Description, key: description})
            // FieldDataService.f.create_post_images
        ]
    }
    i.want_to_buy = function() {
        return [
            FieldDataService.f.pnInputField({key: 'message', placeholder: 'What would you like to buy?'}),
        ];
    }
    // i.create = function() {
    //     return [
    //         FieldDataService.f.select_inventory2(true, false, false),
    //         FieldDataService.f.create_post_prices
    //     ]
    // }
    i.inventory_room_add = function() {
        return [
            FieldDataService.f.inventory_room_name,
            FieldDataService.f.pnAutocomplete({key:'vendors', label:'Select your location.', myLocation: true}),
        ]
    }
    i.inventory_room_remove = function() {
        return [FieldDataService.f.pnSelectTable({key: 'inventory_rooms', label: 'Select an Inventory Room to remove.'})]
    }
    i.browse_inventory_rooms = function() {
        return [
            FieldDataService.f.pnSelectTable({key: 'inventory_rooms', label: 'View Inventory Rooms.', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'room'})

        ]
    }

    i.plant_room_add = function() {
        return [
            FieldDataService.f.plant_room_name,
            FieldDataService.f.pnAutocomplete({key:'vendors', label:'Select your location.', myLocation: true}),
        ]
    }
    i.plant_room_remove = function() {
        return [FieldDataService.f.pnSelectTable({key: 'plant_rooms', label: 'Select a plant room to remove. '})]
    }
    i.browse_plant_rooms = function() {
        return [
            FieldDataService.f.pnSelectTable({key: 'plant_rooms', label: 'View Plant Rooms.', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'room'})

        ]
    }


    i.plant_new = function() {
        // var form = []
        // addfield(form, 'select_plant_source')
        // addfield(form, 'plant_strain')
        // FieldDataService.f.pnSelectTable({key: 'plant_rooms', label: 'Plant Rooms'})
        // addfield(form, 'quantity')
        // addfield(form, 'plant_is_mother')

        // return form
        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the source of the new plant.', newPlant:true}),
            // FieldDataService.f.pnSelectTable
            FieldDataService.f.plant_strain,
            FieldDataService.f.pnSelectTable({key: 'plant_rooms', label: 'Select the room of the new plant.'}),
            FieldDataService.f.quantity({label: 'Quantity of new plants being created. Source inventory will be reduced by this number.'}),
            FieldDataService.f.plant_is_mother,
            // FieldDataService.f.pnPrintLabel({key:'plant'})
        ];
    };


    // TODO ***************************************************************************************************
    // ********************************************************************************************************
    // ********************************************************************************************************
    i.inventory_transfer_inbound_modify = function(){

        return [
            FieldDataService.f.pnSelectTable({key:'inbound_transfers', label:'Select Inbound Transfer to modify.'}),
            FieldDataService.f.pnQuantityField({key:'price', label:'Corrected Price', hideExpression: '!model.inbound_transfers'}),

            // FieldDataService.f.pnAutocomplete({key:'vendors', label:'My Location', myLocation: true}),
            // FieldDataService.f.select_inbound_manifest_to_accept,
            // FieldDataService.f.select_items_to_accept
        ]
    }
    i.inventory_transfer_inbound = function(){
        return [
            FieldDataService.f.pnAutocomplete({key:'vendors', label:'Select your location.', myLocation: true}),
            FieldDataService.f.select_inbound_manifest_to_accept,
            FieldDataService.f.select_items_to_accept
        ];
    };
    i.transfers_view_inbound = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'inbound_transfers', label:'View Inbound Transfers.', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'inbound_transfers'})
        ];
    };

    i.browse_plants = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'plants', label:'View Plants.', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'plants'})

            // FieldDataService.f.select_plants({browse: true}),
            // FieldDataService.f.plants_details
        ];

    }

    i.inventory_move = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select inventory to move.', multiple:true}),
            FieldDataService.f.pnSelectList({key: 'inventory_rooms', label: 'Select the destination room.'})
        ];
    }

    i.plant_move = function() {
        return [
            // FieldDataService.f.pnSelectTable({key:'plants', label:'Plants', multiple:true}),
            // FieldDataService.f.pnSelectTable({key:'plants', label:'Plant'}),

            FieldDataService.f.pnSelectTable({key: 'plants', label: 'Select Plants to Move', multiple:true}),
            FieldDataService.f.pnSelectList({key: 'plant_rooms', label: 'Select Destination Room'})
        ];
    }

    i.plant_destroy = function () {
        return [
            FieldDataService.f.pnSelectTable({key:'plants', label:'Select plants to destroy.', destroy: true, multiple: true}),

            // FieldDataService.f.select_plants({}),
        ]
    }
    i.plant_destroy_schedule = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'plants', label:'Select plants to schedule for destruction.'}),
            FieldDataService.f.reason_type_for_schedule_for_destruction,
            FieldDataService.f.reason_desc_for_schedule_for_destruction
        ]
    }
    i.plant_destroy_schedule_undo = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'plants', label:'Select plants to unschedule for destruction.', mutliple: true, destroy: true}),
        ]
    }
    i.plant_harvest = function() {
        var new_room =  FieldDataService.f.pnSelectTable({key:'plant_rooms', label: 'Select the Plant Room.'});
        new_room.templateOptions.label = "Enter the destination room for the plants.";
        return [
            FieldDataService.f.pnSelectTable({key:'Select plants to harvest.', label:'Select plants to harvest.', harvest: true}),
            new_room,
            FieldDataService.f.plant_harvest_flower_amount,
            FieldDataService.f.plant_harvest_waste_amount,
            FieldDataService.f.plant_harvest_other_plant_material_amount,
            FieldDataService.f.collectadditional
        ]
    }
    i.plant_harvest_schedule = function() {
        return [
            // FieldDataService.f.select_plants({scheduleHarvest:true,  multiple: true})
            FieldDataService.f.pnSelectTable({key:'plants', label:'Select plants to schedule for harvest.', scheduleHarvest:true,  multiple: true}),

        ]
    }
    i.plant_waste_weigh = function() {

    }

    i.plant_cure = function() {
        var new_room =  FieldDataService.f.pnSelectTable({key: 'plant_rooms', label: 'Select the plants to be cured.'})
        new_room.templateOptions.label = "Select the destination room for the plants."
        // new_room.templateOptions.placeholder = "Destination Room"
        return [
            // FieldDataService.f.select_plant_derivatives,
            FieldDataService.f.pnSelectTable({key:'plants', label:'Select plants to cure.', cure: true}),

            new_room,
            FieldDataService.f.plant_harvest_flower_amount,
            FieldDataService.f.plant_harvest_waste_amount,
            FieldDataService.f.plant_harvest_other_plant_material_amount,
            FieldDataService.f.collectadditional,
        ]
    }

    i.plant_convert_to_inventory = function() {

        return [FieldDataService.f.pnSelectTable({key:'plants', label:'Select plants to convert to inventory.', multiple: true, cure:true})]
    }

    i.plant_yield_modify = function() {

    }

    i.plant_modify = function() {

    }

    // i.employee_modify = function() {
    //     var form = [];
    //     addfield(form, 'select_employee')
    //     addfield(form, 'modify_employee_name')
    //     addfield(form, 'modify_birth_date')
    //     addfield(form, 'modify_hire_date')
    //     return form
    // }
    i.employee_add = function() {
        // var form = []
        // addfield(form, 'employee_name')
        // // addfield(form, '')
        // addfield(form, 'birth_date')
        // addfield(form, 'hire_date')
        // return form
        return [
            FieldDataService.f.pnInputField({key: 'employee_name', label:'Enter the Full Name of the Driver.'}),
            FieldDataService.f.pnInputField({key: 'employee_id', label:'Enter the Driver\'s License #.'}),
            FieldDataService.f.hire_date,
            FieldDataService.f.birth_date,
        ]
    }
    i.employee_remove = function() {
        // var form = []
        // addfield(form, 'select_employee')
        // return form
        return [
            FieldDataService.f.pnAutocomplete({key: 'employees', label:'Select Drivers to remove.'}),
        ]
    }
    i.browse_employees = function() {
        // var form = []
        // addfield(form, 'select_employee')
        // addfield(form, 'employee_details')
        // return form
        // return  [FieldDataService.f.select_employee]
        // return  [FieldDataService.f.pnSelectTable({key:'employees', label:'Drivers'})]
        return [
            // FieldDataService.f.pnAutocomplete({key: 'employees', label:'Drivers'}),
            FieldDataService.f.pnSelectTable({key:'employees', label:'View Drivers.', browse: true}),
            // FieldDataService.f.pnAutocomplete({key:'employees', label:'Drivers'}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'employees'})
        ]

    }
    i.vehicle_remove = function() {
        // var form = []
        // addfield(form, 'select_vehicle')
        // return form
        // FieldDataService.f.pnAutocomplete({key: 'vehicles', label:'Vehicles', hideExpression:'model.manfiest_delivery_type!=0', optional: true}),
        return [
            FieldDataService.f.pnAutocomplete({key: 'vehicles', label:'Select the Vehicle to remove.'}),
        ]

    }
    // i.vehicle_modify = function() {
    //     var form = []
    //     addfield(form, 'select_vehicle')
    //     // addfield(form, 'modify_nickname')
    //     addfield(form, 'modify_color')
    //     addfield(form, 'modify_make')
    //     addfield(form, 'modify_model')
    //     addfield(form, 'modify_plate')
    //     addfield(form, 'modify_vin')
    //     addfield(form, 'modify_year')
    //     return form
    // }
    i.vehicle_add = function() {
        var form = []
        addfield(form, 'vehicle_color_and_get_ids')
        addfield(form, 'make')
        addfield(form, 'model')
        addfield(form, 'plate')
        addfield(form, 'vin')
        addfield(form, 'year')
        addfield(form, 'nickname')
        return form
    }
    i.browse_vehicles = function() {
        return [
            // FieldDataService.f.pnAutocomplete({key:'vehicles', label:'Vehicles'}),
            FieldDataService.f.pnSelectTable({key:'vehicles', label:'View Vehicles.', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'vehicles'})
        ]
    }

    i.inventory_convert = function() {
        var inv = FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the inventory item source(s) of the new product.', multiple:true})

        return [
            FieldDataService.f.derivative_type,
            FieldDataService.f.derivative_product,
            FieldDataService.f.derivative_strain,
            FieldDataService.f.derivative_quantity,
            FieldDataService.f.pnUom,

            inv,
            // FieldDataService.f.inventory_convert_remove_quantity,
            FieldDataService.f.multiple_remove_quantity,
            FieldDataService.f.inventory_convert_waste,
        ];
    };
    i.inventory_convert_undo = function() {
        return [FieldDataService.f.pnSelectTable({key:'inventory', label:'Inventory'})]
    };
    i.inventory_new = function(){
        return [
            FieldDataService.f.pnSelectList({key:'invtype', label:'Select the type of new inventory item being created.', newInventoryType: true}),
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the source of the new inventory item.', newInventorySource: true}),
            FieldDataService.f.pnInputField({key: 'strain', label:'Enter the strain of the new inventory item.'}),
            FieldDataService.f.pnQuantityField({key:'quantity', label:'Enter the quantity being created of the new inventory item.'}),
            FieldDataService.f.pnAutocomplete({key:'vendors', label:'Select your location.', myLocation: true}),

        ]

    }
    i.inventory_destroy = function() {
        return [FieldDataService.f.pnSelectTable({key:'inventory', label:'Select inventory to destroy.', multiple:true, waste:true})]
    };

    i.inventory_destroy_schedule = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Schedule inventory for destruction.', multiple:true}),
            FieldDataService.f.reason_type_for_schedule_for_destruction
        ];
    };
    i.inventory_destroy_schedule_undo = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select inventory to unschedule.', mutliple: true, waste:true}),
        ];
    };

    i.inventory_transfer_outbound = function() {
        // var form = [];
        // addfield(form, 'select_inventory_multiple');
        return [
            FieldDataService.f.pnSelectTable({key:'manifests', label:'Select unfulfilled outbound manifest to transfer.', unfulfilled: 1}),
            FieldDataService.f.manifest_prices
        ]
        // addfield(form, 'manifest_prices')
        // return form;
    };

    i.inventory_transfer_outbound_void = function() {
        return [ FieldDataService.f.pnSelectTable({key:'outbound_transfers', label:'Select an Outbound Transfer to void.'})]
    };

    i.inventory_transfer_outbound_return = function() {
        return [ FieldDataService.f.pnSelectTable({key:'inventory_transfer_outbound_return', label:'Select Outbound Transfers to return.', multiple: true })]
    };

    i.market_manifest = function() {
        return [
            FieldDataService.f.marketManifestData,
            FieldDataService.f.select_employee,
            FieldDataService.f.select_vehicle,
        ];
    };
    // i.inventory_manifest_modify = function () {
    //     return [
    //         FieldDataService
    //     ]
    // }
    i.inventory_manifest = function() {
        return [

            FieldDataService.f.pnRadioGroup({key: 'manifest_delivery_type', label: 'Indicate the delivery type.', staticData: 'manifestDeliveryTypes'}),
            FieldDataService.f.pnRadioGroup({key: 'manifest_destination_type', label: 'Indicate the destination type.', staticData: 'manifestDestinationTypes', hideExpression:'!model.manifest_delivery_type'}),
            FieldDataService.f.pnAutocomplete({key: 'employees', label:'Select the Driver.', hideExpression:'model.manifest_delivery_type!=0'}),
            FieldDataService.f.pnAutocomplete({key: 'vehicles', label:'Select the Vehicle.', hideExpression:'model.manifest_delivery_type!=0'}),
            FieldDataService.f.pnAutocomplete({key: 'vendors', label:'Select the Recipient Vendor (Picking up).', hideExpression:'model.manifest_delivery_type!=1 || model.manifest_destination_type!=0'}),
            FieldDataService.f.pnAutocomplete({key: 'labs', label:'Select the Recipient Lab.', hideExpression:'model.manifest_destination_type!=1'}),
            FieldDataService.f.select_vendor({label: 'Select the Recipient Vendor(s) (Dropping Off).',multiple: true, hideExpression:'model.manifest_delivery_type!=0 || model.manifest_destination_type!=0'}),

            // FieldDataService.f.pnAutocomplete({key:'thirdPartyTransporters', label:'Third Party Transporter', hideExpression:'model.manfiest_delivery_type!=2'}),

            FieldDataService.f.pnInputField({key: 'employee_name', label:'Enter the Driver\'s full name.', hideExpression:'model.manifest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'employee_id', label:'Enter the Driver\'s License.', hideExpression:'model.manifest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'employee_dob', label:'Enter the Driver\'s Date of Birth.', hideExpression:'model.manifest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'vehicle_color', label:'Enter the Vehicle Color', hideExpression:'model.manifest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'vehicle_make', label:'Enter the Vehicle Make', hideExpression:'model.manifest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'vehicle_model', label:'Enter the Vehicle Model', hideExpression:'model.manfiest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'vehicle_plate', label:'Enter the Vehicle Plate', hideExpression:'model.manfiest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'vehicle_vin', label:'Enter the Vehicle VIN', hideExpression:'model.manfiest_delivery_type!=1'}),
            FieldDataService.f.pnInputField({key: 'vehicle_year', label:'Enter the Vehicle Year', hideExpression:'model.manfiest_delivery_type!=1'}),
            FieldDataService.f.manifest_stops({label: 'Select inventory to transfer to vendor.', type: 'pn-manifest-stops', hideExpression:'!model.vendors|| model.manifest_destination_type !=0'}),
            FieldDataService.f.manifest_stops({label: 'Select inventory to transfer to lab.', type: 'pn-manifest-sample-stops',hideExpression:'!model.labs || model.manifest_destination_type !=1'}),
        ]
    };
    i.inventory_qa_sample_void = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'qa_samples', label:'Select QA Sample to void.', qa_untested: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'qa_samples'}),
        ];
    };
    i.browse_qa_sample = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'qa_samples', label:'View QA Samples.', browse: true}),
            // FieldDataService.f.pnCuratedDetailsTable({key:'qa_samples'}),
        ];
    };
    i.clients = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'vendors', label: 'Vendors'})
        ]
    }
    i.inventory_create_lot = function() {
        return [
            FieldDataService.f.lot_type,
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select the source(s) of the new inventory being created.', flowerOrOpm: true, multiple:true}),
            FieldDataService.f.multiple_remove_quantity,
            FieldDataService.f.pnCheckbox({key:'isMedical', label:'Indicate whether this new lot will be used for medical purposes.'}),

        ];
    };
    i.inventory_split = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select inventory to split.', multiple:true}),
            FieldDataService.f.multiple_remove_quantity,

        ];
    };
    i.inventory_adjust = function() {
        return [
            FieldDataService.f.pnSelectTable({key:'inventory', label:'Select inventory to adjust.', multiple:true}),
            FieldDataService.f.adjust_quantity_multiple,
            FieldDataService.f.pnUom,
            FieldDataService.f.enter_adjust_reason,
            FieldDataService.f.select_adjust_type
        ]

    }

    function addfield(form, field) {
        var field = FieldDataService.f[field];
        // console.log(field);
        if(typeof field != 'undefined') {
            form.push(field);
            return form
        } else {
            console.log('Error! Field not found for: ' + field)
            console.log('field');
            console.log(field);
            console.log('task');
            console.log(task);
        };
    };
    // console.log(i);

    function getform(task) {
        var form = i[task]();
        // form.unshift(FieldDataService.f.explanation(task));
        return form;
    };

    return {
        getForm: getform,
        i: i
    };
};
})();
