/**
 * @license
 * Copyright 2020 Xingwang Liao <kuoruan@gmail.com>
 *
 * Licensed to the public under the MIT License.
 */
"use strict";

"require form";

"require fs";

"require ui";

"require v2ray";

// "require view";
"require view/v2ray/include/custom as custom";

var StartControlGroup = form.DummyValue.extend({
    handleServiceReload: function () {
        return fs
            .exec("/etc/init.d/luci_v2ray", ["reload"])
            .then(
                L.bind(
                    function (res) {
                        if (res.code !== 0) {
                            ui.addNotification(null, [
                                E(
                                    "p",
                                    _("Reload service failed with code %d").format(res.code)
                                ),
                                res.stderr ? E("pre", {}, [res.stderr]) : "",
                            ]);
                            L.raise("Error", "Reload failed");
                        }
                    },
                    this
                )
            )
            .catch(function (e) {
                ui.addNotification(null, E("p", e.message));
            });
    },
    handleServiceStop: function () {
        return fs
            .exec("/etc/init.d/luci_v2ray", ["stop"])
            .then(
                L.bind(
                    function (res) {
                        if (res.code !== 0) {
                            ui.addNotification(null, [
                                E(
                                    "p",
                                    _("Stop service failed with code %d").format(res.code)
                                ),
                                res.stderr ? E("pre", {}, [res.stderr]) : "",
                            ]);
                            L.raise("Error", "Stop failed");
                        }
                    },
                    this
                )
            )
            .catch(function (e) {
                ui.addNotification(null, E("p", e.message));
            });
    },
    handleServiceStart: function () {
        return fs
            .exec("/etc/init.d/luci_v2ray", ["start"])
            .then(
                L.bind(
                    function (res) {
                        if (res.code !== 0) {
                            ui.addNotification(null, [
                                E(
                                    "p",
                                    _("Start service failed with code %d").format(res.code)
                                ),
                                res.stderr ? E("pre", {}, [res.stderr]) : "",
                            ]);
                            L.raise("Error", "Start failed");
                        }
                    },
                    this
                )
            )
            .catch(function (e) {
                ui.addNotification(null, E("p", e.message));
            });
    },
    renderWidget: function (section_id, option_id, cfgvalue) {
        return E([], [
            E('span', { 'class': 'control-group' }, [
                E('button', {
                    'class': 'cbi-button cbi-button-apply',
                    'click': ui.createHandlerFn(this, function () {
                        return this.handleServiceReload();
                    }),
                    'disabled': (this.readonly != null) ? this.readonly : this.map.readonly
                }, _('Reload')),
                '  ',
                E('button', {
                    'class': 'cbi-button cbi-button-apply',
                    'click': ui.createHandlerFn(this, function () {
                        return this.handleServiceStop();
                    }),
                    'disabled': (this.readonly != null) ? this.readonly : this.map.readonly
                }, _('Stop')),
                ' ',
                E('button', {
                    'class': 'cbi-button cbi-button-apply',
                    'click': ui.createHandlerFn(this, function () {
                        return this.handleServiceStart();
                    }),
                    'disabled': (this.readonly != null) ? this.readonly : this.map.readonly
                }, _('Start'))
            ])
        ]);
    },
});

// @ts-ignore
return L.view.extend({
    load: function() {
        return Promise.all([ v2ray.getSections("inbound"), v2ray.getSections("outbound") ]);
    },
    render: function(e) {
        const m = new form.Map(
            "luci_v2ray",
            "%s - %s".format(_("V2ray"), _("Global Settings")),
            "<p>%s</p><p>%s</p>".format(
                _("A platform for building proxies to bypass network restrictions."),
                _("For more information, please visit: %s").format(
                    '<a href="https://www.v2fly.org" target="_blank">https://www.v2fly.org</a>'
                )
            )
        );

        const s = m.section(form.NamedSection, "main", "v2ray");
        s.addremove = false;
        s.anonymous = true;

        let o;
        var a = void 0 === e ? [] : e, r = a[0], t = void 0 === r ? [] : r, n = a[1], i = void 0 === n ? [] : n;

        s.option(custom.RunningStatus, "_status");

        o = s.option(form.Flag, "enabled", _("Enabled"));
        o.rmempty = false;

        o = s.option(StartControlGroup, '_reload', _("Reload Service"));

        (o = s.option(form.Value, "v2ray_file", _("V2Ray file"), _("Set the V2Ray executable file path."))).datatype = "file", 
        o.placeholder = "/usr/bin/v2ray", o.rmempty = !1, (o = s.option(form.Value, "asset_location", _("V2Ray asset location"), _("Directory where geoip.dat and geosite.dat files are, default: same directory as V2Ray file."))).datatype = "directory", 
        o.placeholder = "/usr/bin", (o = s.option(form.Value, "mem_percentage", _("Memory percentage"), _("The maximum percentage of memory used by V2Ray."))).datatype = "and(uinteger, max(100))", 
        o.placeholder = "80", (o = s.option(form.Value, "config_file", _("Config file"), _("Use custom config file."))).datatype = "file", 
        o.value("", _("None")), (o = s.option(form.Value, "access_log", _("Access log file"))).depends("config_file", ""), 
        o.value("/dev/null"), o.value("/var/log/v2ray-access.log"), (o = s.option(form.ListValue, "loglevel", _("Log level"))).depends("config_file", ""), 
        o.value("debug", _("Debug")), o.value("info", _("Info")), o.value("warning", _("Warning")), 
        o.value("error", _("Error")), o.value("none", _("None")), o.default = "warning", 
        (o = s.option(form.Value, "error_log", _("Error log file"))).value("/dev/null"), 
        o.value("/var/log/v2ray-error.log"), o.depends("loglevel", "debug"), o.depends("loglevel", "info"), 
        o.depends("loglevel", "warning"), o.depends("loglevel", "error"), o = s.option(form.Flag, "dnsLog", _("Enabled DNS log")), 
        (o = s.option(form.MultiValue, "inbounds", _("Inbounds enabled"))).depends("config_file", "");
        for (var d = 0, u = t; d < u.length; d++) {
            var f = u[d];
            o.value(f.value, f.caption);
        }
        (o = s.option(form.MultiValue, "outbounds", _("Outbounds enabled"))).depends("config_file", "");
        for (var c = 0, p = i; c < p.length; c++) {
            var g = p[c];
            o.value(g.value, g.caption);
        }
        (o = s.option(form.Flag, "stats_enabled", "%s - %s".format(_("Stats"), _("Enabled")))).depends("config_file", ""), 
        (o = s.option(form.Flag, "transport_enabled", "%s - %s".format(_("Transport"), _("Enabled")))).depends("config_file", "");

        o = s.option(
            custom.TextValue,
            "_transport",
            "%s - %s".format(_("Transport"), _("Settings")),
            _("<code>transport</code> field in top level configuration, JSON string")
        );
        o.depends("transport_enabled", "1");
        o.wrap = "off";
        o.rows = 5;
        o.datatype = "string";
        o.filepath = "/etc/luci_v2ray/transport.json";
        o.required = true;
        o.isjson = true;
        
        return m.render();
    }
});