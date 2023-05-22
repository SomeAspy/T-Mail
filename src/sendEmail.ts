import { TransportOptions, createTransport } from 'nodemailer';

import config from '../config/config.json' assert { type: 'json' };

import type { Letter, Content } from './types/sendEmail.d.ts';
import { fillBlanks } from './lib.js';
import { EnvironmentReading } from './types/watchEnvironment.js';

export async function sendEmail(
    content: Content,
    environment: EnvironmentReading,
): Promise<boolean> {
    const transporter = createTransport(config.email.SMTP as TransportOptions);

    const letter: Letter = {
        from: config.email.from,
        to: config.email.to.join(', '),
        body: fillBlanks(
            content.body,
            environment.temperature,
            environment.humidity,
        ),
        subject: fillBlanks(
            content.subject,
            environment.temperature,
            environment.humidity,
        ),
    };

    try {
        await Promise.race([
            transporter.sendMail(letter),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject('Timeout');
                }, 10000);
            }),
        ]);
        config.email.lastSent = Math.round(Date.now() / 1000);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
