# luci-app-v2ray

Luci support for V2Ray

*Available for OpenWrt 21.02 and later.*

[![Release Version](https://img.shields.io/github/release/rp-hello/luci-app-v2ray.svg)](https://github.com/rp-hello/luci-app-v2ray/releases/latest)
[![Latest Release Download](https://img.shields.io/github/downloads/rp-hello/luci-app-v2ray/latest/total.svg)](https://github.com/rp-hello/luci-app-v2ray/releases/latest)
[![Total Download](https://img.shields.io/github/downloads/rp-hello/luci-app-v2ray/total.svg)](https://github.com/rp-hello/luci-app-v2ray/releases)

## Install

### Manual install

1. Download ipk files from [release](https://github.com/rp-hello/luci-app-v2ray/releases) page

2. Upload files to your router

```
scp luci-app-v2ray*.ipk root@192.168.8.1:.
```

3. Install package with opkg:

```sh
opkg install luci-app-v2ray*.ipk
```

Dependencies:

- jshn
- ip (ip-tiny or ip-full)
- ipset
- iptables
- iptables-mod-tproxy
- resolveip
- dnsmasq-full (dnsmasq ipset is required)

For translations, please install ```luci-i18n-v2ray-*```.

> You may need to remove ```dnsmasq``` before installing this package. (`opkg remove dnsmasq && opkg install dnsmasq-full`)

## Configure

1. Install V2Ray file from [V2Ray GitHub release](https://github.com/v2fly/v2ray-core/releases/latest) or .ipk file form [here](https://github.com/rp-hello/openwrt-v2ray/releases/latest).

2. Download `luci-app-v2ray*.ipk` (and `luci-i18n-v2ray-*.ipk`), upload to your router, and install them.

3. Config V2Ray file path in LuCI page (http://192.168.8.1/cgi-bin/luci/admin/services/v2ray).

4. Add your inbound and outbound rules (refer the v2ray docs for more information: https://www.v2ray.com/en/configuration/routing.html#routing).

5. Enable the service via LuCI.

## Build

Please take a look to [build-openwrt.yml](./.github/workflows/build-openwrt.yml).
