import config from '../config/config.json' assert { type: 'json' };
console.log(`
T-Mail - https://github.com/SomeAspy/T-Mail
-----------------------------------------------
Current Configs:
    Identifier: ${config.identifier}
    Send To: ${config.email.to.join(', ')}
    Sender From: ${config.email.from}
    Temperature Range: ${config.sensing.temperature.min}°${config.sensing.temperature.fahrenheit ? 'F' : 'C'} - ${config.sensing.temperature.max}°${config.sensing.temperature.fahrenheit ? 'F' : 'C'}
    Humidity Range: ${config.sensing.humidity.min}% - ${config.sensing.humidity.max}%
    Interval: Every ${config.sensing.interval} minute(s)
    Enabled Modules: ${config.email.enabled ? 'Email' : ''} ${config.googleSheets.enabled ? 'Google Sheets' : ''}
-----------------------------------------------
Starting up!
`);
import { sensorRead } from './sensor.js';
import { fireEmailEvent } from './actionHandler.js';
import { append2sheet } from './gSheets.js';
function main() {
    config.email.lastSent =
        Date.now() - 60000 * config.email.intervalWhileTriggered;
    setInterval(async () => {
        const environment = await sensorRead();
        console.log(`Reading Triggered: ${JSON.stringify(environment)}`);
        if (config.email.enabled) {
            try {
                await fireEmailEvent(environment);
            }
            catch (error) {
                console.error(error);
            }
        }
        if (config.googleSheets.enabled) {
            try {
                await append2sheet(environment);
            }
            catch (error) {
                console.error(error);
            }
        }
    }, 60000 * config.sensing.interval);
}
main();
