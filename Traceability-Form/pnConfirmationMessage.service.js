angular.module("countryApp").factory("pnConfirmationMessage", pnConfirmationMessage)

function pnConfirmationMessage() {
    return function(form){
        console.log(form);
        var _messages = {
            want_to_sell: function(){
                return "Are you sure you want to sell " + form.id + "?"
            }
        }
        return _messages[form.action]();

    }
}
