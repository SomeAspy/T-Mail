#!/bin/bash
# PREBUILT DIST UPDATER
# OPTIONALLY USE A CRON SCRIPT TO RUN ON AN INTERVAL

shopt -s dotglob

# Save important files
mv dist/node_modules tmailNodeModules.old
mv dist/config tmailConfig.old
mv dist/package.json tmailPackage.json.old

wget -O dist.zip https://nightly.link/SomeAspy/T-Mail/workflows/build/main/build.zip
unzip -o dist.zip -d dist

# copy over the prebuilt updater
cp dist/scripts/prebuilt-update.sh ./prebuilt-update.sh

# return important files
mkdir dist/node_modules
mv tmailNodeModules.old/**/* dist/node_modules
mv tmailConfig.old/**/* dist/config
rm -rf tmailNodeModules.old

if (cmp -s dist/package.json tmailPackage.json.old) then
    echo "No changes to package.json"
    rm tmailPackage.json.old
else
    cd dist

    # update packages
    pnpm i -P

    # on RPI0 the first package grab often fails
    pnpm i -P

    cd ..
    rm tmailPackage.json.old
fi
