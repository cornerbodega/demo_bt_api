angular.module("countryApp").factory("pnProxy", ['$http', pnProxy])

function pnProxy($http, $location) {
    return function(url, data) {
        console.log(url);
        console.log(data);
        return $http({
            method: 'POST',
            url: 'Data-Model/php/pnProxy.php',
            data: {
                url: url,
                data: data
            },
            datatype: 'json'
        }).then(function(res){
            
            console.log(res); return res
        });
    }
}
