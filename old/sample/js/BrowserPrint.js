var BrowserPrint = function() {
    function e(e) {
        return s + e
    }

    function n(e, n) {
        var i = new XMLHttpRequest;
        return "withCredentials" in i ? i.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (i = new XDomainRequest, i.open(e, n)) : i = null, i
    }

    function i(e, n, i, t) {
        return void 0 != e && (void 0 == i && (i = e.sendFinishedCallback), void 0 == t && (t = e.sendErrorCallback)), n.onreadystatechange = function() {
            n.readyState === XMLHttpRequest.DONE && 200 === n.status ? i(n.responseText) : n.readyState === XMLHttpRequest.DONE && t(n.responseText)
        }, n
    }
    var t = {},
        r = 2,
        s = "http://localhost:9100/";
    return "https:" === location.protocol && (s = "https://localhost:9101/"), t.Device = function(t) {
        var s = this;
        this.name = t.name, this.deviceType = t.deviceType, this.connection = t.connection, this.uid = t.uid, this.version = r, this.provider = t.provider, this.manufacturer = t.manufacturer, this.sendErrorCallback = function(e) {}, this.sendFinishedCallback = function(e) {}, this.send = function(t, r, o) {
            var a = n("POST", e("write"));
            if (a) {
                i(s, a, r, o);
                var c = {
                    device: {
                        name: this.name,
                        uid: this.uid,
                        connection: this.connection,
                        deviceType: this.deviceType,
                        version: this.version,
                        provider: this.provider,
                        manufacturer: this.manufacturer
                    },
                    data: t
                };
                a.send(JSON.stringify(c))
            }
        }, this.sendUrl = function(t, r, o) {
            var a = n("POST", e("write"));
            if (a) {
                i(s, a, r, o);
                var c = {
                    device: {
                        name: this.name,
                        uid: this.uid,
                        connection: this.connection,
                        deviceType: this.deviceType,
                        version: this.version,
                        provider: this.provider,
                        manufacturer: this.manufacturer
                    },
                    url: t
                };
                a.send(JSON.stringify(c))
            }
        }, this.readErrorCallback = function(e) {}, this.readFinishedCallback = function(e) {}, this.read = function(t, r) {
            var o = n("POST", e("read"));
            if (o) {
                i(s, o, t, r);
                var a = {
                    device: {
                        name: this.name,
                        uid: this.uid,
                        connection: this.connection,
                        deviceType: this.deviceType,
                        version: this.version,
                        provider: this.provider,
                        manufacturer: this.manufacturer
                    }
                };
                o.send(JSON.stringify(a))
            }
        }, this.sendThenRead = function(e, n, i) {
            this.send(e, function(e) {
                return function() {
                    e.read(n, i)
                }
            }(this), i)
        }
    }, t.getLocalDevices = function(r, s, o) {
        var a = n("GET", e("available"));
        a && (finishedFunction = function(e) {
            response = e, response = JSON.parse(response);
            for (var n in response)
                if (response.hasOwnProperty(n) && response[n].constructor === Array) {
                    arr = response[n];
                    for (var i = 0; i < arr.length; ++i) arr[i] = new t.Device(arr[i])
                }
            return void 0 == o ? void r(response) : void r(response[o])
        }, i(void 0, a, finishedFunction, s), a.send())
    }, t.getDefaultDevice = function(r, s, o) {
        var a = "default";
        void 0 != r && null != r && (a = a + "?type=" + r);
        var c = n("GET", e(a));
        c && (finishedFunction = function(e) {
            if (response = e, "" == response) return void s(null);
            response = JSON.parse(response);
            var n = new t.Device(response);
            s(n)
        }, i(void 0, c, finishedFunction, o), c.send())
    }, t.readOnInterval = function(e, n, i) {
        void 0 != i && 0 != i || (i = 1), readFunc = function() {
            e.read(function(e) {
                n(e), setTimeout(readFunc, i)
            }, function(e) {
                setTimeout(readFunc, i)
            })
        }, setTimeout(readFunc, i)
    }, t.bindFieldToReadData = function(e, n, i, r) {
        t.readOnInterval(e, function(e) {
            "" != e && (n.value = e, void 0 != r && null != r && r())
        }, i)
    }, t
}();
