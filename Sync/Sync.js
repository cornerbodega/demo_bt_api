angular.module("countryApp")
.controller("SyncController",
    SyncController)


function SyncController($scope, pnDB, pnMyData) {
    console.log('Sync Controller');
    $scope.$on('save_inventory_pos', function () {
        $scope.save_inventory_pos = true
    })
    $scope.$on('inventory', function () {
        $scope.inventory_complete = true
    })
    // Delete my pos data (set stale = 1)
    var deletePos = function(){
        return pnDB.saveToDB('inventory_pos', {
            ubi:sessionStorage.ubi,
            stale: 1
        })
    }

    deletePos().then(function (res) {
        // console.log(res);
        $scope.deleted_local_data = true
        pnMyData.refreshAll()
    })

    // var refreshPnMyData.

}
