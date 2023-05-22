export interface Config {
    identifier: string;
    sensing: {
        interval: number;
        GPIO: number;
        sensorType: number;
        humidity: {
            min: number;
            max: number;
        };
        temperature: {
            fahrenheit: boolean;
            min: number;
            max: number;
        };
    };
    email: {
        enabled: boolean;
        intervalWhileTriggered: number;
        to: string[];
        from: string;
        SMTP: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                type: string;
                user: string;
                pass: string;
            };
        };
        lastSent: number;
    };
    googleSheets: {
        enabled: boolean;
        oAuthClientSecret: string;
        oAuthClientId: string;
    };
}

import type { Content } from './sendEmail.d.ts';

export interface EmailTemplates {
    highTemp: Content;
    lowTemp: Content;
    highHumidity: Content;
    lowHumidity: Content;
}
