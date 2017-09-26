angular.module('countryApp')
.controller('LogInController',
    LogInController)

    function LogInController($scope, $location, $window, vendors, Vendors, pnPost) {
        console.log(vendors);
        $scope.toLogIn = function () {
            // $location.path('')
        };
        // if (Vendors.data) init();
        // else Vendors.init();
// REMEMBER WHO I AM!!!!!!!!!!!!!!!!!!!!!!!! (based on email)
        $scope.$on('vendors', init);
        function init() {
            // console.log();
            $scope.vendors = Vendors.data
            _.map($scope.vendors, function(v){
                if (!v.label) console.log('NO LABEL FOR ' );
                if (!v.label) console.log(v);
                // v.name = v.label;


            })
        }
        $scope.terms = true
        $scope.model = {};
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

        $scope.querySearch = function(query) {
            // console.log(query);
            if (!$scope.vendors) return []
            return _.map($scope.vendors.filter(createFilterFor(query)),function(vendor){return {name: vendor.name, ubi: vendor.ubi}})
            // return ""
        }
        function createFilterFor(query) {
            var lowercaseQuery = angular.uppercase(query);
            return function filterFn(vendor) {
                // console.log(vendor);
                // console.log(vendor);
                // console.log(lowercaseQuery);
                vendor.name = angular.uppercase(vendor.name)
                return (vendor.name.indexOf(lowercaseQuery) !== -1);
            };
        }
        $scope.selectedItemChange = function(vendor) {
            if(vendor) $scope.model.license_number = vendor.ubi
            else $scope.model.license_number = false
            console.log($scope.model);


        };
        $scope.searchText = "";
        // $scope.associateCredentials = function() {
        //     // console.log($scope.model);
        //     pnLcbRequestService('login', $scope.model).then(handleLCBResponse)
        //     // tryToLogInToLCB().then(handleLCBResponse)
        // }
        $scope.openTerms = function(){
            // $location.path('/terms');
            $window.open('https://abctraceability.potnet.net/wa/#/terms', '_blank');
        }
        $scope.toggleTerms = function(){
            $scope.terms =  !$scope.terms
        }
        $scope.logIn = function() {
            $scope.model.action = "login";
            pnPost($scope.model).then(handleLCBResponse)
        }

        function handleLCBResponse(res) {
                console.log(res);

            if(res.data.success===1) {
                console.log('LCB Login Successful');
                $scope.error = false;
                sessionStorage.sessionid = res.data.sessionid;
                sessionStorage.ubi = $scope.model.license_number;
                //
                toTraceability();
                // saveUser().then(toTraceability);
                //
                // function saveUser() {
                //     // if (!)
                //     sessionStorage.user_id = $scope.user_data.user_id
                //     $scope.model.user_id = $scope.user_data.user_id;
                //     $scope.model.name = $scope.user_data.name;
                //     return pnDB.saveUser($scope.model)
                // };
                //
                function toTraceability() {
                    // sessionStorage.refresh = true

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
        // };

        // function pnLcbRequestService(pnPost) {
        //     return function(action, model) {
        //         model.action = action
        //         console.log(model);
        //         return pnPost(model)
        //     }
        // }


    };
