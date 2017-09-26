(function(){
    angular
    .module('countryApp')
    .controller('TraceabilityFormController',
    TraceabilityFormController )

    function TraceabilityFormController($location,
        $scope,
        TraceabilityFormService,
        TraceabilityMenuService,
        pnFormValidator,
        pnLcbFunctionExplainer,
        pnLocalStorage,
        pnDialog,
        $window,
        $location,
        pnLogger
    )
    {


        if(!sessionStorage.sessionid) {
            sessionStorage.sessionid = $location.search().sessionid
            if(sessionStorage.sessionid) console.log('Session Session Storage From URL');
            else console.log("No session and no session in URL. Exiting. ");
        }
        if(!sessionStorage.sessionid) $location.path('/')


        $scope.model = {}

        var path = $location.path();
        $scope.task = TraceabilityFormService.task(path)
        $scope.explanation = pnLcbFunctionExplainer[$scope.task];

            setTimeout(function () {
                pnLogger.logUsage({task: $scope.task})
            }, 210);

        $scope.submitButton = TraceabilityMenuService.getIconAndLabel($scope.task);

        $scope.pnFormlyModel = {};
        $scope.pnFormlyFields = TraceabilityFormService.fields(path);

        //
        // $scope.taxpayer = true
        // $scope.$on('taxpayer', function(e, p) {
        //     console.log(p);
        //     if(!p) {
        //         $scope.taxpayer = false
        //         $scope.submitDisabled = true
        //     }
        //     else {
        //         $scope.taxpayer = true
        //         console.log('ENABLED!');
        //         $scope.submitDisabled = false
        //     }
        // })
        //
        // loadFromLocalStorage({id: $scope.task})
        // function loadFromLocalStorage(params) {
        //     // console.log(pnLocalStorage.getFromLocalStorage(params));
        //     $scope.pnFormlyModel = JSON.parse($window.localStorage.getItem($scope.task));
        //
        //     // $scope.pnFormlyModel = pnLocalStorage.getFromLocalStorage(params)
        //     // console.log($scope.pnFormlyModel);
        // }
        // $scope.save = function () {
        //     pnLocalStorage.saveToLocalStorage({id: $scope.task, data: $scope.pnFormlyModel})
        //     .then(function () {
        //         pnDialog.message('Form Progress Saved. No data has been submitted to the WSLCB.')
        //     })
        // }

        $scope.submit = function($event) {
            $scope.pnSubmit($event);
        }

        $scope.pnSubmit = function($event) {
            if(sessionStorage.username === 'demo@abctraceability.com') {
                return pnDialog.message('(Function disabled for demo)')
            }
            console.log($scope.pnFormlyModel);
            var valid = pnFormValidator.validate($scope.task, $scope.pnFormlyFields, $scope.pnFormlyModel)
            if(valid) {
                TraceabilityFormService.onSubmit($event, path, $scope.pnFormlyModel, $scope.pnFormlyFields)
            } else {
                console.log('INVALID!');
                $scope.errors = pnFormValidator.errors;
            };
        };



    };


})();
