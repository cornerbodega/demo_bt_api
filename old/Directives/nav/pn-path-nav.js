angular.module("countryApp")
.directive('pnPathNav', function ($location, $window, TraceabilityMenuService) {
    return {
        restrict: 'EA',
        templateUrl: 'Directives/nav/pn-path-nav.html',
        link: function ($scope, element, attrs) {
            $scope.crumbs = []
            var path_array = $location.path().split('/')
            var pathstring = ''
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
                    select: function(path){ console.log('crumb nav ');$location.path(path) }
                });
                $scope.back = function(index) {
                    // console.log($scope.crumbs[index-1].path);
                    console.log(index);
                    console.log('Back!');
                    // $window.history.back()
                    if(!index) {
                        console.log('No Index');
                    }
                    $location.path($scope.crumbs[index-1].path)
                }
                // $scope.currentCrumb = _.last($scope.crumbs)
            })
        }
    }
})
