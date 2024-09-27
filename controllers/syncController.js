// syncController.js

const { addData, fetchData, deleteData } = require("./dataController"); // Make sure you have a deleteData function ready

// Function to handle sheet sync for adding new rows and deleting missing ones
const syncSheet = async (req, res) => {
  const sheetData = req.body; // The entire sheet data sent from Google Sheets
  try {
    const dbData = await fetchData(); // Fetch all current data from the database

    const newRows = [];
    const rowsToDelete = [];

    // Checking for new rows to add
    sheetData.forEach((row) => {
      const dbRow = dbData.find((r) => r.item_id === row.item_id);
      if (!dbRow) {
        newRows.push(row); // If no match in DB, this is a new row to add
      }
    });

    // Checking for rows to delete
    dbData.forEach((dbRow) => {
      const sheetRow = sheetData.find((r) => r.item_id === dbRow.item_id);
      if (!sheetRow) {
        rowsToDelete.push(dbRow.item_id); // If no match in Sheet, this row should be deleted
      }
    });

    // Perform the add operation for each new row
    for (let newRow of newRows) {
      await addData(newRow);
    }

    // Perform the delete operation for each missing row
    for (let itemId of rowsToDelete) {
      await deleteData(itemId); // You'll need to implement deleteData in dataController
    }

    res
      .status(200)
      .send("Sheet sync completed with additions and deletions. 💥");
  } catch (error) {
    console.error("Error syncing rows:", error);
    res.status(500).send("Failed to sync rows. 😓");
  }
};

module.exports = { syncSheet };
