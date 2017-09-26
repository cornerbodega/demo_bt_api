angular.module('countryApp')
.controller('pnForumDraftController', pnForumDraftController)

function pnForumDraftController($scope, $location, $routeParams, pnForumCategories, pnDB, pnLoginRouter, pnForumSubscriptionManager) {
    if (!sessionStorage.sessionid) {
        pnLoginRouter.data.forum = $location.path()
        $location.path('/log-in')
    }
    $scope.myFullName = sessionStorage.myFullName
    $scope.myCompanyName = sessionStorage.myName
    $scope.category = _.findWhere(pnForumCategories.data, {id:  $routeParams.topic_category})
    $scope.toForum = function () {
        $location.path('/forum')
    }
    $scope.toForumCategory = function (category) {
        console.log(category);
        $location.path('/forum/'+category.id)
    }
    $scope.post = function () {
        if (!$scope.newPost) return console.log('No Message. Exiting.');
        if (!$scope.subject) return console.log('No Message. Exiting.');


        var id = makeid()
        var topic = {
            topic_id: id,
            topic_category: $scope.category.id,
            subject: $scope.subject,
            userFullName: sessionStorage.myFullName,
            username: sessionStorage.username,
            companyName: sessionStorage.myName,
            at: Date.now()
        }
        if($scope.subscribe) pnForumSubscriptionManager.subscribeToMyPost({topic_id: id, email: sessionStorage.username})
        pnDB.saveToDB('forumTopics', topic).then(function () {
            pnDB.saveToDB('forumPosts', {
                    topic_id: topic.topic_id,
                    content: $scope.newPost,
                    at: Date.now()/1000,
                    // atTimeString: new Date(this.at).toLocaleString(),
                    atLabel: new Date(Date.now()).toLocaleString(),
                    topic_category: $scope.category.id,
                    userFullName: sessionStorage.myFullName,
                    user_email: sessionStorage.username,
                    companyName: sessionStorage.myName

            })
        }).then(function () {
            // Subscriptions stuff HERE
            console.log('Subscriptions Placeholder!');
            $location.path('/forum/topic/'+$scope.category.id+'/'+topic.topic_id)

        })

    }
}
