angular.module("countryApp")
.factory("Labs", [
    'pnPost',
    '$rootScope',
    Labs,
])

function Labs(pnPost, $rootScope) {
    var _labs = {
        init: init
    };

    function init() {
        var _raw = {}
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'qa_lab', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            _labs.data = formatLabs(res.data.qa_lab);
            console.log(_labs.data);

            $rootScope.$broadcast('labs');
        })
    }

    // console.log(pnPost);


    function formatLabs(qa_lab){
        var labs = []
        _.map(qa_lab, function(e) {
            labs.push({label: e.name + ' ' + e.address1 + ' ' + e.city + ', ' + e.state + ' ' + e.zip ,  id: e.location})
        })
        return labs
    };

    return _labs;

};
