import config from '../config/config.json' assert { type: 'json' };
export function fillBlanks(text, readings) {
    return text
        .replace(/%temp%/g, readings.temperature.toFixed(1))
        .replace(/%minTemp%/g, config.sensing.temperature.min.toString())
        .replace(/%maxTemp%/g, config.sensing.temperature.max.toString())
        .replace(/%identifier%/g, config.identifier)
        .replace(/%humidity%/g, readings.humidity.toFixed(1))
        .replace(/%minHumidity%/g, config.sensing.humidity.min.toString())
        .replace(/%maxHumidity%/g, config.sensing.humidity.max.toString())
        .replace(/%unit%/g, config.sensing.temperature.fahrenheit ? 'F' : 'C')
        .replace(/%time%/g, readings.timestamp.toLocaleString());
}
