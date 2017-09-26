angular.module("countryApp")
.factory("LabelCategories", LabelCategories)

function LabelCategories() {
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
        ]

    }

    return _l;

};
