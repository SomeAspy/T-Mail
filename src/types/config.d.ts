export interface Config {
    identifier: string;
    sensing: {
        interval: number;
        GPIO: number;
        sensorType: number;
        temperature: {
            min: number;
            max: number;
        };
        humidity: {
            min: number;
            max: number;
        };
    };
    email: {
        intervalWhileTriggered: number;
        content: {
            subject: string;
            body: string;
        };
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
        oAuthClientSecret: string;
        oAuthClientId: string;
    };
}
