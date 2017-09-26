angular.module('countryApp')
.factory('pnSelected', pnSelected)

function pnSelected(){
    return {
        selected: false
    }
};
