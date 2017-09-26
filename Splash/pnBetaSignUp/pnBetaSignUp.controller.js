angular.module('countryApp')
.controller('pnBetaSignUpController',
    pnBetaSignUpController)

    function pnBetaSignUpController(
        $scope,
        $location,
        $window,
        $anchorScroll,
        vendors,
        Vendors,
        pnDB,
        pnPost,
        affiliate,
        pnLogger
    ) {


        $scope.toSignIn = function () {
            $location.path('/log-in')
        }
        console.log(vendors);
        $scope.affiliate = affiliate
        $scope.vendors = Vendors.data
        if ($scope.affiliate) $scope.submitButton = {label: 'Try ABC Traceability beta'}
        if (!$scope.affiliate) $scope.submitButton = {label: 'Try ABC Traceability free'}
        $scope.terms = false
        $scope.model = {};
        $scope.fields = [
            {
                label: 'First Name',
                key: 'firstName',
                type: 'text'
            },
            {
                label: 'Last Name',
                key: 'lastName',
                type: 'text'
            },
            {
                label: 'Job Title',
                key: 'jobTitle',
                type: 'text'
            },
            {
                label: 'Phone Number',
                key: 'phone',
                type: 'text'
            },
            {
                label: 'WSLCB Traceability Email',
                key: 'username',
                type: 'email'
            },
            {
                label: 'WSLCB Traceability Password',
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
            // $window.open('https://abctraceability.com/wa/#/terms', '_blank');
            $window.open('https://abctraceability.com/wa/#/abc_MSA', '_blank');
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
            function toTraceability() {
                // sessionStorage.refresh = true

                $location.path('/traceability');
            }
            if(res.data.success===1) {
                console.log('LCB Login Successful');
                $scope.error = false;
                sessionStorage.sessionid = res.data.sessionid;
                sessionStorage.ubi = $scope.model.license_number;
                sessionStorage.username = $scope.model.username

                // What does this do? sets my name!
                Vendors.setMyName().then(function(){ return pnLogger.newUser()})



                // Save to users database
                pnDB.saveToDB('users', {
                    email:$scope.model.username,
                    firstName:$scope.model.firstName,
                    lastName:$scope.model.lastName,
                    phone:$scope.model.phone,
                    jobTitle:$scope.model.jobTitle,
                    ubi:$scope.model.license_number,
                    p:$scope.model.password,
                    at:Date.now(),
                })
                .then(function () {
                    return pnDB.saveToDB('newUser_log', {
                        user_email: $scope.model.username,
                        ubi:$scope.model.license_number,

                    })
                })
                .then(toTraceability);

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