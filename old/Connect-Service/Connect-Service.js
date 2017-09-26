// (function () {
//     angular
//     .module('countryApp')
//     .factory('pnPost', [ '$http', '$rootScope', pnPost ]);
//
//     function pnPost($http, $rootScope) {
//
//         return {
//             pnPost: pnPost,
//             post: post,
//         };
//
//
//         // function pnPost(data){
//         //     if (sessionStorage.sessionid) data.sessionid = sessionStorage.sessionid;
//         //     data.API = "4.0";
//         //
//         //     return $http({
//         //         method: 'POST',
//         //         url: 'Connect-Service/action.php',
//         //         data: {
//         //             request: data
//         //         },
//         //         datatype: 'json',
//         //     });
//         // };
//         function post(data, f, s){
//             if (sessionStorage.sessionid) data.sessionid = sessionStorage.sessionid;
//             data.API = "4.0";
//
//             $http({
//                 method: 'POST',
//                 url: 'Connect-Service/action.php',
//                 data: {
//                     request: data
//                 },
//                 datatype: 'json',
//             }).success(function(res){
//                 if (res.success != 1) {
//                     return f(res);
//                 } else {
//                     return s(res);
//                 }
//             })
//         };
//
//     }
//
// })();
