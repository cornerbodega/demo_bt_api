angular.module('countryApp')
.directive('pnTaskDescription', pnTaskDescription)

function pnTaskDescription(UserManualService) {
    return {
        restrict: 'E',
        // transclude: true,
        scope: {},
        template: '<div class="container"><div >{{task_description}}</div></div>',
        link: function ($scope, elem, attrs) {
            console.log('tasks!!');
            // console.log(attrs);
            console.log(attrs);
            var fieldkey = attrs.fieldkey
            // console.log(task);
            $scope.taskMap = {}
console.log('132313');
            var all = UserManualService()
            _.map(all, function(chapter){
                _.map(chapter.tasks, function(task){
                    if (!fieldkey === task) return
                    _.map(task.paragraphs, function(paragraph){
                        $scope.taskMap[paragraph.id] = paragraph.text
                        // console.log(paragraph.id);
                        // console.log(fieldkey);
                        // console.log(paragraph.id === task);
                        // if(paragraph.id === task) $scope.task_description = paragraph.text
                    })
                })
            })
            console.log($scope.taskMap);
            $scope.task_description = $scope.taskMap[fieldkey]
        }
    }
}
