#!/bin/bash
# PREBUILT DIST UPDATER
# OPTIONALLY USE A CRON SCRIPT TO RUN ON AN INTERVAL

# get the lastest build and unzip
wget -O dist.zip https://nightly.link/SomeAspy/T-Mail/workflows/build/main/dist.zip
unzip -o dist.zip -d dist

# update this script
mv dist/scripts/dist.sh dist.sh

# Enter working directory
cd dist

# update/install dependencies (Twice as raspi0x32 is a bit buggy)
pnpm i -P
pnpm i -P

# restart / start PM2 if it isn't running already
pm2 restart pm2.config.js || pm2 start pm2.config.js

# cleanup
cd ..
rm dist.zip