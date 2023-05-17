import { TransportOptions, createTransport } from 'nodemailer';

import config from '../config/config.json';

import type { Letter } from './types/sendEmail.d.ts';

export async function sendEmail(temp: number, humidity: number): Promise<void> {
    const transporter = createTransport(config.email.SMTP as TransportOptions);

    const letter: Letter = {
        from: config.email.from,
        to: config.email.to.join(', '),
        subject: config.email.content.subject,
        text: config.email.content.body
            .replace(/%temp%/g, temp.toString())
            .replace(/%minTemp%/g, config.sensing.temperature.min.toString())
            .replace(/%maxTemp%/g, config.sensing.temperature.max.toString())
            .replace(/%identifier%/g, config.identifier)
            .replace(/%humidity%/g, humidity.toString())
            .replace(/%minHumidity%/g, config.sensing.humidity.min.toString())
            .replace(/%maxHumidity%/g, config.sensing.humidity.max.toString()),
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
