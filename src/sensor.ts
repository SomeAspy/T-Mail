import config from '../config/config.json' assert { type: 'json' };
import dht from 'pigpio-dht';
import {
    EnvironmentReading,
    RawEnvironmentReading,
} from './types/watchEnvironment.js';

const sensor = dht(config.sensing.GPIO, config.sensing.sensorType);

export function sensorRead(): EnvironmentReading {
    const returnData: EnvironmentReading = {
        timestamp: -1,
        temperature: 0,
        humidity: 0,
    };
    sensor.read();
    const sensorRetry = setInterval(() => {
        // Don't spam the sensor
        console.log('Reading environment...');
        sensor.once('result', (data: RawEnvironmentReading) => {
            console.log('Got environment data!');
            returnData.timestamp = Date.now();
            returnData.temperature = config.sensing.temperature.fahrenheit
                ? (data.temperature * 9) / 5 + 32
                : data.temperature;
            returnData.humidity = data.humidity;
        });
        if (returnData.timestamp !== -1) {
            clearInterval(sensorRetry);
        }
    }, 500);
    return returnData;
}
