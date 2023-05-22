import config from '../config/config.json' assert { type: 'json' };
import emailTemplates from '../config/emailTemplates.json' assert { type: 'json' };
import { sendEmail } from './sendEmail.js';

import type { EnvironmentReading } from './types/sensor.js';

export async function fireEmailEvent(
    environment: EnvironmentReading,
): Promise<boolean> {
    if (
        Date.now() - config.email.lastSent >
        60000 * config.email.intervalWhileTriggered
    ) {
        const triggered = {
            trigger: 0,
            count: 0,
        };
        if (environment.temperature < config.sensing.temperature.min) {
            triggered.trigger = 1;
            triggered.count++;
        }
        if (environment.temperature > config.sensing.temperature.max) {
            triggered.trigger = 2;
            triggered.count++;
        }
        if (environment.humidity < config.sensing.humidity.min) {
            triggered.trigger = 3;
            triggered.count++;
        }
        if (environment.humidity > config.sensing.humidity.max) {
            triggered.trigger = 4;
            triggered.count++;
        }
        if (triggered.count === 0) {
            return false;
        } else if (triggered.count > 1) {
            return await sendEmail(
                emailTemplates.multipleProblems,
                environment,
            );
        } else {
            switch (triggered.trigger) {
                case 1:
                    return await sendEmail(emailTemplates.lowTemp, environment);
                case 2:
                    return await sendEmail(
                        emailTemplates.highTemp,
                        environment,
                    );
                case 3:
                    return await sendEmail(
                        emailTemplates.lowHumidity,
                        environment,
                    );
                case 4:
                    return await sendEmail(
                        emailTemplates.highHumidity,
                        environment,
                    );
                default:
                    console.log('Not Sending Email: Within Range.');
                    return false;
            }
        }
    } else {
        return false;
    }
}
