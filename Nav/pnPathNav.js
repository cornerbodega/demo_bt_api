angular.module("countryApp")
.directive('pnPathNav', function ($location, $window, TraceabilityMenuService) {
    return {
        restrict: 'EA',
        templateUrl: 'Nav/pn-path-nav.html',
        link: function ($scope, element, attrs) {
            $scope.crumbs = [];
            var path_array = $location.path().split('/');
            var pathstring = '';
            path_array.map(function(pathpart, index){
                if (index > 0)  pathstring += '/'
                pathstring += pathpart
                //console.log(pathpart);
                var iconAndLabel = TraceabilityMenuService.getIconAndLabel(pathpart)
                if (!pathpart) return
                if (!iconAndLabel) return console.log('Error! no Icon And Label for' + pathpart);
                var icon = iconAndLabel.icon
                var label = iconAndLabel.label
                var img = iconAndLabel.img
                // console.log(iconAndLabel);
                $scope.crumbs.push({
                    label: label,
                    path: pathstring,
                    icon: icon,
                    img: img,
                    // select: function(path){ console.log('crumb nav ');$location.path(path) }
                });
                $scope.toMyProfile = function() {

                }
                $scope.toSettings = function ( ){
                    $location.path('/traceability/settings')
                }
                $scope.back = function(index) {
                    // console.log($scope.crumbs[index-1].path);
                    // console.log(index);
                    // console.log('Back!');
                    // $window.history.back()
                    if(!index) {
                        console.log('No Index');
                    }

                    // if (_.contains(['/traceability/settings/billing/new_client', '/traceability/settings/billing/my_membership'], $location.path())) {
                    //     return $location.path($scope.crumbs[index-2].path)
                    // }
                    $location.path($scope.crumbs[index-1].path)
                }

                //  $scope.pnCoolText = coolText("Potnet")
                //  function coolText(string, color, size) {
                //   return '%c' + string, 'font-size:'+ (size || '100') + 'px;color:'+ (color || '#fff') + ';text-shadow:0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px  0 #aaa, 0 6px 0 rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);'
                //  }
                // $scope.currentCrumb = _.last($scope.crumbs)
            })
        }
    }
})
