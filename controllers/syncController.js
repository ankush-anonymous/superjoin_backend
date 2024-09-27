// syncController.js

const { addData, fetchData } = require("./dataController");

// Function to handle sheet sync for adding new rows
const syncSheet = async (req, res) => {
  const sheetData = req.body; // The entire sheet data sent from Google Sheets
  console.log(sheetData);
  try {
    const dbData = await fetchData(); // Fetch all current data from the database

    const newRows = [];

    sheetData.forEach((row) => {
      const dbRow = dbData.find((r) => r.item_id === row.item_id);

      if (!dbRow) {
        newRows.push(row);
      }
    });

    // Perform the add operation for each new row
    for (let newRow of newRows) {
      await addData(newRow);
    }

    res.status(200).send("Sheet sync for new rows completed successfully.");
  } catch (error) {
    console.error("Error syncing new rows:", error);
    res.status(500).send("Failed to sync new rows.");
  }
};

module.exports = { syncSheet };
