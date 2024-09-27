// syncController.js

const {
  addData,
  fetchData,
  deleteData,
  updateData,
} = require("./dataController"); // Make sure you have an updateData function ready

// Function to handle sheet sync for adding, updating, and deleting rows
const syncSheet = async (req, res) => {
  const sheetData = req.body; // The entire sheet data sent from Google Sheets
  try {
    const dbData = await fetchData(); // Fetch all current data from the database

    const newRows = [];
    const rowsToDelete = [];
    const rowsToUpdate = [];

    // Checking for new rows to add and rows to update
    sheetData.forEach((row) => {
      const dbRow = dbData.find((r) => r.item_id === row.item_id);

      if (!dbRow) {
        newRows.push(row); // If no match in DB, this is a new row to add
      } else {
        // Check if any column in the row has changed
        const isDifferent = Object.keys(row).some(
          (key) => row[key] !== dbRow[key]
        );

        if (isDifferent) {
          rowsToUpdate.push(row); // If any column is different, queue the row for update
        }
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

    // Perform the update operation for each modified row
    for (let updatedRow of rowsToUpdate) {
      await updateData(updatedRow.item_id, updatedRow); // Pass the item_id as id and the entire row as data
    }

    // Perform the delete operation for each missing row
    for (let itemId of rowsToDelete) {
      await deleteData(itemId); // You'll need to implement deleteData in dataController
    }

    res
      .status(200)
      .send("Sheet sync completed with additions, updates, and deletions. 💥");
  } catch (error) {
    console.error("Error syncing rows:", error);
    res.status(500).send("Failed to sync rows. 😓");
  }
};

module.exports = { syncSheet };
