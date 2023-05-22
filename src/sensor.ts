import config from '../config/config.json' assert { type: 'json' };
import dht from 'pigpio-dht';
import type {
    EnvironmentReading,
    RawEnvironmentReading,
} from './types/sensor.d.ts';

const sensor = dht(config.sensing.GPIO, config.sensing.sensorType);
export async function sensorRead(): Promise<EnvironmentReading> {
    return new Promise((resolve) => {
        sensor.read();
        sensor.on('start', () => {
            sensor.once('result', (data: RawEnvironmentReading) => {
                sensor.removeAllListeners();
                resolve({
                    timestamp: Date.now(),
                    temperature: config.sensing.temperature.fahrenheit
                        ? data.temperature * 1.8 + 32
                        : data.temperature,
                    humidity: data.humidity,
                });
            });
        });
    });
}
