import config from '../config/config.json' assert { type: 'json' };

console.log(`
T-Mail - https://github.com/SomeAspy/T-Mail
-----------------------------------------------
Current Configs:
    Identifier: ${config.identifier}
    Send To: ${config.email.to.join(', ')}
    Sender From: ${config.email.from}
    Temperature Range: ${config.sensing.temperature.min}°${
    config.sensing.temperature.fahrenheit ? 'F' : 'C'
} - ${config.sensing.temperature.max}°${
    config.sensing.temperature.fahrenheit ? 'F' : 'C'
}
    Humidity Range: ${config.sensing.humidity.min}% - ${
    config.sensing.humidity.max
}%
    Interval: Every ${config.sensing.interval} minute(s)
    Enabled Modules: ${config.email.enabled ? 'Email' : ''} ${
    config.googleSheets.enabled ? 'Google Sheets' : ''
}
-----------------------------------------------
Starting up!
`);

config.email.lastSent = 0;

import { sensorRead } from './sensor.js';
import { checkEnvironment } from './actionHandler.js';

function main() {
    // this is undesirable.
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setInterval(async () => {
        const environment = await sensorRead();
        console.log(`Reading Triggered: ${JSON.stringify(environment)}`);
        await checkEnvironment(environment);
    }, 60000 * config.sensing.interval);
}

main();
