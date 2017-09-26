angular.module("countryApp")
.factory("QaSamples", [
    'pnPost',
    'Inventory',
    '$rootScope',
    QaSamples,
])

function QaSamples(pnPost, Inventory, $rootScope) {
    var _qa_samples = {
        init: init
    };

    function init() {
        var sync_check_request = {
            "API": "4.0",
            "action": "sync_check",
            "data": [
                {table: 'inventory_qa_sample',  sum: 0},
                {table: 'qa_lab', active: '1', sum: 0},
            ],
            "download": 1,
            // "active": 1,
            "sessionid": sessionStorage.sessionid
        };

        pnPost(sync_check_request)
        .then(function(res){
            _qa_samples.data = formatQaSamples(res.data.inventory_qa_sample, res.data.qa_lab);
            $rootScope.$broadcast('qa_samples');
            console.log(_qa_samples.data);
        })
    };

    function formatQaSamples(qa_samples, labs) {


        _.map(qa_samples, function(v) {
            v.id = v.inventoryid
            v.labLabel = getLabLabelForLicense(v.lab_license)
            v.typeLabel = Inventory.getTypeInfo(v.inventorytype).label
            v.resultLabel = geLabelForResult(v.result)
            v.sessiontimeLabel = gettimestring(v.sessiontime)
// Integer value that represents the result of the sample. Valid values can be -1 (fail), 0 (untested), 1 (success), 2 (rejected).
        })

        function geLabelForResult(result){
            if (result == -1) return 'Fail'
            if (result == 0) return 'Untested'
            if (result == 1) return 'Success'
            if (result == 2) return 'Rejected'
            else console.log('ERROR WHAT THE HECK KIND OF RESULT IS HAPPENING HERE?!' + result);
        }


        function getLabLabelForLicense(license) {
            return _.find(labs, {location: license}).name
        }
        return _.sortBy(qa_samples, 'sessiontime').reverse()
    }

    return _qa_samples;

};
