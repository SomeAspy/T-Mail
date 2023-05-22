import { google } from 'googleapis';
import type { EnvironmentReading } from './types/sensor.d.ts';
import config from '../config/config.json' assert { type: 'json' };
import gAuth from '../config/credentials.json' assert { type: 'json' };

const sheets = google.sheets('v4');

export async function append2sheet(): Promise<void> {
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
    await sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: config.googleSheets.spreadSheetID,
        range: `${config.googleSheets.tabName}!${config.googleSheets.topLeftCell}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[]],
        },
    });
}
