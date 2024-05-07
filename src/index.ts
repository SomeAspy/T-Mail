import untypedConfig from '../config/config.json' with { type: 'json' };

import type { Config } from './types/config.js';

const config = untypedConfig as Config;

console.log(`
T-Mail - https://github.com/SomeAspy/T-Mail
-----------------------------------------------
Current Configs:
    Identifier: ${config.identifier}
    Send To: ${config.email.to.join(', ')}
    Sender From: ${config.email.from}
    Temperature Range: ${config.sensing.temperature.min.toString()}°${
    config.sensing.temperature.fahrenheit ? 'F' : 'C'
} - ${config.sensing.temperature.max.toString()}°${
    config.sensing.temperature.fahrenheit ? 'F' : 'C'
}
    Humidity Range: ${config.sensing.humidity.min.toString()}% - ${
    config.sensing.humidity.max.toString()
}%
    Interval: Every ${config.sensing.interval.toString()} minute(s)
    Enabled Modules: ${config.email.enabled ? 'Email' : ''} ${
    config.googleSheets.enabled ? 'Google Sheets' : ''
}
-----------------------------------------------
Starting up!
`);

import { sensorRead } from './sensor.js';
import { fireEmailEvent } from './actionHandler.js';

function main() {
    config.email.lastSent =
        Date.now() - 60000 * config.email.intervalWhileTriggered;
    // this is undesirable.
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setInterval(async () => {
        const environment = await sensorRead();
        console.log(`Reading Triggered: ${JSON.stringify(environment)}`);
        if (config.email.enabled) {
            await fireEmailEvent(environment);
        }
    }, 60000 * config.sensing.interval);
}

main();
