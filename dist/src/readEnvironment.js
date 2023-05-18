import config from '../config/config.json' assert { type: 'json' };
import dht from 'pigpio-dht';
const sensor = dht(config.sensing.GPIO, config.sensing.sensorType);
export async function readEnvironment() {
    return new Promise((resolve) => {
        sensor.read();
        sensor.on('result', (data) => {
            const returnData = {
                timestamp: Date.now(),
                temperature: Math.round(data.temperature * 10) / 10,
                humidity: Math.round(data.humidity * 10) / 10,
            };
            console.log(`Temperature: ${returnData.temperature}°C | Humidity: ${returnData.humidity}%`);
            resolve(returnData);
        });
    });
}
