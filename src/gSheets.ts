import { google } from 'googleapis';
import config from '../config/config.json' assert { type: 'json' };
import gAuth from '../config/credentials.json' assert { type: 'json' };
import { fillBlanks } from './lib.js';
import { EnvironmentReading } from './types/sensor.js';

export async function append2sheet(
    readings: EnvironmentReading,
): Promise<void> {
    const parsedData: string[] = [];
    config.googleSheets.data.forEach((item) => {
        parsedData.push(fillBlanks(item, readings));
    });

    const jwtClient = new google.auth.JWT(
        gAuth.client_email,
        undefined,
        gAuth.private_key,
        ['https://www.googleapis.com/auth/spreadsheets'],
    );
    jwtClient.authorize((err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Preparing to write to Google Sheets...');
    });
    await google.sheets('v4').spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: config.googleSheets.spreadSheetID,
        range: `${config.googleSheets.tabName}!${config.googleSheets.topLeftCell}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [parsedData],
        },
    });
}
