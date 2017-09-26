angular.module("countryApp").controller("LandmazonController",
['$scope', 'pnDB', LandmazonController])
.controller("LandmazonLoginSuccessfulController",
['$scope', '$location', 'pnProxy', 'pnDB', 'pnLcbRequestService', LandmazonLoginSuccessfulController])
.controller("AssociateCredentialsController",
['$scope','$window', '$location','pnDB', 'pnLcbRequestService', AssociateCredentialsController])
.factory ("pnLcbRequestService", ['pnPost', pnLcbRequestService])
function LandmazonController($scope, $location) {
    console.log('LANDMAZON!');
    $scope.landmazonLoginButtonOnClick = function() {
        console.log('CLICKED');
        options = { scope : 'profile' };
        amazon.Login.authorize(options, 'https://potnet.net/wa/#/landmazon-login-successful');
        return false;
    };
}

function LandmazonLoginSuccessfulController($scope, $location, pnProxy, pnDB, pnLcbRequestService) {
    // https://potnet.net/wa/#/landmazon-login-successful?access_token=Atza%7CIwEBIMDqsgw5Kn9gt4na64OAnir29BdlgYsWWQc-7i1bCO9XNxPIxGDf7jxdYJU2kp5Yl19qupyFqukmTGcwOImFsccmtAtZW4SJh_zL_yBIXPIrKOBHkEXexCa1JIRFWdI58AGg1NOd7xOo8rh6EMgKKkA5YBo0eVTwA_kaYOgM6LY0LJivkhhewxL8YClyOs8eYNURFUUxVVUy4VbYYd9RolShMmm4mXOvJvfv_TglEeLVA8DyaV5vZKpDSNIKhLfVb_LVKyXhJ-c5JzToVXzHUXfIWofImg9DfvneFl-m3uZ6fvoHNSWXKUuZJuEipsdUc7A1_swxQ3En48zVawtH3L_fP4YU4WAhZXAEvwU4PrrIbuy4JEGFXIRpgU1M-kVB0Kv3OoIAJNx7F5VVnzZn_sWzbXIe0tZzgpGeKAqUlp266tz6uv7eA68R3F95K5HHiTtTL9_LRnMG0BsNVI6lsDBzKT6ceWrkH_raoNRsz13_lwfgVi_ySdFo6MEoj_lLAOTOIyJUuSnl7E5gorqU1A8M&token_type=bearer&expires_in=3600&scope=profile
    console.log($location.search());
    $scope.amazon_auth = $location.search();

    if ($scope.amazon_auth.error) return $location.path('/')
    var access_token = $scope.amazon_auth.access_token;
    getUserInfoFromAmazon()
    .then(setAmazonUserData)
    .then(checkIfExistingUser)

    function getUserInfoFromAmazon() {
        return pnProxy('https://potnet.net/wa/Landmazon/landmazon_get_user_info_from_amazon.php',
        {access_token: access_token})
    }

    function checkIfExistingUser(user_data) {
        console.log(user_data.user_id);
        pnDB.getUserByID(user_data).then(function(user_res){
            console.log(user_res);
            console.log(user_res.data[0]);
            if (user_res.data.length === 0) {
                //user is new! needs to be prompted for traceability info and saved to db
                //
                $location.path('/landmazon/associate_traceability_credentials')
            }
             else {
                var model = user_res.data[0];
                var req = {
                    username: model.email,
                    password: model.password,
                    license_number: model.ubi,
                }

                pnLcbRequestService('login', req).then(handleLCBResponse)
                function handleLCBResponse(res) {
                    console.log(res);

                    if(res.data.success===1) {
                        console.log('LCB Login Successful');
                        sessionStorage.sessionid = res.data.sessionid;
                        sessionStorage.ubi = model.ubi;
                        $location.path('/traceability');

                    } else {
                        return $location.path('/landmazon/associate_traceability_credentials')

                        // console.log('ERORR!! ' + res.data.error);
                        // return $scope.error = res.data.error
                    }
                }
                // log in with traceability credentails and receive sessionid.
                // if we can't log in to lcb, send to tracebailty credentials screen
            }
        })
    }

    function setAmazonUserData(res){
         sessionStorage.user_data = JSON.stringify(res.data);
         console.log(sessionStorage.user_data);
         return res.data
    };
};

function AssociateCredentialsController($scope, $window, $location, pnDB, pnLcbRequestService) {
    if(!sessionStorage.user_data) $location.path('/')
    console.log(sessionStorage.user_data);
    $scope.user_data = JSON.parse(sessionStorage.user_data);
    console.log($scope.user_data);

    $scope.model = {}
    $scope.fields = [
        {
            label: 'Username',
            key: 'username',
            type: 'email'
        },
        {
            label: 'Password',
            key: 'password',
            type: 'password'
        },
        // {
        //     label: 'UBI',
        //     key: 'license_number',
        //     type: 'text'
        // },

    ];
    // if(pnData.data.vendors) $scope.vendors = pnData.data.vendors
    // if($scope.vendors.length >  0) $scope.pnData = true;
    // pnDB.getBusinesses().then(init)

    pnDB.getPreLoginPos().then(function(res){
        console.log('save this pos!');
        console.log(res);
        if(!res.data[0]) return console.log('OH NO! NO PRE LOGIN POS!');

        // console.log(JSON.parse(res.data[0].data).vendors);
        var v = []
        // console.log(JSON.parse(res.data[0].data).vendors);
        _.map(JSON.parse(res.data[0].data).vendors, function(vendor){
            vendor.address = vendor.address1
            if (vendor.address2) vendor.address += " " + vendor.address2
            v.push({name: vendor.name + ' '+vendor.address+ ' '+vendor.city+ ' '+vendor.ubi, ubi: vendor.ubi});
        })
        $scope.vendors = v
    })
    function init(res) {
        var businesses =  JSON.parse(res.data[0].data)
        console.log(businesses);
        $scope.vendors = businesses
    }
    $scope.querySearch = function(query) {
        // console.log(query);

        return _.map($scope.vendors.filter(createFilterFor(query)),function(vendor){return {name: vendor.name, ubi: vendor.ubi}})
        // return ""
    }
    function createFilterFor(query) {
        var lowercaseQuery = angular.uppercase(query);
        return function filterFn(vendor) {
            // console.log(vendor);
            // console.log(lowercaseQuery);
            return (vendor.name.indexOf(lowercaseQuery) !== -1);
        };
    }
    $scope.selectedItemChange = function(vendor) {
        if(vendor) $scope.model.license_number = vendor.ubi
        else $scope.model.license_number = false
        console.log($scope.model);

        // $scope.select(vendor)
    }
    $scope.searchText = ""
    // $scope.$on('pnData', function(){
    //     console.log(pnData.data.vendors);
    //     $scope.vendors = pnData.data.vendors
    //     $scope.pnData = true;
    // })




    $scope.associateCredentials = function() {
        // console.log($scope.model);
        pnLcbRequestService('login', $scope.model).then(handleLCBResponse)
        // tryToLogInToLCB().then(handleLCBResponse)
    }
    $scope.openTerms = function(){
        // $location.path('/terms');
        $window.open('https://potnet.net/wa/#/terms', '_blank');
    }
    function handleLCBResponse(res) {
        console.log(res);
        if(res.data.success===1) {
            console.log('LCB Login Successful');
            $scope.error = false;
            sessionStorage.sessionid = res.data.sessionid;
            sessionStorage.ubi = $scope.model.license_number;

            saveUser().then(toTraceability);

            function saveUser() {
                // if (!)
                sessionStorage.user_id = $scope.user_data.user_id
                $scope.model.user_id = $scope.user_data.user_id;
                $scope.model.name = $scope.user_data.name;
                return pnDB.saveUser($scope.model)
            };

            function toTraceability() {
                sessionStorage.refresh = true
                $location.path('/traceability');
            }

        } else {
            console.log('ERORR!! ');
            return $scope.error = res.data.error
        }
    }
    // function tryToLogInToLCB(model) {
    //     model.action = "login"
    //     return pnPost(model)
    // }
};

function pnLcbRequestService(pnPost) {
    return function(action, model) {
        model.action = action
        console.log(model);
        return pnPost(model)
    }
}
