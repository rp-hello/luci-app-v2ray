#!/bin/sh
set -e

OOM_SCORE_ADJ=${OOM_SCORE_ADJ:-0}
V2RAY_BIN_FILE=${V2RAY_BIN_FILE:-/usr/bin/v2ray}
V2RAY_PID_FILE=${V2RAY_PID_FILE:-/var/run/luci_v2ray.main.pid}

pid=$(cat ${V2RAY_PID_FILE})
echo "${OOM_SCORE_ADJ}" > "/proc/${pid}/oom_score_adj"

exec "${V2RAY_BIN_FILE}" "$@"
