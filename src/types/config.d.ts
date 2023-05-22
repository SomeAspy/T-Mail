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
        spreadSheetID: string;
        tabName: string;
        topLeftCell: string;
        data: string[];
    };
}

import type { Content } from './sendEmail.d.ts';

export interface EmailTemplates {
    highTemp: Content;
    lowTemp: Content;
    highHumidity: Content;
    lowHumidity: Content;
    multipleProblems: Content;
}

export interface GCredentials {
    installed: {
        client_id: string;
        project_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_secret: string;
        redirect_uris: string[];
    };
}
