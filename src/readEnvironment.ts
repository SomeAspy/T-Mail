import config from '../config/config.json' assert { type: 'json' };

import {
    EnvironmentReading,
    RawEnvironmentReading,
} from './types/readEnvironment.js';

import dht from 'pigpio-dht';

const sensor = dht(config.sensing.GPIO, config.sensing.sensorType);

export default async function readEnvironment(): Promise<EnvironmentReading> {
    return new Promise((resolve) => {
        setInterval(() => sensor.read(), 3000);
        sensor.on('result', (data: RawEnvironmentReading) => {
            const returnData: EnvironmentReading = {
                timestamp: Date.now(),
                temperature: Math.round(data.temperature * 10) / 10,
                humidity: Math.round(data.humidity * 10) / 10,
            };
            console.log(
                `Temperature: ${returnData.temperature}°C | Humidity: ${returnData.humidity}%`,
            );
            resolve(returnData);
        });
    });
}
