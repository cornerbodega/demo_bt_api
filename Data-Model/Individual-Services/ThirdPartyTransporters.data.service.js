angular.module("countryApp")
.factory("ThirdPartyTransporters", [
    'pnPost',
    '$rootScope',
    ThirdPartyTransporters,
])

function ThirdPartyTransporters(pnPost, $rootScope) {
    var _thirdPartyTransporters = {
        init: init
    };

    function init() {
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_third_party_transporter",
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            console.log(res);
            _thirdPartyTransporters.data = formatThirdPartyTransporters(res.data.third_party_transporter);
            $rootScope.$broadcast('thirdPartyTransporters');
            console.log(_thirdPartyTransporters.data);
        })
    };

    function formatThirdPartyTransporters(thirdPartyTransporters) {

        console.log(thirdPartyTransporters);
        return thirdPartyTransporters
    }

    return _thirdPartyTransporters;

};
