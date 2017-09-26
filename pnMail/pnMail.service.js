angular.module("countryApp")
.factory('pnMail', pnMail)

function pnMail(pnProxy) {
    return {
        sendEmail: function(params) {
            console.log(params);
            return pnProxy('https://abctraceability.com/wa/pnMail/PHPMailer/examples/mail.php', params)
        }
    }
}
