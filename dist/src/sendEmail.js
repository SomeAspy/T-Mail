import { createTransport } from 'nodemailer';
import config from '../config/config.json' assert { type: 'json' };
export async function sendEmail(temp, humidity) {
    const transporter = createTransport(config.email.SMTP);
    const letter = {
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
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
