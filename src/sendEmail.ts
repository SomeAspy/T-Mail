import { TransportOptions, createTransport } from 'nodemailer';
import { fillBlanks } from './lib.js';

import config from '../config/config.json' assert { type: 'json' };

import type { Letter } from './types/sendEmail.d.ts';

export async function sendEmail(
    temp: number,
    humidity: number,
): Promise<boolean> {
    const transporter = createTransport(config.email.SMTP as TransportOptions);

    const letter: Letter = {
        from: config.email.from,
        to: config.email.to.join(', '),
        subject: fillBlanks(config.email.content.subject, temp, humidity),
        text: fillBlanks(config.email.content.body, temp, humidity),
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
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
