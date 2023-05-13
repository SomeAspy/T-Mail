# Headline

> An awesome project.

```json
{
    "temperature": {
        "max": 30,
        "min": 15,
        "interval": 5
    },
    "email": {
        "interval": 60,
        "content": {
            "subject": "Temperature Alert!",
            "body": "Temperature is currently {temp}! This is outside of your defined range of {min} to {max}. Please investigate."
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
                "pass": "correct horse battery staple"
            }
        }
    }
}
```

## Parameters:

-   temperature:
    -   `max` - (in C) The upper limit of the safe range (email will be sent if it rises above)
    -   `min` - (in C) The lower limit of the safe range (email will be sent if it falls below)
    -   `interval` - (in minutes) The interval at which to check the temperature
-   email:
    -   `interval` - (in minutes) The interval at which to send emails if the temperature has not returned to the safe range
    -   `content`:
        -   `subject` - The subject of the email
        -   `body` - The body of the email. The following variables are available:
            -   `{temp}` - The current temperature
            -   `{min}` - The lower limit of the safe range
            -   `{max}` - The upper limit of the safe range
    -   `to` - An array of email addresses to send the email to
    -   `from` - The email address to send the email from
-   SMTP:
    -   `host` - The SMTP host to use
    -   `port` - The SMTP port to use
    -   `secure` - Whether or not to use TLS
    -   `auth`:
        -   `type` - The type of authentication to use. Can be `login` or `oauth2`
        -   `user` - The username to use for authentication
        -   `pass` - The password to use for authentication
