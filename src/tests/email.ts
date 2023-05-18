import { sendEmail } from '../sendEmail.js';

console.log('Starting Email test...');

await sendEmail(
    {
        subject: 'Test Email!',
        body: 'If you are getting this it worked!',
    },
    { temperature: 24, humidity: 37, timestamp: 1 },
).then((result) => {
    console.log(
        `Email test ${result ? 'Passed! Check your inbox.' : 'Failed!'}`,
    );
    process.exit(result ? 0 : 1);
});
