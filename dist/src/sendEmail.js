import { createTransport } from 'nodemailer';
import config from '../config/config.json' assert { type: 'json' };
import { fillBlanks } from './lib.js';
export async function sendEmail(content, environment) {
    const transporter = createTransport(config.email.SMTP);
    const letter = {
        from: config.email.from,
        to: config.email.to.join(', '),
        text: fillBlanks(content.text, environment),
        subject: fillBlanks(content.subject, environment),
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
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
