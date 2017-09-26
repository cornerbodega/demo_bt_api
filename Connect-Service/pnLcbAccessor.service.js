angular.module("countryApp")
.factory("pnLcbAccessor", [
    'pnPost',
    pnLcbAccessor
])

function pnLcbAccessor(pnPost) {
    return function(){
        return pnPost({
                "password": "44Million!",
                "license_number": 603347225,
                "username": "luchinisupercritical@gmail.com",
                "action": "login"
        })
    }
}
