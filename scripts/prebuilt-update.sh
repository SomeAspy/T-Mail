#!/bin/bash
# PREBUILT DIST UPDATER
# OPTIONALLY USE A CRON SCRIPT TO RUN ON AN INTERVAL

shopt -s dotglob

# Save important files
mv build/node_modules tmailNodeModules.old
mv build/config tmailConfig.old
mv build/package.json tmailPackage.json.old

wget -O build.zip https://nightly.link/SomeAspy/T-Mail/workflows/build/main/build.zip
unzip -of build.zip -d build

# copy over the prebuilt updater
cp build/scripts/prebuilt-update.sh ./prebuilt-update.sh

# return important files
mkdir build/node_modules
mv tmailNodeModules.old/**/* build/node_modules
mv tmailConfig.old/**/* build/config
rm -rf tmailNodeModules.old

if (cmp -s build/package.json tmailPackage.json.old) then
    echo "No changes to package.json"
    rm tmailPackage.json.old
else
    cd build

    # update packages
    pnpm i --production

    # on RPI0 the first package grab often fails
    pnpm i --production

    cd ..
    rm tmailPackage.json.old
fi
