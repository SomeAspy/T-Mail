# T-Mail

T-Mail is a simple Node.JS program to interact with a temperature sensor wired to the GPIO pins of a Raspberry Pi.

It can be configured to send emails and log results to a Google Sheet.

## Installation

1.  Clone this repository
2.  Install the [PiGPIO C Library](https://github.com/joan2937/pigpio)
3.  Run `pnpm i`
4.  Run `pnpm build`
5.  Run `pnpm start` This will request root - it is needed to access the GPIO pins.

## Low End Devices (specifically the first RPI 0 with 32 bits)

Prebuilt status: [![Build](https://github.com/SomeAspy/T-Mail/actions/workflows/build.yml/badge.svg)](https://github.com/SomeAspy/T-Mail/actions/workflows/build.yml)

1.  Pre-built can be downloaded at https://nightly.link/SomeAspy/T-Mail/workflows/build/main/build.zip (This will always be up to date)
2.  If this is the first time you are running this, unzip the file and move `prebuilt-update.sh` to the folder outside of the build folder.
3.  Run `prebuilt-update.sh` (This may request root - it is needed to access the GPIO pins.)

-   The script does not automatically restart the program. You can do this manually or use pm2 to handle it.
-   The script will retain configs, and you can put it on a cron task to run it every so often.

## Configuration

See the [documentation](https://tmail.aspy.dev)

### This Repository was commissioned by my manager
