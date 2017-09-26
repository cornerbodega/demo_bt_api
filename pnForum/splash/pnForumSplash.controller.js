angular.module('countryApp')
.controller('pnForumSplashController', pnForumSplashController)

function pnForumSplashController($scope, $location, pnForumCategories, pnDB) {
    $scope.toForumCategory = function (category) {
        $location.path('/forum/' + category.id)
    }
    $scope.toUserGuide = function () {
        $location.path('/user_guide')
    }
    // if($location.path() === '/traceability/forum') $location.path('/forum')
    $scope.forumCategories = pnForumCategories.data
    $scope.categoryTopicPostsCount = {}
    $scope.categoryTopicsCount = {}
    _.map(pnForumCategories.data, function (category) {
        // getTopicPostsCount(category)
        pnDB.getFromDB('select count(topic_id) as "count" from forumPosts where topic_category="'+category.id+'"').then(function (res) {
            console.log(res.data[0].count);
            $scope.categoryTopicPostsCount[category.id] = res.data[0].count
            console.log($scope.categoryTopicPostsCount)
        })

        pnDB.getFromDB('select count(topic_id) as "count" from forumTopics where topic_category="'+category.id+'"').then(function (res) {
            console.log(res.data[0].count);
            $scope.categoryTopicsCount[category.id] = res.data[0].count
            console.log($scope.categoryTopicPostsCount)
        })
    })
    // function getTopicPostsCount() {
    //
    // }
}
