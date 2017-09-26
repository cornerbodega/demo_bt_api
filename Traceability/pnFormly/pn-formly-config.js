
(function(){
    angular
    .module('countryApp')

.run(function(formlyConfig) {

    formlyConfig.setType({
        name: 'pnReportDateSelector',
        templateUrl: 'Traceability-Form/field_templates/Reports/pnReportDateSelector.html',
    });
    formlyConfig.setType({
        name: 'pnWheelChart',
        templateUrl: 'Traceability-Form/field_templates/Reports/barChart.view.html',
    });
    // formlyConfig.setType({
    //     name: 'outbound_transfers_by_vendor',
    //     templateUrl: 'Traceability-Form/field_templates/Reports/barChart.view.html',
    // });
    // formlyConfig.setType({
    //     name: 'inventory_by_type',
    //     // templateUrl: 'Traceability-Form/field_templates/Reports/inventory_by_type.html',
    //     templateUrl: 'Traceability-Form/field_templates/Reports/barChart.view.html',
    //
    // });
    // formlyConfig.setType({
    //     name: 'inventory_by_strain',
    //     // templateUrl: 'Traceability-Form/field_templates/Reports/inventory_by_strain.html',
    //     templateUrl: 'Traceability-Form/field_templates/Reports/barChart.view.html',
    //
    // });
    // formlyConfig.setType({
    //     name: 'plants_by_strain',
    //     templateUrl: 'Traceability-Form/field_templates/Reports/barChart.view.html',
    // });
    // formlyConfig.setType({
    //     name: 'pnBarChart',
    //     templateUrl: 'Traceability-Form/field_templates/pnBarChart.html',
    // });
    formlyConfig.setType({
        name: 'pnSpacer',
        templateUrl: 'Traceability-Form/field_templates/pnSpacer.html',
    });

    formlyConfig.setType({
        name: 'pnMyLabelPreview',
        templateUrl: 'Traceability-Form/field_templates/pnMyLabelPreview.html',
    });
    formlyConfig.setType({
        name: 'pnPrintLabels',
        templateUrl: 'Traceability-Form/field_templates/pnPrintLabels.html',
    });
    formlyConfig.setType({
        name: 'pnBlank',
        templateUrl: 'Traceability-Form/field_templates/blank.html',
    });

    formlyConfig.setType({
        name: 'pnDragDrop',
        templateUrl: 'Traceability-Form/field_templates/pnDragDrop.html',
    });
    formlyConfig.setType({
        name: 'page_preview_button',
        templateUrl: 'Traceability-Form/field_templates/page_preview_button.html',
    });
    formlyConfig.setType({
        name: 'page_preview2',
        templateUrl: 'Traceability-Form/field_templates/page_preview2.html',
    });
    formlyConfig.setType({
        name: 'page_preview',
        templateUrl: 'Traceability-Form/field_templates/page_preview.html',
    });
    formlyConfig.setType({
        name: 'pnPrintLabel',
        templateUrl: 'Traceability-Form/field_templates/pnPrintLabel.html',
    });
    formlyConfig.setType({
        name: 'pnActionGridTable',
        templateUrl: 'Traceability-Menu/directives/pn-paths-grid.html',
    });
    formlyConfig.setType({
        name: 'pnHoursWorked',
        templateUrl: 'Traceability-Form/field_templates/pnHoursWorked.template.html',
    });
    formlyConfig.setType({
        name: 'pnPasswordsDoNotMatch',
        templateUrl: 'Traceability-Form/field_templates/passwords_do_not_match.html',
    });
    formlyConfig.setType({
        name: 'new_user_permissions',
        templateUrl: 'Traceability-Form/field_templates/new_user_permissions.html',
    });
    formlyConfig.setType({
        name: 'explanation',
        templateUrl: 'Traceability-Form/field_templates/explanation.html',
    });
    formlyConfig.setType({
        name: 'pnDetailsTable',
        templateUrl: 'Traceability-Form/field_templates/pnDetailsTable/pnDetailsTable.html',
    });
    formlyConfig.setType({
        name: 'pnCuratedDetailsTable',
        templateUrl: 'Traceability-Form/field_templates/pnCuratedDetailsTable/pnCuratedDetailsTable.html',
    });
    formlyConfig.setType({
        name: 'pnManifestDetailsTable',
        templateUrl: 'Traceability-Form/field_templates/pnManifestDetailsTable/pnManifestDetailsTable.html',
    });
    formlyConfig.setType({
        name: 'pnRadioGroup',
        templateUrl: 'Traceability-Form/field_templates/pnRadioGroup/pnRadioGroup.html',
    });
    formlyConfig.setType({
        name: 'create_post_prices',
        templateUrl: 'Traceability-Form/field_templates/create_post_prices.html',
    });
    formlyConfig.setType({
        name: 'pn-select-vendor',
        templateUrl: 'Traceability-Form/field_templates/pn-select-vendor.html',
    });
    // formlyConfig.setType({
    //     name: 'pn-select-list',
    //     templateUrl: 'Traceability-Form/field_templates/pn-select-list.html',
    // });
    formlyConfig.setType({
        name: 'pn-select-multiple-vendors',
        templateUrl: 'Traceability-Form/field_templates/pn-select-multiple-vendors.html',
    });
    formlyConfig.setType({
        name: 'pn_accept_inbound_inventory_transfer',
        templateUrl: 'Traceability-Form/field_templates/pn_accept_inbound_inventory_transfer.html',
    });
    formlyConfig.setType({
        name: 'new_post_description',
        templateUrl: 'Traceability-Form/field_templates/new_post_description.html',
    });
    formlyConfig.setType({
        name: 'plant_derivatives',
        templateUrl: 'Traceability-Form/plants/plant_derivatives.html',
    });
    formlyConfig.setType({
        name: 'show_qa_labs',
        templateUrl: 'Traceability-Form/qa_lab/show_qa_labs.html',
    });
    formlyConfig.setType({
        name: 'mycheckbox',
        templateUrl: 'Traceability-Form/field_templates/my_checkbox.html',
    });
    formlyConfig.setType({
        name: 'mycheckboxlist',
        templateUrl: 'Traceability-Form/field_templates/my_checkbox_list.html',
    });
    formlyConfig.setType({
        name: 'inventory_transfer_inbound_request',
        templateUrl: 'Traceability-Form/field_templates/inventory_transfer_inbound_request.html',
    });
    formlyConfig.setType({
        name: 'inbound_transfer_details',
        templateUrl: 'Traceability-Form/field_templates/inbound_transfer_details.html',
    });

    // formlyConfig.setType({
    //     name: 'inventory_details',
    //     templateUrl: 'Traceability-Form/field_templates/inventory_details.html',
    // });
    // formlyConfig.setType({
    //     name: 'plants_details',
    //     templateUrl: 'Traceability-Form/field_templates/plant_details.html',
    // });
    formlyConfig.setType({
        name: 'pn-select-inventory-item',
        templateUrl: 'Traceability-Form/field_templates/pn-select-inventory-item.html',
    });
    // formlyConfig.setType({
    //     name: 'browse_plants',
    //     templateUrl: 'Traceability-Form/field_templates/browse_plants.html',
    // });
    formlyConfig.setType({
        name: 'employee_details',
        templateUrl: 'Traceability-Form/field_templates/my_employee_details.html',
    });
    formlyConfig.setType({
        name: 'myvehicledetails',
        templateUrl: 'Traceability-Form/field_templates/my_vehicle_details.html',
    });
    formlyConfig.setType({
        name: 'pn-select-inventory',
        templateUrl: 'Traceability-Form/field_templates/pn-select-inventory.html',
    });
    formlyConfig.setType({
        name: 'pn-select3',
        templateUrl: 'Traceability-Form/field_templates/pn-select3.html',
    });
    formlyConfig.setType({
        name: 'pn-button',
        templateUrl: 'Traceability-Form/field_templates/pn-button.html',
    });
    formlyConfig.setType({
        name: 'pn-select-plants',
        templateUrl: 'Traceability-Form/field_templates/pn-select-plants.html',
    });
    formlyConfig.setType({
        name: 'pn-select',
        templateUrl: 'Traceability-Form/field_templates/pn-select.html',
    });
    formlyConfig.setType({
        name: 'pn-select-multiple',
        templateUrl: 'Traceability-Form/field_templates/pn-select-multiple.html',
    });
    formlyConfig.setType({
        name: 'plantHarvestDetails',
        templateUrl: 'Traceability-Form/field_templates/plantHarvestDetails.html',
    });
    formlyConfig.setType({
        name: 'my_multiple_quantity',
        templateUrl: 'Traceability-Form/field_templates/my_multiple_quantity.html',
    });
    formlyConfig.setType({
        name: 'my_text_area',
        templateUrl: 'Traceability-Form/field_templates/my_text_area.html',
    });
    formlyConfig.setType({
        name: 'manifest_prices',
        templateUrl: 'Traceability-Form/field_templates/pn_outbound_transfer_prices.html',
    });
    formlyConfig.setType({
        name: 'pnInputField',
        templateUrl: 'Traceability-Form/field_templates/pnInputField.html',
    });
    formlyConfig.setType({
        name: 'viewplantstable',
        templateUrl: 'Traceability-Form/tables/view-plants-table.html',
    });

    formlyConfig.setType({
        name: 'mybatchadjust',
        templateUrl: 'Traceability-Form/tables/batch-inventory-adjust.html',
    });

    formlyConfig.setType({
        name: 'mytable',
        templateUrl: 'Traceability-Form/tables/view-inventory.html',
    });
    formlyConfig.setType({
        name: 'pn-select-table',
        templateUrl: 'Traceability-Form/field_templates/pn-select-table.html',
    });
    formlyConfig.setType({
        name: 'mydashboard',
        templateUrl: 'Traceability-Form/nav/my.dashboard.grid.html',
    });

    formlyConfig.setType({
        name: 'pnInput',
        templateUrl: 'Traceability-Form/field_templates/pn-input.html',
    });

    formlyConfig.setType({
        name: 'mytaskcrud',
        templateUrl: 'Traceability-Form/nav/my.task.crud.html',
    });
    //
    // var pnSelect = "" +
    // '<ui-select ng-model="model[options.key]" class="form-control" id="myinput" theme="select2">' +
    // '<ui-select-match placeholder="{{to.placeholder}}">{{$select.selected[to.labelProp]}}</ui-select-match>' +
    // '<ui-select-choices group-by="\'category\' "data-repeat="{{to.ngOptions}}" position="down">'  +
    // '<span ng-bind-html="option[to.labelProp] | highlight: $select.search"></span>' +
    // '</ui-select-choices>' +
    // '</ui-select>';
    //
    // var myremoveslider = ""
    // // '<div ng-if="!model[options.key]"><a my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]">Select all</a></div>'
    // // '<my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]" />cat'
    // +'<rzslider rz-slider-always-show-bar="true" rz-slider-model="model[options.key]" rz-slider-floor="0" rz-slider-ceil="max"></rzslider>'
    //
    // // '<div ng-if="!!model[options.key]">{{model[options.key].length}}items selected</a></div></div>'
    // formlyConfig.setType({
    //     name: 'myremoveslider',
    //     template: myremoveslider,
    // });

    // var selectallwaste = ""
    // // '<div ng-if="!model[options.key]"><a my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]">Select all</a></div>'
    // // '<my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]" />cat'
    // +'<div ng-if="to.options.length != 1">Are you sure you want to {{to.label}} the following {{to.options.length}} items for destruction?</div>'
    // +'<ul class="list-group"><li class="list-group-item" ng-repeat="option in to.options">{{option[to.labelProp]}}</li></ul>'
    // // '<div ng-if="!!model[options.key]">{{model[options.key].length}}items selected</a></div></div>'
    // formlyConfig.setType({
    //     name: 'selectallwaste',
    //     template: selectallwaste,
    // });

    var selected_inventory_for_generate_manifest_for_request = "<center><div class='container'><div layout-padding></div><fieldset><legend>Inventory</legend><div>{{request.requester_name}}</div><div>${{listing.price}} {{listing.amount}} {{listing.strain}} {{listing.item_type}} {{listing.item_id}}</div></fieldset></div></center>"
    formlyConfig.setType({
        name: 'selected_inventory_for_generate_manifest_for_request',
        template: selected_inventory_for_generate_manifest_for_request,
    });

    var selected_recipient_for_generate_manifest_for_request = "<center><div class='container'><div layout-padding></div><fieldset><legend>Recipient</legend><div>{{request.requester_name}}</div><div>{{request.requester_address}}</div></fieldset></div></center>"
    formlyConfig.setType({
        name: 'selected_recipient_for_generate_manifest_for_request',
        template: selected_recipient_for_generate_manifest_for_request,
    });

    var mydatetime = ""
    +'<center><div class="container"><fieldset><legend>{{to.label}}</legend><input class="black-text" placeholder="{{to.placeholder}}" type="datetime-local" ng-model="model[options.key]" ng-change="dateTimeChanged()" /></fieldset></div>'
    +'</center>'


    formlyConfig.setType({
        name: 'mydatetime',
        template: mydatetime,
    });

    var mydate = ""
    +'<center><div class="container"><fieldset><legend>{{to.label}}</legend><input class="black-text" placeholder="{{to.placeholder}}" type="date" ng-model="model[options.key]" class="form-control" ></fieldset></div>'
    +'</center>'


    formlyConfig.setType({
        name: 'mydate',
        template: mydate,
    });
    // formlyConfig.setType({
    //     name: 'pn-select4',
    //     templateUrl: 'Traceability-Form/field_templates/pn-select4.html',
    // });
    formlyConfig.setType({
        name: 'pn-input',
        // extends: 'input',
        templateUrl: 'Traceability-Form/field_templates/pn-input.html'
    });
    formlyConfig.setType({
        name: 'pn-manifest-stops',
        // extends: 'input',
        templateUrl: 'Traceability-Form/field_templates/pn-manifest-stops.html'
    });
    formlyConfig.setType({
        name: 'pn-manifest-sample-stops',
        // extends: 'input',
        templateUrl: 'Traceability-Form/field_templates/pn-manifest-sample-stops.html'
    });
    //
    // formlyConfig.setType({
    //     name: 'pnInput',
    //     // extends: 'input',
    //     templateUrl: '/Traceability-Form/field_templates/pn-input.html'
    // });
    //
    formlyConfig.setType({
        name: 'myquantity',
        templateUrl: 'Traceability-Form/field_templates/pn-quantity.html'
    });
    formlyConfig.setType({
        name: 'pnAutocomplete',
        templateUrl: 'Traceability-Form/field_templates/pnAutocomplete/pnAutocomplete.html'
    });

    var myquantitywithpercent = '';
    // myquantitywithpercent += '<div class="input-group"><input placeholder="{{to.placeholder}}" ng-change="updatepercent()" type="text" ng-model="model[options.key]" class="form-control">';
    // myquantitywithpercent += '<span class="input-group-addon">g</span><span ng-show="!!percent" class="input-group-addon">({{percent}})</span></div>';
    formlyConfig.setType({
        name: 'myquantitywithpercent',
        templateUrl: 'Traceability-Form/field_templates/pn-input.html'
    });

    var types = [
        'mycheckbox',
        'pn-select',
        'pn-select-table',
        // 'pn-select-multiple',
        // 'pn-select3',
        'pnRadioGroup',

        'pnAutocomplete',
        // 'pn-select-vendor',
        'pn-select-multiple-vendors',
        'pn-manifest-stops',
        'my_multiple_quantity',
        'myquantity',
        'pn-input',  // DEPRECEATE THIS
        'mydatetime',
        'mydate',
        'pnInputField',
        'myquantitywithpercent',
        'manifest_prices'
    ]

    var validation = '<pn-field-validator><formly-transclude></formly-transclude></pn-field-validator>'
    formlyConfig.setWrapper({
        types: types, template: validation
    });


    // formlyConfig.setWrapper({
    //     types: types, templateUrl: 'Traceability-Form/field_templates/task_description.html'
    // });

    // var w = ''
    //     +'<div layout-padding><center><input-container>'
    //     +'<formly-transclude></formly-transclude>'
    //     +'</input-container></center></div>'
    // formlyConfig.setWrapper({
    //     types:
    //     [
    //         'myquantity',
    //         // 'pnInput',
    //         'pn-input',
    //         'mycheckbox',
    //
    //         // 'mymultipleselectwithselectall',
    //         // 'myquantitywithpercent',
    //         'manifest_prices',
    //
    //
    //     ],
    //     template: w
    // });


    // var g = ''
    //     +'<div class="container" layout-padding>'
    //     +'<formly-transclude></formly-transclude>'
    //     +'</div>'
    // formlyConfig.setWrapper({
    //     types:
    //     [
    //
    //         'pn-select',
    //         'pn-select-inventory-item',
    //         // 'pn-select-multiple-inventory-item',
    //         'pn-select-plants',
    //         'pn-select3',
    //         'pn-select-vendor',
    //         'my_multiple_quantity',
    //         'manifest_prices',
    //     ],
    //     template: g
    // });
});

})();
