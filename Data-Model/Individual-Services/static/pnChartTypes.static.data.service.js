angular.module('countryApp')
// .factory('pnChartTypes', pnChartTypes)
.factory('pnInventoryChartTypes',           pnInventoryChartTypes)
.factory('pnPlantsChartTypes',              pnPlantsChartTypes)
.factory('pnOutboundTransfersChartTypes',   pnOutboundTransfersChartTypes)
.factory('pnInboundTransfersChartTypes',    pnInboundTransfersChartTypes)


function pnOutboundTransfersChartTypes($rootScope) {
    var _pnChartTypes = {
        init: init,
        data:    [
            {
                id: 'outbound_transfers_by_vendor',
                label: 'Outbound Transfers by Vendor (by $)',
                report_category: 'outbound_transfers'
            }
        ]

    }
    function init() {

    }
    return _pnChartTypes
}


function pnPlantsChartTypes($rootScope) {
    var _pnChartTypes = {
        init: init,
        data:   [
            {
                id: 'plants_by_strain',
                label: 'Plants By Strain',
                report_category: 'plants'
            },

        ]

    }
    function init() {

    }
    return _pnChartTypes
}


function pnInventoryChartTypes($rootScope) {
    var _pnChartTypes = {
        init: init,
        data:    [
            {
                id: 'inventory_by_strain',
                label: 'Inventory By Strain',
                report_category: 'inventory'
            },
            {
                id: 'inventory_by_type',
                label: 'Inventory By Type',
                report_category: 'inventory'
            },
        ]
    }
    function init() {

    }
    return _pnChartTypes
}

function pnInboundTransfersChartTypes($rootScope) {
    var _pnChartTypes = {
        init: init,
        data:    [
            {
                id: 'inbound_transfers_by_vendor',
                label: 'Inbound Transfers by Vendor (by $)',
                report_category: 'inbound_transfers'
            }
        ]

    }
    function init() {

    }
    return _pnChartTypes
}
