#!/bin/bash
# PREBUILT DIST UPDATER
# OPTIONALLY USE A CRON SCRIPT TO RUN ON AN INTERVAL

# Use root
cd /root/

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
pm2 restart /root/dist/pm2.config.cjs || pm2 start root/dist/pm2.config.cjs
pm2 save

# cleanup
cd ..
rm dist.zip