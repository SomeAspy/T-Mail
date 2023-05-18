import { sendEmail } from '../sendEmail.js';

console.log('Starting Email test...');

await sendEmail(10, 20).then((result) => {
    console.log(
        `Email test ${result ? 'Passed! Check your inbox.' : 'Failed!'}`,
    );
    process.exit(result ? 0 : 1);
});
