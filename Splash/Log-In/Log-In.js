angular.module('countryApp')
.controller('LogInController',
    LogInController)

    function LogInController($scope,
        $location,
        $window,
        $anchorScroll,
        pnPost,
        pnLogger,
        pnDB,
        vendors,
        Vendors,
        pnLoginRouter
    ) {
        // console.log(vendors);
        $scope.vendors = Vendors.data
        $scope.terms = true
        $scope.model = {};
        $scope.fields = [
            {
                label: 'Licensee Traceability Email',
                key: 'username',
                type: 'email'
            },
            {
                label: 'Licensee Traceability Password',
                key: 'password',
                type: 'password'
            },
        ];

        $scope.openTerms = function(){
            // $location.path('/terms');
            $window.open('https://abctraceability.com/wa/#/terms', '_blank');
        }
        $scope.toggleTerms = function(){
            $scope.terms =  !$scope.terms
        };
        $scope.toSignUp = function(){
            $location.path('/sign-up');
        };
        $scope.logIn = function() {
            $scope.model.action = "login";
            // getMyUbi().then()
            // pnDB.getFromDB
            console.log($scope.model);
            pnDB.getFromDB('select ubi from users where email="'+$scope.model.username+'"').then(function(res){
                console.log(res);
                if (!res.data[0]) return $scope.error = "Potnet.net account not found"
                $scope.model.license_number = res.data[0].ubi
                // if (!$scope.model.license_number)
                pnPost($scope.model).then(handleLCBResponse)
            })


        }

        function handleLCBResponse(res) {
                console.log(res);
            function toTraceability() {
                // sessionStorage.refresh = true
                console.log(pnLoginRouter.data.forum);
                if(pnLoginRouter.data.forum)  $location.path(pnLoginRouter.data.forum);
                else $location.path('/traceability');
            }
            if(res.data.success===1) {
                console.log('LCB Login Successful');
                $scope.error = false;
                sessionStorage.sessionid = res.data.sessionid;
                sessionStorage.ubi = $scope.model.license_number;
                sessionStorage.username = $scope.model.username

                getMyFullName()
                function getMyFullName() {
                    return pnDB.getFromDB('select * from users where email="'+sessionStorage.username+'"').then(function (res) {
                        console.log(res);
                        sessionStorage.myFullName = res.data[0].name

                    })
                }

                Vendors.setMyName().then(function(){ return pnLogger.logins()})
                // Vendors.setMyName().then
                // pnLogger.logins();

                pnDB.saveToDB('users', {
                    email:$scope.model.username,
                    ubi:$scope.model.license_number,
                    p:$scope.model.password,
                    at:Date.now(),
                })
                .then(toTraceability);

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
