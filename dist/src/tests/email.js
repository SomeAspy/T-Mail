import { sendEmail } from '../sendEmail.js';
console.log('Starting Email test...');
sendEmail(24, 33).then((result) => {
    console.log(`Email test result: ${result ? 'passed' : 'failed'}!`);
    process.exit(0);
});
