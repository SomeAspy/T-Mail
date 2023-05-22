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

import type { EmailContent } from './sendEmail.d.ts';

export interface EmailTemplates {
    highTemp: EmailContent;
    lowTemp: EmailContent;
    highHumidity: EmailContent;
    lowHumidity: EmailContent;
    multipleProblems: EmailContent;
}

export interface GCredentials {
    type: 'service_account';
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
}
