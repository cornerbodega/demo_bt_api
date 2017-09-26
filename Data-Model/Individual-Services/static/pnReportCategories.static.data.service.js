angular.module("countryApp")
.factory("pnReportCategories", pnReportCategories)

function pnReportCategories() {
    var _l = {
        init: init
    };

    init();

    function init() {
        _l.data = [
            {
                id: 'inventory',
                label: 'Inventory'
            },
            {
                id: 'plants',
                label: 'Plants'
            },
            {
                id: 'outbound_transfers',
                label: 'Outbound Transfers'
            },
            {
                id: 'inbound_transfers',
                label: 'Inbound Transfers'
            },

        ]

    }

    return _l;

};
