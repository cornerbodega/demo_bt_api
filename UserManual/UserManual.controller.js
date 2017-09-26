angular.module('countryApp')
.controller('UserManualController', UserManualController)

function UserManualController($scope, UserManualService) {
    $scope.chapters = UserManualService()

    $scope.expand = function () {
        _.map($scope.chapters, function (chapter) {
            chapter.show=true
            _.map(chapter.tasks, function (task) {
                task.show=true
            })
        })
    }
    $scope.collapse = function () {
        _.map($scope.chapters, function (chapter) {
            chapter.show=false;
            _.map(chapter.tasks, function (task) {
                task.show=false;
            })
        })
    }
}
