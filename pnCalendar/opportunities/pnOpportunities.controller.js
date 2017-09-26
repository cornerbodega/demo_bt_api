angular.module('countryApp')
.controller('pnOpportunitiesController', pnOpportunitiesController)

function pnOpportunitiesController($scope, pnDB) {


    // pnDB.getFromDB('select * from prospects_master')
    // .then(function (res) {
    //     var data = res.data
    //     var csvContent = "data:text/csv;charset=utf-8,";
    //     data.forEach(function(infoArray, index){
    //         console.log(infoArray );
    //         dataString = infoArray.join(",");
    //         csvContent += index < data.length ? dataString+ "\n" : dataString;
    //
    //     })
    //     var encodedUri = encodeURI(csvContent);
    //     window.open(encodedUri);
    // })


}
