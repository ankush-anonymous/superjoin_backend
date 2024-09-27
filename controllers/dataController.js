const httpStatus = require("http-status-codes");
const dataRepository = require("../repositories/dataRepository");

// Function to add data (for internal use)
const addData = async (data) => {
  const { item_name, stock, price } = data;
  try {
    await dataRepository.addRow([item_name, stock, price]);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data");
  }
};

// Function to add data (for API route)
const addDataRoute = async (req, res) => {
  try {
    await addData(req.body);
    res.status(httpStatus.CREATED).send("Row added to the database");
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// Function to update data (for internal use)
const updateData = async (id, data) => {
  const { item_name, stock, price } = data;

  // Validate if all required fields are present
  if (!item_name || stock === undefined || price === undefined) {
    throw new Error("Missing required fields for updating data");
  }

  try {
    await dataRepository.updateRow(id, [item_name, stock, price]);
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error("Error updating data");
  }
};

// Function to update data (for API route)
const updateDataRoute = async (req, res) => {
  const { id } = req.params;
  try {
    await updateData(id, req.body);
    res.send("Row updated in the database");
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// Function to delete data (for internal use)
const deleteData = async (id) => {
  try {
    await dataRepository.deleteRow(id);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Error deleting data");
  }
};

// Function to delete data (for API route)
const deleteDataRoute = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteData(id);
    res.send("Row deleted from the database");
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// Function to fetch data (for internal use)
const fetchData = async () => {
  try {
    const result = await dataRepository.fetchRows();
    return result.rows;
  } catch (error) {
    console.error("Error fetching data from repository:", error);
    throw new Error("Error fetching data");
  }
};

// Function to fetch data (for API route)
const fetchDataRoute = async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  addData,
  addDataRoute,
  updateData,
  updateDataRoute,
  deleteData,
  deleteDataRoute,
  fetchData,
  fetchDataRoute,
};
