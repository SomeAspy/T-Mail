# T-Mail Scripts

Included are scripts, mainly intended for the prebuilt dist for low end devices that cannot handle TSC.

You can wget this build at https://nightly.link/SomeAspy/T-Mail/workflows/build/main/build.zip

## Setup of the update script (`prebuilt-update.sh`)

Script prerequisites:

-   `unzip`
-   `wget`
-   `pnpm`
-   `pigpio`
    -   `make`
    -   `g++`
    -   `python3`

This script is made for the prebuilt dist only

1.  Pre-built can be downloaded at https://nightly.link/SomeAspy/T-Mail/workflows/build/main/build.zip (This will always be up to date)
2.  If this is the first time you are running this, unzip the file and move `prebuilt-update.sh` to the folder outside of the build folder.
3.  Run `prebuilt-update.sh` (This may request root - it is needed to access the GPIO pins.)

-   The script does not automatically restart the program. You can do this manually or use pm2 to handle it.
    -   A PM2 config is included in the build.
-   The script will retain configs, and you can put it on a cron task to run it every so often.
