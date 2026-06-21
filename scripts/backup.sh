#!/usr/bin/env bash
set -euo pipefail
TS=$(date +%Y%m%d_%H%M%S)
OUT=${1:-./backups}
mkdir -p "$OUT"
mongodump --uri="${MONGO_URI:-mongodb://localhost:27017/railwaygpt}" --archive="$OUT/railwaygpt_$TS.archive" --gzip
echo "Backup written: $OUT/railwaygpt_$TS.archive"
