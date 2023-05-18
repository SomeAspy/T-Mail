import config from '../config/config.json' assert { type: 'json' };
import { readEnvironment } from './readEnvironment.js';
import { EventEmitter } from 'events';

export const environmentWatcher = new EventEmitter();

export async function startWatcher() {
    for (;;) {
        const environment = await readEnvironment();
        if (
            environment.humidity > config.sensing.humidity.max ||
            environment.humidity < config.sensing.humidity.min ||
            environment.temperature > config.sensing.temperature.max ||
            environment.temperature < config.sensing.temperature.min
        ) {
            environmentWatcher.emit('badEnv', environment);
        }
    }
}
