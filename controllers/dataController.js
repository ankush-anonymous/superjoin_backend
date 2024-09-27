const httpStatus = require("http-status-codes");
const dataRepository = require("../repositories/dataRepository");

const addData = async (req, res) => {
  const { item_name, stock, price, supplier } = req.body;
  try {
    await dataRepository.addRow([item_name, stock, price, supplier]);
    res.status(httpStatus.CREATED).send("Row added to the database");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error inserting data");
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  const { item_name, stock, price, supplier } = req.body;
  try {
    await dataRepository.updateRow(id, [item_name, stock, price, supplier]);
    res.send("Row updated in the database");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error updating data");
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await dataRepository.deleteRow(id);
    res.send("Row deleted from the database");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error deleting data");
  }
};

const fetchData = async (req, res) => {
  try {
    const result = await dataRepository.fetchRows();
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error fetching data");
  }
};

module.exports = { addData, updateData, deleteData, fetchData };
