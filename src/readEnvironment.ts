import config from '../config/config.json' assert { type: 'json' };

import {
    EnvironmentReading,
    RawEnvironmentReading,
} from './types/readEnvironment.js';

import dht from 'pigpio-dht';

const sensor = dht(config.sensing.GPIO, config.sensing.sensorType);

export default function readEnvironment(): Promise<EnvironmentReading> {
    return new Promise((resolve, reject) => {
        sensor.read();
        sensor.on('result', (data: RawEnvironmentReading) => {
            console.log(
                `Got reading:\nT=${data.temperature}°C\nH=${data.humidity}%`,
            );
            const returnData: EnvironmentReading = {
                timestamp: Date.now(),
                temperature: Math.round(data.temperature * 10) / 10,
                humidity: Math.round(data.humidity * 10) / 10,
            };
            resolve(returnData);
        });
        sensor.on('badChecksum', () => {
            reject('badChecksum');
        });
    });
}
