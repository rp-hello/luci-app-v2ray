/**
 * @license
 * Copyright 2020 Xingwang Liao <kuoruan@gmail.com>
 *
 * Licensed to the public under the MIT License.
 */
"use strict";

"require fs";

"require uci";

"require view";

"require ui";

return view.extend({
  load: function () {
    return uci.load("luci_xray").then((function () {
      let configFile = uci.get("xray", "main", "config_file");
      if (!configFile) {
        configFile = "/var/etc/luci_xray/xray.main.json";
      }

      return Promise.all([
        Promise.resolve(configFile),
        L.resolveDefault(fs.read(configFile), ""),
      ]);
    }));
  },
  render: function (data) {
    const configFile = data[0] ? data[0] : "";
    const configContent = data[1] ? data[1] : "";

    return E([
      E("h2", "%s - %s".format(_("Xray"), _("About"))),
      E("p", _("LuCI support for Xray.")),
      E("p", _("Version: %s").format("2.3.1" + "-" + "0")),
      E("p", _("Source: %s").format(`
        <a href="https://github.com/rp-hello/luci-app-xray" target="_blank">
          https://github.com/rp-hello/luci-app-xray
        </a>
      `)),
      E("p", _("Latest: %s").format(`
        <a href="https://github.com/rp-hello/luci-app-xray/releases/latest" target="_blank">
          https://github.com/rp-hello/luci-app-xray
        </a>
      `)),
      E("p", _("Report Bugs: %s").format(`
        <a href="https://github.com/rp-hello/luci-app-xray/issues" target="_blank">
          https://github.com/rp-hello/luci-app-xray/issues
        </a>
      `)),
      E("p", _("Current Config File: %s").format(configFile)),
      E("pre", {
        style: "-moz-tab-size: 4;-o-tab-size: 4;tab-size: 4;word-break: break-all;"
      }, configContent || _("Failed to open file."))
    ]);
  }
});
