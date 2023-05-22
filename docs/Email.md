# T-Mail E-Mail

T-Mail can send emails when the temperature or humidity is outside of the safe range.

## Setup

1. Using your favorite email host (or your own SMTP server), create an email account to send emails from.
2. Find the documentation for said email server. ([for example with Gmail](https://support.google.com/mail/answer/7126229?hl=en#zippy=%2Cstep-change-smtp-other-settings-in-your-email-client))
    - You will need the following information:
        - SMTP Host
        - SMTP Port
        - SMTP Username
        - SMTP Password (or App Password if using 2FA)
        - Whether or not to use TLS/SSL
        - The email paired with these credentials
3. Put the information in `config/config.json`
    - `email.enabled` - Set to true
    - `email.from` - The email you are providing credentials for
    - `email.to` - An array of emails to send alerts to
    - `email.SMTP`:
        - `host` - The SMTP host
        - `port` - The SMTP port
        - `secure` - Whether or not to use TLS/SSL - if you are using port 465, this should generally be `true`
        - `auth`:
            - `type` - The type of authentication to use. Can be `login` or `oauth2`
            - `user` - The SMTP username
            - `pass` - The SMTP password
4. You can test the email config by running
    1. `pnpm i` (If you have not already done so)
    2. `pnpm tsx src/test/email.ts`
    3. If you get an email, it works!

## Templates

T-Mail includes a very minimal template system.
The default templates are in `config/emailTemplates.json`
Included are:

-   High temperature alert
-   Low temperature alert
-   High humidity alert
-   Low humidity alert
-   Multiple Alerts alert

Each template is made up of a `subject` and `text`. these correspond to the subject and body of the email respectively.

The following variables are available:

-   `%temp%` - The current temperature
-   `%minTemp%` - The lower limit of the safe temperature range
-   `%maxTemp%` - The upper limit of the safe range
-   `%humidity%` - The current humidity
-   `%minHumidity%` - The lower limit of the safe humidity range
-   `%maxHumidity%` - The upper limit of the safe humidity range
-   `%identifier%` - The identifier of the device
-   `%time%` - The time the sensor was checked

### Custom Variables

Advanced users can add custom variables to the template system.

To do this, you must edit `src/lib.ts` and add `.replace()` arguments to the `fillBlanks()` function.
