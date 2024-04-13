import { TransportOptions, createTransport } from 'nodemailer';

import untypedConfig from '../config/config.json' assert { type: 'json' };

import type { Config } from './types/config.js';

const config = untypedConfig as Config;

import type { Letter, Content } from './types/sendEmail.d.ts';
import { fillBlanks } from './lib.js';
import type { EnvironmentReading } from './types/sensor.d.ts';

export async function sendEmail(
    content: Content,
    environment: EnvironmentReading,
): Promise<boolean> {
    const transporter = createTransport(config.email.SMTP as TransportOptions);
    const letter: Letter = {
        from: config.email.from,
        to: config.email.to.join(', '),
        text: fillBlanks(
            content.text,
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
        config.email.lastSent = Date.now();
        console.log('Email Sent.');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
