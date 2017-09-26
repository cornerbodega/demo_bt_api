angular.module('countryApp')
.controller('pnForumSubscriptionsController', pnForumSubscriptionsController)
function pnForumSubscriptionsController($scope, pnForumSubscriptionManager, $location, pnDB, pnDialog, $routeParams) {
    $scope.model = {}
    init()

    $scope.toForum = function () {
        $location.path('/forum')
    }
    $scope.saveChanges = function () {
        console.log($scope.model);
        console.log($scope.topics);
        _.map($scope.model, function (subscribed, topic_id) {
            console.log($scope.topics[topic_id]);

            var email = getUnsubscribeEmail()
            if(!subscribed)  pnForumSubscriptionManager.unSubscribeFromTopic({topic_id: topic_id, email: email})
            if(subscribed) pnForumSubscriptionManager.subscribeToTopic({topic_id: topic_id, email: email})
        })

        pnDialog.message('Changes saved successfully.')
    }

    function getUnsubscribeEmail() {
        if($routeParams.email) return $routeParams.email
        if(!sessionStorage.username) return $location.path('/log-in')
        return sessionStorage.username
    }


    function  init() {
        pnForumSubscriptionManager.getMySubscriptions({email: getUnsubscribeEmail()})
        .then(function (res) {
            $scope.topics = {}
            _.map(res.data, function (a) {
                $scope.topics[a.topic_id] = a
            })

            _.map(res.data, function (topic) {
                console.log(topic);
                if (topic.unsubscribed == 1) $scope.model[topic.topic_id] = false
                else $scope.model[topic.topic_id] = true
                // console.log(s);

            })
            var ids = _.pluck(res.data,'topic_id')
            console.log(ids);
            var inString = "("
            _.map(ids, function (id) {
                inString += '"'+id+ '"'+ ','
            })
            inString = inString.slice(0, -1)+ ')'

            console.log(inString);
            pnDB.getFromDB('select * from forumTopics where topic_id in '+inString+'')
            .then(function (res1) {
                $scope.subscriptions = res1.data

            })

        })

    }


}
