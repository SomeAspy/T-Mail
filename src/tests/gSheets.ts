import { append2sheet } from '../gSheets.js';

const data = [new Date().toLocaleString(), 'Name', 'Temperature', 'Email'];

await append2sheet();
