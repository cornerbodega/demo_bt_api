angular.module("countryApp").filter('pnDays', pnDays)



function pnDays() {
    return function(input) {

        input = input || '';
        var out = '';
        if (input === '')  return input
        var at = +input;
        var now = Date.now();
        var secondsSince = parseInt((now - at)/ 1000)
        // var sSince = var seconds = parseInt((b-a)/1000);
        var minutesSince = parseInt(secondsSince / 60)
        var hoursSince = parseInt(minutesSince / 60)
        var daysSince = parseInt(hoursSince / 24)
        console.log(minutesSince);
        // console.log(new Date(Date.now()).toLocaleString());
        // console.log(new Date(+input).toLocaleString());

        return daysSince
    };
}
