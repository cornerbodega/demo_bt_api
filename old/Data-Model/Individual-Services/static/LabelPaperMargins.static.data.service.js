angular.module("countryApp")
.factory("LabelPaperMargins", LabelPaperMargins)

function LabelPaperMargins() {
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
                id: 'plant',
                label: 'Plants'
            },
        ]

    }

    return _l;

};
