angular.module("countryApp")
.factory("pnDataBank", pnDataBank )

function pnDataBank() {

    var _pnDataBank = {
        data:                   {},

    };
    return _pnDataBank

}
