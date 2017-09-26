(function(){
    angular
    .module('countryApp')
    .factory('TraceabilityMenuNotificationsService',
        TraceabilityMenuNotificationsService );

    function TraceabilityMenuNotificationsService($q, $rootScope, pnDB, TraceabilityMenuService, pnMyData, pnDataBank, pnPost) {
        var _paths = TraceabilityMenuService.paths()
        var _notifications = {}
        return{
            // attachNotifications: attachNotifications,
            // getPaths: getPaths,
            // notifications: _notifications,
            init: init,
            getNotifications: getNotifications,
            // _notifications: _notifications,
            // notificationsData: notificationsData
        };
        function init() {
            // console.log('notifications placeholder');

            getWtsCount()
            getOutboundManifestCount()
            getInboundManifestCount()

            function getWtsCount() {
                return pnDB.getFromDB("select count(*) as total from wts_manifest_requests where status='new' and wts_creator_ubi='"+sessionStorage.ubi+"'")
                .then(attachRequestedWtsNotifications)
            }

            function getOutboundManifestCount() {

                pnMyData['manifests']().init()
                $rootScope.$on('manifests', function () {
                    var o = pnDataBank.data.manifests
                    // console.log(o);
                    var u = _.filter(o, {fulfilled : 0});
                    // console.l/og(u);
                    if (u.length > 0) {
                        if (!_notifications.inventory_transfer_outbound) _notifications.inventory_transfer_outbound = 0

                        _notifications.outbound = u.length
                        _notifications.inventory_transfer_outbound = u.length

                        if(!_notifications.inventory_transfer_inbound) _notifications.transfers = u.length
                        else _notifications.transfers += u.length
                        assignPoints()

                    }

                });
            }

            function getInboundManifestCount() {
                pnPost({
                    action:'inventory_manifest_lookup',
                    sessionid: sessionStorage.sessionid,
                    location: sessionStorage.myLocation
                })
                .then(function(res){
                    // if()
                    var u = res.data.data
                    if (!u) return console.log('No U! ' + res.data);
                    if (u.length > 0) {
                        // if (!_notifications.transfers) _notifications.transfers = 0

                        _notifications.inbound = u.length
                        _notifications.inventory_transfer_inbound = u.length
                        // if(!_notifications.inventory_transfer_outbound) _notifications.transfers = u.length
                        // else _notifications.transfers += u.length

                        if (!_notifications.inventory_transfer_outbound) _notifications.transfers = u.length
                        else _notifications.transfers += u.length
                    }
                    // console.log($scope.items);
                    // console.log(u);
                    assignPoints()
                });

            }

        }

        function attachRequestedWtsNotifications(res) {
            // console.log(res);
            _notifications.manifest_request_inbox = +res.data[0].total
            _notifications.market = +res.data[0].total

            assignPoints();

        }
        function getNotifications() {
            return _notifications
        }

            // console.log(_notifications);

            function assignPoints() {
                // console.log('assigns points!');
                // console.log(_paths);
                // console.log(_notifications);
                _.map(_notifications, function (value, key) {
                    _.map(_paths, function (path) {
                        var p = _.findWhere(path, {id: key})
                        if(p) {
                            // console.log(p);
                            p.notificationCount = _notifications[key]
                            // console.log(p);

                        }
                        // console.log(_notifications[path.id]);
                        // console.log(_.findWhere(path, {id: key}));
                    })
                })
                $rootScope.$broadcast("notificationsReady")

            }




    }
})();
