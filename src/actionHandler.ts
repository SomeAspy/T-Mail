import config from '../config/config.json' assert { type: 'json' };
import emailTemplates from '../config/emailTemplates.json' assert { type: 'json' };
import { sendEmail } from './sendEmail.js';

import type { EnvironmentReading } from './types/watchEnvironment.js';

export async function checkEnvironment(
    environment: EnvironmentReading,
): Promise<boolean> {
    if (
        config.email.lastSent + config.email.intervalWhileTriggered * 60 >
        Math.round(Date.now() / 1000)
    ) {
        if (environment.temperature < config.sensing.temperature.min) {
            return await sendEmail(emailTemplates.lowTemp, environment);
        }
        if (environment.temperature > config.sensing.temperature.max) {
            return await sendEmail(emailTemplates.highTemp, environment);
        }
        if (environment.humidity < config.sensing.humidity.min) {
            return await sendEmail(emailTemplates.lowHumidity, environment);
        }
        if (environment.humidity > config.sensing.humidity.max) {
            return await sendEmail(emailTemplates.highHumidity, environment);
        }
        return true;
    } else {
        return false;
    }
}
