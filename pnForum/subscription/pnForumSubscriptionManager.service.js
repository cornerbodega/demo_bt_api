angular.module('countryApp')
.factory('pnForumSubscriptionManager', pnForumSubscriptionManager)
function pnForumSubscriptionManager(pnDB, pnLogger, $location) {
    return {
        notifySubscribers: notifySubscribers,
        subscribeToMyPost: subscribeToMyPost,
        unSubscribeFromTopic: unSubscribeFromTopic,
        getSubscriptionStatus: getSubscriptionStatus,
        getMySubscriptions: getMySubscriptions,
        subscribeToTopic:subscribeToTopic,
    }
    function subscribeToTopic(params) {
        return pnDB.saveToDB('forumTopicSubscribers', {
            subscription_id: params.topic_id + params.email,
            topic_id: params.topic_id,
            subscriber_email: params.email,
            unsubscribed: 0
        })
    }
    function getMySubscriptions(params) {
        return pnDB.getFromDB('select * from forumTopicSubscribers where subscriber_email="'+params.email+'"')
    }
    function getSubscriptionStatus(params) {
        return pnDB.getFromDB('select * from forumTopicSubscribers where topic_id ="'+params.topic_id+'" and subscriber_email="'+params.email+'" and unsubscribed="0"')
    }
    function unSubscribeFromTopic(params) {
        return pnDB.saveToDB('forumTopicSubscribers', {
            subscription_id: params.topic_id + params.email,
            topic_id: params.topic_id,
            subscriber_email: params.email,
            unsubscribed: 1
        })
    }
    function notifySubscribers(params) {
        console.log(params.post);
        params.post.url = params.url
        pnDB.getFromDB('select subject from forumTopics where topic_id ="'+params.topic_id+'"').then(function (res1) {
            console.log(res1);
            var topicName = res1.data[0].subject
            pnDB.getFromDB('select * from forumTopicSubscribers where topic_id ="'+params.topic_id+'" and unsubscribed="0"')
            .then(function (res) {
                console.log(res.data);
                var emails = _.pluck(res.data, 'subscriber_email')
                params.post.topicName = topicName

                _.map(emails, function (email) {
                    if(params.post.user_email === email) return 
                    pnLogger.notifySubscriber({
                        email: email,
                        body: formatForEmail(params.post, email),
                        subject: subjectForEmail(params.post)
                    })
                })


                function formatForEmail(post, email) {
                    console.log(post);
                    var r = ""
                    var n = post.userFullName + ', ' + post.companyName
                    r += n + ': ' + post.content
                    r += "<p>"
                    r += "Click <a href='https://abctraceability.com/wa/#"+post.url+"'>here</a> to return to the discussion."
                    r += "<p>"
                    r += "Click <a href='https://abctraceability.com/wa/#/forum/subscriptions/"+email+"'>here</a> to unsubscribe from these messages."
                    return r
                }
                function subjectForEmail(post) {
                    var r = ""

                    r += '' + post.topicName
                    return r
                }
            })
        })


        // get subscribers then send them an email quoting this post with a link to this topic.
    }
    function subscribeToMyPost(params) {
        console.log('subscribe me');
        return pnDB.saveToDB('forumTopicSubscribers', {
            subscription_id: params.topic_id + params.email,
            topic_id: params.topic_id,
            subscriber_email: params.email,
            unsubscribed: 0
        })
        // if the subscribe checkbox is checked, add me to the list of subscribers.
    }


}
