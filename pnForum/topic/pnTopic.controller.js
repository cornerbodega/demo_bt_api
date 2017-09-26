angular.module('countryApp')
.controller('pnTopicController', pnTopicController)

function pnTopicController($scope, $location, pnForumCategories, $routeParams, pnLoginRouter, pnDB, $mdDialog, pnForumSubscriptionManager) {
    var p = $location.path().split('/')
    // console.log(p);
    // var c = p[p.length-1]
    if(sessionStorage.sessionid) $scope.isLoggedIn = true
    $scope.myFullName = sessionStorage.myFullName
    $scope.myCompanyName = sessionStorage.myName
    // console.log($scope.isLoggedIn);
    $scope.category = _.findWhere(pnForumCategories.data, {id:  $routeParams.topic_category})

    $scope.topic_id =  $routeParams.topic_id

    pnForumSubscriptionManager.getSubscriptionStatus({topic_id: $routeParams.topic_id, email: sessionStorage.username})
    .then(function (res) {
        console.log(res);
        if(res.data.length > 0) {
            $scope.startedSubscribed = true
            $scope.subscribe = true
        }

    })
    // function getSubscriptionStatus() {
    //     pnDB.getFromDB('select * from forumTopicSubscribers where topic_id ="'+$routeParams.topic_id+'" and subscriber_email="'+sessionStorage.username+'"').then(function (res) {
    //         console.log(res);
    //         if(res.data.length > 0) {
    //             $scope.startedSubscribed = true
    //             $scope.subscribe = true
    //         }
    //
    //     })
    // }
    $scope.openFormattingHelp = function ($event) {
        var parentelement = angular.element(document.body);

        $mdDialog.show({
            parent: parentelement,
            targetEvent: $event,
            // scope: $scope,
            templateUrl:  'pnForum/directives/formattingHelp.template.html',
            // locals: {
            //     inputmodel:  data,
            //     inputform: fields
            // },
            controller: FormattingHelpController,
            clickOutsideToClose:true

        }); // end show    }
        function FormattingHelpController($scope, $mdDialog, $window) {
            $scope.openBBCode = function () {
                console.log('OPEN BB');
                $window.open('https://en.wikipedia.org/wiki/BBCode', '_blank');

            }

        }
    }
    $scope.toForum = function () {
        $location.path('/forum')
    }
    $scope.toForumCategory = function (category) {
        console.log(category);
        $location.path('/forum/'+category.id)
    }
    $scope.toLogin = function() {
        pnLoginRouter.data.forum = $location.path()
        $location.path('/log-in')
    }
    getPosts()
    function getPosts() {
        pnDB.getFromDB('select * from forumPosts where topic_id="'+$scope.topic_id+'" order by post_order asc').then(function (res) {
            // console.log(res);
            $scope.posts = res.data
        })
        pnDB.getFromDB('select * from forumTopics where topic_id="'+$scope.topic_id+'"').then(function (res) {
            // console.log(res);
            // console.log(res);
            $scope.topic = res.data[0]
        })
    }

    $scope.deletePost = function (post) {
        post.deleted = 1
        pnDB.saveToDB('forumPosts', post)
    }

    // $scope.posts = [
    //     {
    //         post_id: "324324fwgrvwsds",
    //         // message: 'Hello World',
    //         content: 'Post Content\nTest\nDies ist [b]fetter[/b] Text.\nDies ist [I]kursiver[/I] Text.\nDies ist [U]unterstrichener[/U] Text.\nDies ist [S]durchgestrichener[/S] Text.\n[URL]http://www.example.com[/URL]',
    //         topic_category: $routeParams.topic_category
    //     }
    // ]
    $scope.undoDelete = function (post) {
        post.deleted = 0
        pnDB.saveToDB('forumPosts', post)

    }
    $scope.showEdit = {}
    $scope.editPost = function (post) {
        console.log('Show edit!');
        console.log(post);
        $scope.showEdit[post.post_order] = !$scope.showEdit[post.post_order]
    }
    $scope.iAmOwner = function (post) {
        // console.log(post);
        // console.log(sessionStorage.username);
        // if(post.deteted == 1) return false
        return sessionStorage.username === post.user_email
    }
    $scope.postEditPost = function (post) {
        console.log(post);
        post.edited = 1
        if (!post.content) return console.log('No Message. Exiting.');

        pnDB.saveToDB('forumPosts', post).then(function () {
            $scope.editPost(post)
            getPosts()
        })
        if($scope.subscribe) pnForumSubscriptionManager.subscribeToMyPost({topic_id: $routeParams.topic_id, email: sessionStorage.username})
    }

    $scope.post = function() {
        if (!$scope.newPost) return console.log('No Message. Exiting.');
        var p = {
            content: $scope.newPost,
            at: Date.now()/1000,
            // atTimeString: new Date(this.at).toLocaleString(),
            atLabel: new Date(Date.now()).toLocaleString(),
            topic_category: $routeParams.topic_category,
            topic_id: $routeParams.topic_id,
            userFullName: sessionStorage.myFullName,
            user_email: sessionStorage.username,
            companyName: sessionStorage.myName
        }
        console.log(p);
        pnDB.saveToDB('forumPosts', p).then(function (res) {
            console.log('Save Complete');
            console.log(res);
            getPosts()
            clearTextArea()
            pnForumSubscriptionManager.notifySubscribers({topic_id: $routeParams.topic_id, post: p, url: $location.url()})
            if($scope.subscribe) pnForumSubscriptionManager.subscribeToMyPost({topic_id: $routeParams.topic_id, email: sessionStorage.username})
            if(!$scope.subscribe && $scope.startedSubscribed) pnForumSubscriptionManager.unSubscribeFromTopic({ topic_id: $routeParams.topic_id, email:sessionStorage.username })
        })

        function clearTextArea() {
            $scope.newPost = ''
        }
        // pnDB.saveToDB('forumPosts',
        // {
        //     post_id: makeid()
        // })

    }
    // $scope.toForum = function () {
    //     $location.path('/forum')
    // }
    //
    // $scope.forumTopics = [
    //     {
    //         topic_id: '23213',
    //         title: 'ABC 1.0 released!',
    //         creator_name: 'marvin',
    //         numberPosts: '2',
    //         lastUpdatedDate: 'Today',
    //         lastUpdatedBy: 'merhone',
    //     }
    // ]

}
