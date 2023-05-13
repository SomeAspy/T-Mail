export interface Config {
    temperature: {
        min: number;
        max: number;
        interval: number;
    };
    email: {
        interval: number;
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
}
