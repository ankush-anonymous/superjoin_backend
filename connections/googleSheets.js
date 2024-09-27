// googleSheets.js
const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const jwt = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

const connectSheets = async () => {
  try {
    // Initialize the Google Spreadsheet document
    const doc = new GoogleSpreadsheet(
      "1Jo4vcP-wAhBOP2-D3TveOFZ8AebrSpaYMO5SPxLZljY",
      jwt
    );

    // Load document info
    await doc.loadInfo();
    console.log(`Connected to Google Sheet: ${doc.title}`);

    return doc; // Return the Google Sheets document object if needed
  } catch (error) {
    console.error("Error connecting to Google Sheets:", error);
  }
};

// Export the function
module.exports = { connectSheets };
