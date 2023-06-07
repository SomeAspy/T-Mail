#!/bin/bash
# PREBUILT DIST UPDATER
# OPTIONALLY USE A CRON SCRIPT TO RUN ON AN INTERVAL

# get the lastest build and unzip
wget -O /root/dist.zip https://nightly.link/SomeAspy/T-Mail/workflows/build/main/dist.zip
unzip -o /root/dist.zip -d /root/dist

# update this script
mv /root/dist/scripts/dist.sh /root/dist.sh

# Enter working directory
cd rootdist

# update/install dependencies (Twice as raspi0x32 is a bit buggy)
pnpm i -P
pnpm i -P

# restart / start PM2 if it isn't running already
pm2 restart /root/dist/pm2.config.cjs || pm2 start /root/dist/pm2.config.cjs
pm2 save

# cleanup
cd ..
rm /root/dist.zip