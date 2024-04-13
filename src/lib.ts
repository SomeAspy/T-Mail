import untypedConfig from '../config/config.json' assert { type: 'json' };
import type { Config } from './types/config.js';

const config = untypedConfig as Config;

export function fillBlanks(text: string, temp: number, humidity: number) {
    return text
        .replace(/%temp%/g, temp.toFixed(1))
        .replace(/%minTemp%/g, config.sensing.temperature.min.toString())
        .replace(/%maxTemp%/g, config.sensing.temperature.max.toString())
        .replace(/%identifier%/g, config.identifier)
        .replace(/%humidity%/g, humidity.toFixed(1))
        .replace(/%minHumidity%/g, config.sensing.humidity.min.toString())
        .replace(/%maxHumidity%/g, config.sensing.humidity.max.toString())
        .replace(/%unit%/g, config.sensing.temperature.fahrenheit ? 'F' : 'C')
        .replace(/%time%/g, new Date().toLocaleString());
}
