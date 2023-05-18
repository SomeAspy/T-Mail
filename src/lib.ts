import config from '../config/config.json' assert { type: 'json' };

export function fillBlanks(text: string, temp: number, humidity: number) {
    return text
        .replace(/%temp%/g, temp.toString())
        .replace(/%minTemp%/g, config.sensing.temperature.min.toString())
        .replace(/%maxTemp%/g, config.sensing.temperature.max.toString())
        .replace(/%identifier%/g, config.identifier)
        .replace(/%humidity%/g, humidity.toString())
        .replace(/%minHumidity%/g, config.sensing.humidity.min.toString())
        .replace(/%maxHumidity%/g, config.sensing.humidity.max.toString())
        .replace(/%unit%/g, config.sensing.temperature.fahrenheit ? 'F' : 'C');
}
