/**
 * @license
 * Copyright 2020 Xingwang Liao <kuoruan@gmail.com>
 *
 * Licensed to the public under the MIT License.
 */

"use strict";

"require form";
"require uci";
"require v2ray";
// "require view";

// @ts-ignore
return L.view.extend<SectionItem[][]>({
    // load: function () {
    //     return Promise.all([
    //         v2ray.getSections("routing_rule"),
    //         v2ray.getSections("routing_balancer", "tag"),
    //         v2ray.getSections("outbound", "tag"),
    //     ]);
    // },
    render: function ([
        routingRules = [],
        routingBalancers = [],
        outBoundSections = [],
    ] = []) {
        const m = new form.Map(
            "v2ray",
            "%s - %s".format(_("V2Ray"), _("Observatory")),
            _("Details: %s").format(
                '<a href="https://www.v2fly.org/config/observatory.html#observatoryobject" target="_blank">ObservatoryObject</a>'
            )
        );

        const s1 = m.section(form.NamedSection, "main_observatory", "observatory");
        s1.anonymous = true;
        s1.addremove = false;

        let o;
        o = s1.option(form.Flag, "enabled", _("Enabled"));
        o = s1.option(form.Value, "probeURL", _("ProbeURL"));
        o = s1.option(form.Value, "probeInterval", _("ProbeInterval"));
        o = s1.option(
            form.DynamicList,
            "subjectSelector",
            _("subjectSelector")
        );

        return m.render();
    },
});
