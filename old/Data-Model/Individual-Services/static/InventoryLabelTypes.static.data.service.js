angular.module("countryApp")
.factory("InventoryLabelTypes", InventoryLabelTypes)

function InventoryLabelTypes() {
    var _inventoryLabelTypes = {
        init: init
    };

    init();

    function init() {
        _inventoryLabelTypes.data = [
            {
                id: 'type_1',
                label: 'Type One'
            }
        ]

    }

    return _inventoryLabelTypes;

};
