angular.module('countryApp')
.factory('pnLogger', pnLogger)

function pnLogger(pnMail, pnDB) {
    return {
        newDemoUser: function (params) {
            return pnMail.sendEmail({
                fromEmai: 'new_demo_user@abctraceability.com',
                fromName: 'New Demo User',
                toEmail:  'abctraceability@gmail.com',
                subject: 'New Demo User ' + params.vendorName,
                body: params.email +   ' ' + params.phone
            })
        },
        logUsage: function (params) {
            pnDB.saveToDB('usage_log', {
                ubi: sessionStorage.ubi,
                task: params.task,
            }).then(function (res) {
                console.log(res);
            })
        },
        notifySubscriber: function (params) {
            // console.log(emails);
            // _.map(params.emails, function (email) {
                pnMail.sendEmail({
                    fromEmail: 'notifications@abctraceability.com',
                    fromName: 'ABC Traceability Forum',
                    toEmail: params.email,
                    subject: params.subject,
                    body: params.body,
                    templateUrl: 'forumSubscriberPostNotification.email.html'
                })
            // })
        },
        newUser: function() {
            // Send an email to newuser@potnet.net
            return pnMail.sendEmail({
                fromEmail:sessionStorage.username,
                fromName:sessionStorage.myName,
                toEmail:'abctraceability@gmail.com',
                subject:'NEW BETA USER! ' + sessionStorage.myName  ,
                templateUrl: 'pnLogger.email.html'
            })
        },
        logins: function() {
            console.log('pnLogger: send email for login');
            // Send an email to newuser@potnet.net
            if (sessionStorage.username === 'luchinisupercritical@gmail.com') return
            return pnMail.sendEmail({
                fromEmail:'logins@abctraceability.com',
                fromName:sessionStorage.myName,
                toEmail:'abctraceability@gmail.com',
                subject: sessionStorage.myName  + ' has logged in ('+sessionStorage.username+')',
                templateUrl: 'pnLogger.email.html'
            })
        },
        newPayment: function(params) {
            console.log('pnLogger: send email for payment');
            // Send an email to newuser@potnet.net
            return pnMail.sendEmail({
                fromEmail:sessionStorage.username,
                fromName:sessionStorage.myName,
                toEmail:'abctraceability@gmail.com',
                subject: sessionStorage.myName  + ' has paid ',
                templateUrl: 'pnLogger.email.html'
            })
        }
    }
}
