#!/usr/bin/env bash
set -euo pipefail
ARCHIVE=${1:?Usage: restore.sh path/to/archive}
mongorestore --uri="${MONGO_URI:-mongodb://localhost:27017/railwaygpt}" --archive="$ARCHIVE" --gzip --drop
echo "Restore complete from $ARCHIVE"
