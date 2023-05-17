# T-Mail

Config:

```json
{
    "identifier": "Dev-1",
    "sensing": {
        "interval": 5,
        "GPIO": 4,
        "sensorType": 22,
        "humidity": {
            "max": 80,
            "min": 20
        },
        "temperature": {
            "max": 30,
            "min": 15
        }
    },
    "email": {
        "intervalWhileTriggered": 60,
        "content": {
            "subject": "Temperature Alert!",
            "body": "Environment at %identifier% is currently %temp%°C and %humidity%%! This is outside of your defined range of %minTemp%°C to %maxTemp%°C or %minHumidity%% to %maxHumidity%%. Please investigate."
        },
        "to": ["admin@example.com"],
        "from": "noreply@example.com",
        "SMTP": {
            "host": "smtp.example.com",
            "port:": 465,
            "secure": true,
            "auth": {
                "type": "login",
                "user": "noreply@example.com",
                "pass": "Correct Horse Battery Staple"
            }
        }
    },
    "googleSheets": {
        "oAuthClientSecret": "",
        "oAuthClientId": ""
    }
}
```

## Parameters:

-   `identifier` - A unique identifier for this device
-   `sensing`:
    -   `interval` - (in minutes) The interval at which to take readings
    -   `GPIO` - The GPIO pin to use for sensing
    -   `sensorType` - The type of sensor to use. Can be `11` or `22`
    -   `humidity`:
        -   `max` - (in %) The upper limit of the safe range (email will be sent if it rises above)
        -   `min` - (in %) The lower limit of the safe range (email will be sent if it falls below)
    -   `temperature`:
        -   `max` - (in C) The upper limit of the safe range (email will be sent if it rises above)
        -   `min` - (in C) The lower limit of the safe range (email will be sent if it falls below)
-   `email`:
    -   `intervalWhenTriggered` - (in minutes) The interval at which to send emails if the temperature has not returned to the safe range
    -   `content`:
        -   `subject` - The subject of the email
        -   `body` - The body of the email. The following variables are available:
            -   `%temp%` - The current temperature
            -   `%minTemp%` - The lower limit of the safe temperature range
            -   `%maxTemp%` - The upper limit of the safe range
            -   `%humidity%` - The current humidity
            -   `%minHumidity%` - The lower limit of the safe humidity range
            -   `%maxHumidity%` - The upper limit of the safe humidity range
            -   `%identifier%` - The identifier of the device
    -   `to` - An array of email addresses to send the email to
    -   `from` - The email address to send the email from
-   `SMTP`:
    -   `host` - The SMTP host to use
    -   `port` - The SMTP port to use
    -   `secure` - Whether or not to use TLS
    -   `auth`:
        -   `type` - The type of authentication to use. Can be `login` or `oauth2`
        -   `user` - The username to use for authentication
        -   `pass` - The password to use for authentication
-   `googleSheets`:
    -   `oAuthClientSecret` - The OAuth client secret to use for Google Sheets
    -   `oAuthClientId` - The OAuth client ID to use for Google Sheets
