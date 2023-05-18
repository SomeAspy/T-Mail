import { environmentWatcher, startWatcher } from './watchEnvironment.js';
import config from '../config/config.json' assert { type: 'json' };
import { sendEmail } from './sendEmail.js';
console.log(`
T-Mail - https://github.com/SomeAspy/T-Mail
-----------------------------------------------
Current Configs:
    Identifier: ${config.identifier}
    Send To: ${config.email.to.join(', ')}
    Sender Email: ${config.email.from}
    Temperature Range: ${config.sensing.temperature.min}°C - ${config.sensing.temperature.max}°C
    Humidity Range: ${config.sensing.humidity.min}% - ${config.sensing.humidity.max}%
    Interval: Every ${config.sensing.interval} minutes
    Enabled Modules: ${config.email.enabled ? 'Email' : ''} ${config.googleSheets.enabled ? 'Google Sheets' : ''}
-----------------------------------------------
Starting up!
`);
void startWatcher();
environmentWatcher.on('badEnv', (environment) => {
    async () => {
        console.log('Bad Environment detected! Running Actions...');
        if (config.email.enabled) {
            await sendEmail(environment.temperature, environment.humidity);
        }
    };
});
