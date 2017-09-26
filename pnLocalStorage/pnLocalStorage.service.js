angular.module('countryApp')
.factory('pnLocalStorage', pnLocalStorage)

function pnLocalStorage($window) {
    var _p = {
        saveToLocalStorage: saveToLocalStorage,
        getFromLocalStorage: getFromLocalStorage
    }

    function saveToLocalStorage(params) {
        console.log(params);
        $window.localStorage.setItem(params.id, JSON.stringify(params.data))
        console.log($window.localStorage.getItem(params.id));

        return Promise.resolve('')
    }
    function getFromLocalStorage(params) {
        if (JSON.parse($window.localStorage.getItem(params.id))) console.log(JSON.parse($window.localStorage.getItem(params.id)));
        // console.log(JSON.parse($window.localStorage.getItem(params.id)));
        // log
        return JSON.parse($window.localStorage.getItem(params.id))
    }


    return _p
}
