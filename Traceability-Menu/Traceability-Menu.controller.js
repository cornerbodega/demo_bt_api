(function(){
    angular
    .module('countryApp')
    .controller('TraceabilityMenuController', TraceabilityMenuController )
    .directive('pnPathsGrid', pnPathsGrid)

    function TraceabilityMenuController($location, $scope, TraceabilityMenuNotificationsService, $routeParams) {

        // if($routeParams.sessionid) sessionStorage.sessionid = $routeParams.sessionid

        if(!sessionStorage.sessionid) $location.path('/')


    };

    function pnPathsGrid($location, TraceabilityMenuService, TraceabilityMenuNotificationsService) {
        return {
            restrict: 'E',
            templateUrl: 'Traceability-Menu/directives/pn-paths-grid.html',
            link: function($scope, element, attrs) {
                $scope.paths = TraceabilityMenuService.paths()[$location.path()]
                $scope.path = angular.copy($location.path())

                $scope.selectPath = function(path) {

                        $location.path($scope.path+'/'+path);
                }

                
                setTimeout(function () {
                    var n = TraceabilityMenuNotificationsService.getNotifications()
                    console.log(n);
                    if(_.keys(n).length > 0) {
                        console.log('Already Have!!');
                        initNotifications()
                    }
                    else {
                        TraceabilityMenuNotificationsService.init();
                    }
                }, 100)

                // $scope.$on('pnData')
                function initNotifications () {
                    var notifications = TraceabilityMenuNotificationsService.getNotifications()
                    console.log(notifications);
                    _.map($scope.paths, function(option) {
                        // console.log(notifications[option.id]);

                        // console.log(option);
                        if (notifications[option.id]) option.notificationCount = notifications[option.id]
                    })
                }

                $scope.$on('notificationsReady', initNotifications)

                // pnMenuLogger
            }
        }
    };

})();
