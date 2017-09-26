angular.module('countryApp')
.controller('pnForumTopicsController', pnForumTopicsController)

function pnForumTopicsController($scope, $location, pnForumCategories, pnDB) {
    var p = $location.path().split('/')
    // console.log(p);
    var c = p[p.length-1]
    $scope.category = _.findWhere(pnForumCategories.data, {id: c})



    // getTopic
    $scope.toDraft = function () {
        $location.path('/forum/'+$scope.category.id+'/draft')
    }
    $scope.toForum = function () {
        $location.path('/forum')
    }
    $scope.toSubscriptions = function () {
        $location.path('/forum/subscriptions')
    }
    $scope.toForumTopic = function (topic) {
        console.log(topic.topic_id);
        // console.log(topic);
        $location.path('/forum/topic/'+$scope.category.id+'/'+topic.topic_id)
    }



    getForumTopics()
    function getForumTopics() {
        pnDB.getFromDB('select * from forumTopics where topic_category="'+$scope.category.id+'" order by topic_order desc').then(function (res) {
            $scope.forumTopics = res.data

            _.map($scope.forumTopics, getTopicsNumberOfPosts)
            _.map($scope.forumTopics, getForumTopicsDates)
        })
        function getForumTopicsDates(topic) {
            $scope.topicLabestPostDate = {}
            $scope.topicLabestUser = {}
            pnDB.getFromDB('select at, userFullName from forumPosts where topic_id="'+topic.topic_id+'" order by post_order desc limit 1').then(function (res) {
                console.log(res.data);
                if (res.data.length === 0) return
                if(res.data[0].at) {
                    $scope.topicLabestPostDate[topic.topic_id] = new Date(+res.data[0].at * 1000).toLocaleString().split(',')[0]
                    $scope.topicLabestUser[topic.topic_id] = res.data[0].userFullName
                }
            })

        }
        function getTopicsNumberOfPosts(topic) {
            // console.log(topic);
            // if (!topic)
            $scope.topicsPostCount = {}

            pnDB.getFromDB('select count(topic_id) as "count" from forumPosts where topic_id="'+topic.topic_id+'"').then(function (res) {
                console.log(res.data[0].count);
                $scope.topicsPostCount[topic.topic_id] = res.data[0].count
                console.log($scope.topicsPostCount)
            })
        }
    }


    // getTopicsNumberOfPosts()

    // $scope.forumTopics = [
    //     {
    //         topic_id: '23213',
    //         title: 'ABC 1.0 released!',
    //         creator_name: 'marvin',
    //         category: 'news',
    //         numberPosts: '2',
    //         lastUpdatedDate: 'Today',
    //         lastUpdatedBy: 'merhone',
    //     }
    // ]

}
