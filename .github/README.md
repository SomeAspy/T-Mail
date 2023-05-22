# T-Mail

T-Mail is a simple Node.JS program to interact with a temperature sensor wired to the GPIO pins of a Raspberry Pi.

It can be configured to send emails and log results to a Google Sheet.

## Installation

1.  Clone this repository
2.  Install the [PiGPIO C Library](https://github.com/joan2937/pigpio)
3.  Run `pnpm i`
4.  Run `pnpm build`
5.  Run `pnpm start` This will request root - it is needed to access the GPIO pins.

## Configuration

See the [documentation](https://tmail.aspy.dev)

### This Repository was commissioned by my manager
