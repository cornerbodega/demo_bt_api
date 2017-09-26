angular.module("countryApp")
.factory("pnMyData", pnMyData )

function pnMyData(
    Inventory,
    Plants,
    PlantRooms,
    InventoryRooms,
    Labs,
    Manifests,
    Employees,
    Vehicles,
    Vendors,
    FavoriteVendors,
    QaSamples,
    ThirdPartyTransporters,
    OutboundTransfers,
    OutboundTransferReturns,
    InboundTransfers,
    ManifestRequests,
    WtsListings,
    Timesheet,
    MyTimesheet,
    pnInventoryTypes,
    LabelCategories,
    MyLabels,
    PageTemplates,
    LabelTemplates,
    pnReportCategories,
    pnInventoryChartTypes,
    pnPlantsChartTypes,
    pnOutboundTransfersChartTypes,
    pnInboundTransfersChartTypes,
    pnUsage

    ) {

    var _pnMyData = {
        inventory:                  function() { return Inventory },
        plants:                     function() { return Plants },
        plant_rooms:                function() { return PlantRooms },
        inventory_rooms:            function() { return InventoryRooms },
        labs:                       function() { return Labs },
        manifests:                  function() { return Manifests },
        employees:                  function() { return Employees },
        vehicles:                   function() { return Vehicles },
        manifests:                  function() { return Manifests },
        inventory_manifest_void:    function() { return Manifests },
        vendors:                    function() { return Vendors },
        favorite_vendors:           function() { return FavoriteVendors },
        myLocation:                 function() { return Vendors },
        qa_samples:                 function() { return QaSamples },
        thirdPartyTransporters:     function() { return ThirdPartyTransporters; },
        outbound_transfers:         function() { return OutboundTransfers },
        inventory_transfer_outbound_return:  function() { return OutboundTransferReturns },
        inbound_transfers:          function() { return InboundTransfers },
        manifest_requests:          function() { return ManifestRequests },
        wts_listings:               function() { return WtsListings },
        timesheet:                  function() { return Timesheet },
        my_timesheet:               function() { return MyTimesheet },
        page_template:                  function() { return PageTemplates },
        label_template:                 function() { return LabelTemplates },
        label_category:                 function() { return LabelCategories },
        my_label:                       function() { return MyLabels },
        invtype:                        function() { return pnInventoryTypes },
        inventory_chart_type:           function() { return pnInventoryChartTypes },
        plants_chart_type:              function() { return pnPlantsChartTypes },
        outbound_transfers_chart_type:  function() { return pnOutboundTransfersChartTypes },
        inbound_transfers_chart_type:   function() { return pnInboundTransfersChartTypes },
        report_category:                function() { return pnReportCategories },
        usage:                          function() { return pnUsage },



        refresh:                function(pnDatagory) {
                                    console.log('Attempting to refresh: ' + pnDatagory);
                                    if (!_pnMyData[pnDatagory]) return console.log('No pnMyData[pnDatagoory] for '+ pnDatagory);
                                    return _pnMyData[pnDatagory]().init();
                                },
        refreshAll:             function() {
                                    var datagories = [
                                        'inventory',
                                        'plants',
                                        // 'labs',
                                        'manifests',
                                        'employees',
                                        'vehicles',
                                        'plant_rooms',
                                        'inventory_rooms',
                                        'qa_samples',
                                        'inventory_transfer_outbound_return',
                                        // 'vendors',
                                    ]
                                    _.map(datagories, function(d) {
                                        // console.log(this[d]);
                                        _pnMyData[d]().init();
                                    })
                                },

    };
    return _pnMyData

}
