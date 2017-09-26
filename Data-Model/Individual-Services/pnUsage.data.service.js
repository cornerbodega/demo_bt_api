angular.module("countryApp")
.factory("pnUsage",
    pnUsage
)

function pnUsage(pnPost, $rootScope, pnDB, $q, pnDataBank) {
    var _usage = {
        init: init
    };

    function init() {

            return initMyUsage()

    }


    function initMyUsage() {
        return pnDB.getFromDB('select task, count(ubi) as visits from usage_log where ubi="'+sessionStorage.ubi+'" group by ubi, task')
        .then(function(res){
            console.log(res);

            // _FavoriteVendors.data =res.data

            _usage.data = res.data
            pnDataBank.data.usage = res.data
            $rootScope.$broadcast('usage', _usage.data)
        })

    }

    return _usage;

};
