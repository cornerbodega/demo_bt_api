angular.module('countryApp')
.factory('pnCategories', ['pnCols', pnCategories])

function pnCategories(pnCols){
    return function() {
        return {
            // plants: {
            //     label: 'Plants',
            //     id: 'plants',
            //     icon: 'fa-lemon-o',
            //     cols: pnCols('plants')
            // },
            inventory:{
                label: 'Inventory',
                id: 'inventory',
                icon: 'fa-barcode',
                cols: pnCols('inventory')
                // rows: pnRows('inventory')
                // cols: [
                //         {id: 'strain', label: 'Strain'},
                //         {id: 'inventorytypelabel', label: 'Type'},
                //         {id: 'pnQuantitiyLabel', label: 'Amount'},
                //         {id: 'thc', label: 'THC'},
                //         {id: 'cbd', label: 'CBD'},
                //         {id: 'roomLabel', label: 'Room'},
                //         {id: 'id', label: 'ID'}
                //     ],
            },
            // { label: 'Drivers', id: 'employees', icon: 'fa-users' },
            // location: { label: 'Location', id: 'location', icon: 'fa-building-o' }
        }
    };
};
