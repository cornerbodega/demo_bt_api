angular.module('countryApp')
.controller('pnAppointmentController', pnAppointmentController)
.factory('pnAppointment', pnAppointment)

function pnAppointmentController($scope, pnAppointment) {

    pnAppointment()

}

function pnAppointment($window) {
    return function () {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);
        console.log(localISOTime);
        $window.location.assign(
            'https://abctraceability.com/wa/pnCalendar/download_ics.php'
            +'?location=' + 'location'
            +'&description=' + 'description'
            +'&dtstart=' + localISOTime
            +'&dtend=' + localISOTime
            +'&summary='+'summary'
            +'&url='+ 'www.google.com'
        );

    }
}
