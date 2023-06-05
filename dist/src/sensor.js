import config from '../config/config.json' assert { type: 'json' };
import dht from 'pigpio-dht';
const sensor = dht(config.sensing.GPIO, config.sensing.sensorType);
export async function sensorRead() {
    return new Promise((resolve) => {
        sensor.read();
        sensor.on('start', () => {
            sensor.once('result', (data) => {
                sensor.removeAllListeners();
                resolve({
                    timestamp: new Date(),
                    temperature: config.sensing.temperature.fahrenheit
                        ? data.temperature * 1.8 + 32
                        : data.temperature,
                    humidity: data.humidity,
                });
            });
        });
    });
}
