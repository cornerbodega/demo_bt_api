angular.module("countryApp")
.factory("pnPost", [
    '$http',
    pnPost
])

function pnPost($http) {
    function _pnPost(request) {
        if (sessionStorage.sessionid) request.sessionid = sessionStorage.sessionid;
        request.API = "4.0";

        var r = function(){
            // console.log('PN POST!');
            return $http({
                method: 'POST',
                url: 'Connect-Service/action.php',
                data: {
                    request: request
                },
                datatype: 'json',
            });
        }
        function pnTry(){
            try {
                return r().then(function (res) {
                    console.log(res);
                    console.log(typeof res.data);
                    if(typeof res.data==='string') {
                        // if(res.data.startsWith('cURL Error #:Operation timed out after 30000')) {
                            console.log('Erorr! ' + res.data);
                            pnTry()
                        // }
                    }
                     return res
                })

            } catch(e) {
                console.log('pnPost ERROR! ' + e + ' trying again...');
                pnTry()
            }
        }

        return pnTry()
    }
    return _pnPost

}
