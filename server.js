const express = require('express');
const { google } = require('googleapis');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Google Sheets API credentials
const apiKey = 'YOUR_GOOGLE_API_KEY';
const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const range = 'Sheet1!A1:B10'; // Adjust range as per your sheet

// Function to fetch data from Google Sheets
async function getSheetData() {
    const sheets = google.sheets({ version: 'v4', auth: apiKey });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    return response.data.values;
}

// Function to fetch data from Price API
async function getPriceData() {
    try {
        const response = await axios.get('YOUR_PRICE_API_ENDPOINT');
        return response.data;
    } catch (error) {
        console.error('Error fetching price data:', error);
        return null;
    }
}

// Example endpoint to fetch combined data
app.get('/api/data', async (req, res) => {
    try {
        const sheetData = await getSheetData();
        const priceData = await getPriceData();
        res.json({ sheetData, priceData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
