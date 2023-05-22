import { append2sheet } from '../gSheets.js';

await append2sheet({ temperature: 1, humidity: 2, timestamp: new Date() });
