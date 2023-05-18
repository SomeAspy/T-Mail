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
        content: {
            subject: string;
            body: string;
        };
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
    };
    googleSheets: {
        enabled: boolean;
        oAuthClientSecret: string;
        oAuthClientId: string;
    };
}
