/*! url - v1.8.6 - 2013-11-22 */
if (typeof CoreViewHelpers !== "undefined") {
    var titleBarHelper = CoreViewHelpers.CoreTitleBarHelper.getForCurrentView();
    titleBarHelper.extendViewIntoTitleBar = true;
}
window.url = function() {
    function e(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }
    return function(t, n) {
        var r = n || window.location.toString();
        if (!t) return r;
        t = t.toString(), "//" === r.substring(0, 2) ? r = "http:" + r : 1 === r.split("://").length && (r = "http://" + r), n = r.split("/");
        var i = {
                auth: ""
            },
            s = n[2].split("@");
        1 === s.length ? s = s[0].split(":") : (i.auth = s[0], s = s[1].split(":")), i.protocol = n[0], i.hostname = s[0], i.port = s[1] || ("https" === i.protocol.split(":")[0].toLowerCase() ? "443" : "80"), i.pathname = (n.length > 3 ? "/" : "") + n.slice(3, n.length).join("/").split("?")[0].split("#")[0];
        var o = i.pathname;
        "/" === o.charAt(o.length - 1) && (o = o.substring(0, o.length - 1));
        var u = i.hostname,
            f = u.split("."),
            l = o.split("/");
        if ("hostname" === t) return u;
        if ("domain" === t) return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(u) ? u : f.slice(-2).join(".");
        if ("sub" === t) return f.slice(0, f.length - 2).join(".");
        if ("port" === t) return i.port;
        if ("protocol" === t) return i.protocol.split(":")[0];
        if ("auth" === t) return i.auth;
        if ("user" === t) return i.auth.split(":")[0];
        if ("pass" === t) return i.auth.split(":")[1] || "";
        if ("path" === t) return i.pathname;
        if ("." === t.charAt(0)) {
            if (t = t.substring(1), e(t)) return t = parseInt(t, 10), f[0 > t ? f.length + t : t - 1] || ""
        } else {
            if (e(t)) return t = parseInt(t, 10), l[0 > t ? l.length + t : t] || "";
            if ("file" === t) return l.slice(-1)[0];
            if ("filename" === t) return l.slice(-1)[0].split(".")[0];
            if ("fileext" === t) return l.slice(-1)[0].split(".")[1] || "";
            if ("?" === t.charAt(0) || "#" === t.charAt(0)) {
                var c = r,
                    h = null;
                if ("?" === t.charAt(0) ? c = (c.split("?")[1] || "").split("#")[0] : "#" === t.charAt(0) && (c = c.split("#")[1] || ""), !t.charAt(1)) return c;
                t = t.substring(1), c = c.split("&");
                for (var p = 0, d = c.length; d > p; p++)
                    if (h = c[p].split("="), h[0] === t) return h[1] || "";
                return null
            }
        }
        return ""
    }
}(), "undefined" != typeof jQuery && jQuery.extend({
    url: function(e, t) {
        return window.url(e, t)
    }
});
window.rgbHex = function() {
    function e(e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }

    function t(e) {
        return e.replace(/^\s+|\s+$/g, "")
    }

    function n(n) {
        return n = t(n), e(n) && n >= 0 && 255 >= n
    }

    function r(e) {
        return /^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(t(e))
    }

    function i(e) {
        return e = parseInt(e, 10).toString(16), 1 === e.length ? "0" + e : e
    }

    function s(e) {
        return parseInt(e, 16).toString()
    }

    function o(t) {
        return t = t.split(","), (3 === t.length || 4 === t.length) && n(t[0]) && n(t[1]) && n(t[2]) ? 4 !== t.length || e(t[3]) ? "#" + i(t[0]).toUpperCase() + i(t[1]).toUpperCase() + i(t[2]).toUpperCase() : null : null
    }

    function u(e) {
        return r(e) ? (3 === e.length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2)), "rgb(" + s(e.substr(0, 2)) + "," + s(e.substr(2, 2)) + "," + s(e.substr(4, 2)) + ")") : void 0
    }

    function a(e) {
        return e.replace(/\s/g, "")
    }
    return function(e) {
        if (!e) return null;
        var n = null,
            r = /^rgba?\((.*)\);?$/,
            i = /^#/;
        return e = t(e.toString()), "transparent" === e || "rgba(0,0,0,0)" === a(e) ? "transparent" : r.test(e) ? o(e.match(r)[1]) : i.test(e) ? u(e.split("#").reverse()[0]) : (n = e.split(","), 1 === n.length ? u(e) : 3 === n.length || 4 === n.length ? o(e) : void 0)
    }
}(), jQuery && jQuery.extend({
    rgbHex: function(e) {
        return window.rgbHex(e)
    }
});
(function(e) {
    e.fn.colourBrightness = function() {
        var e, t, n, r, i = this.css("background-color");
        if (i.match(/^rgb/)) {
            i = i.match(/rgb\(([^)]+)\)/)[1];
            i = i.split(/ *, */).map(Number);
            e = i[0];
            t = i[1];
            n = i[2]
        } else if ("#" == i[0] && 7 == i.length) {
            e = parseInt(i.slice(1, 3), 16);
            t = parseInt(i.slice(3, 5), 16);
            n = parseInt(i.slice(5, 7), 16)
        } else if ("#" == i[0] && 4 == i.length) {
            e = parseInt(i[1] + i[1], 16);
            t = parseInt(i[2] + i[2], 16);
            n = parseInt(i[3] + i[3], 16)
        }
        r = (e * 299 + t * 587 + n * 114) / 1e3;
        r < 125 ? this.removeClass("light").addClass("dark") : this.removeClass("dark").addClass("light");
        
        // update title bar color (W10 app)
        if (typeof Windows !== 'undefined') {
            var titleBar = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
            var backgroundColor;
            var foregroundColor;
            
            // dark theme
            if (r < 125) {
                // create color
                backgroundColor = { a: 255, r: e, g: t, b: n };
                foregroundColor = { a: 255, r: 255, g: 255, b: 255 };
                
                // title bar
                titleBar.backgroundColor = backgroundColor;
                titleBar.foregroundColor = foregroundColor;
                
                // title bar buttons
                titleBar.buttonBackgroundColor = backgroundColor;
                titleBar.buttonForegroundColor  = foregroundColor;
            } 
            // light theme
            else {
                backgroundColor = { a: 255, r: e, g: t, b: n };
                foregroundColor = { a: 255, r: 0, g: 0, b: 0 };
                
                // title bar
                titleBar.backgroundColor = backgroundColor;
                titleBar.foregroundColor = foregroundColor;
                
                // title bar buttons
                titleBar.buttonBackgroundColor = backgroundColor;
                titleBar.buttonForegroundColor  = foregroundColor;
            }
        }
    }
})(jQuery);
$(window).load(function() {
    function i() {
        var n, r, i;
        n = window.location.href;
        r = window.url("#", n);
        window.url("#", n) ? i = window.url("#", n) : i = window.url("-1", n);
        if (i) {
            if (i.match("^[0-9A-Fa-f]{3}$") || i.match("^[0-9A-Fa-f]{6}$")) {
                e.val("#" + i);
                colour = $.rgbHex(e.val());
                if (colour) {
                    t.val(colour);
                    t.select()
                } else t.val("");
                $("body").css("background-color", t.val());
                $("body").colourBrightness()
            }
        } else e.focus()
    }
    var e = $("#hex"),
        t = $("#rgb"),
        n = $("#hex").val(),
        r = $("#rgb").val();
    window.onhashchange = i;
    i();
    e.bind("blur keyup", function(e) {
        var colour = $.rgbHex($("#hex").val());
        colour ? $("#rgb").val(colour) : $("#rgb").val("");
        $("body").css("background-color", t.val());
        $("body").colourBrightness();
        e.keyCode == 13 && t.select()
    });
    t.bind("blur keyup", function(t) {
        var colour = $.rgbHex($("#rgb").val());
        colour ? $("#hex").val(colour) : $("#hex").val("");
        $("body").css("background-color", e.val());
        $("body").colourBrightness();
        t.keyCode == 13 && e.select()
    });
    $(".tweet").click(function(e) {
        var t = 575,
            n = 400,
            r = ($(window).width() - t) / 2,
            i = ($(window).height() - n) / 2,
            s = this.href,
            o = "status=1,width=" + t + ",height=" + n + ",top=" + i + ",left=" + r;
        window.open(s, "twitter", o);
        return !1
    })
});