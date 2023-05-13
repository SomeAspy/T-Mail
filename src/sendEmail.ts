import { TransportOptions, createTransport } from 'nodemailer';

import config from '../config/config.json';

import type { Letter } from './types/sendEmail.d.ts';

export async function sendEmail(temp: number): Promise<void> {
    const transporter = createTransport(config.email.SMTP as TransportOptions);

    const letter: Letter = {
        from: config.email.from,
        to: config.email.to.join(', '),
        subject: config.email.content.subject,
        text: config.email.content.body
            .replace(/%temp%/g, temp.toString())
            .replace(/%min%/g, config.temperature.min.toString())
            .replace(/%max%/g, config.temperature.max.toString()),
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(letter, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
