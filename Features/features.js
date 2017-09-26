angular.module('countryApp')
.controller('FeaturesController', FeaturesController)

function FeaturesController($scope, $location, TraceabilityMenuService, TraceabilityFormService) {
    console.log('Features');
    $scope.tasks = {};

    $scope.goTo=function(path){
        console.log(path);
        $location.path(path)
    }

    // $scope.getIconAndLabel = function() {
        _.map(TraceabilityMenuService.paths(), function(features, path) {
            console.log(path);
            var task = TraceabilityFormService.task(path)
            taskObj = TraceabilityMenuService.getIconAndLabel(task)
            console.log(taskObj);

            if (!!taskObj) $scope.tasks[task] = {
                icon: taskObj.icon,
                label: taskObj.label,
                id: task,
                path: path,
                features: features}
            //  = taskObj
            // paths.push({ path: path, features: features})
        })
    // }
}
