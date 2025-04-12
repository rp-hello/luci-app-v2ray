# luci-app-xray

Luci support for Xray

*Available for OpenWrt 21.02 and later.*

[![Release Version](https://img.shields.io/github/release/rp-hello/luci-app-xray.svg)](https://github.com/rp-hello/luci-app-xray/releases/latest)
[![Latest Release Download](https://img.shields.io/github/downloads/rp-hello/luci-app-xray/latest/total.svg)](https://github.com/rp-hello/luci-app-xray/releases/latest)
[![Total Download](https://img.shields.io/github/downloads/rp-hello/luci-app-xray/total.svg)](https://github.com/rp-hello/luci-app-xray/releases)

This project is forked from <https://github.com/kuoruan/luci-app-xray>.

## Install

### Manual install

1. Download ipk files from [release](https://github.com/rp-hello/luci-app-xray/releases) page

2. Upload files to your router

```
scp luci-app-xray*.ipk root@192.168.8.1:.
```

3. Install package with opkg:

```sh
opkg install luci-app-xray*.ipk
```

Dependencies:

- jshn
- ip (ip-tiny or ip-full)
- ipset
- iptables
- iptables-mod-tproxy
- resolveip
- dnsmasq-full (dnsmasq ipset is required)

For translations, please install ```luci-i18n-xray-*```.

> You may need to remove ```dnsmasq``` before installing this package. (`opkg remove dnsmasq && opkg install dnsmasq-full`)

## Configure

1. Install Xray file from [Xray GitHub release](https://github.com/v2fly/xray-core/releases/latest) or .ipk file form [here](https://github.com/rp-hello/openwrt-xray/releases/latest).

2. Download `luci-app-xray*.ipk` (and `luci-i18n-xray-*.ipk`), upload to your router, and install them.

3. Config Xray file path in LuCI page (http://192.168.8.1/cgi-bin/luci/admin/services/xray).

4. Add your inbound and outbound rules (refer the xray docs for more information: https://www.xray.com/en/configuration/routing.html#routing).

5. Enable the service via LuCI.

## Build

Please take a look to [build-openwrt.yml](./.github/workflows/build-openwrt.yml).

## Update chroute

```shell
curl -s 'https://ftp.apnic.net/stats/apnic/delegated-apnic-latest' | \
   awk -F '|' '{if($2=="CN"&&$3=="ipv4"){printf "%s/%d\n",$4,32-log($5)/log(2)}}' \
   > ./root/etc/luci_xray/chnroute.txt

curl -s 'https://ftp.apnic.net/stats/apnic/delegated-apnic-latest' | \
   awk -F '|' '{if($2=="CN"&&$3=="ipv6"){printf "%s/%d\n",$4,$5}}' \
   > ./root/etc/luci_xray/chnroute6.txt
```
