const { pool } = require("../connections/db");

const addRow = async (data) => {
  const query = `INSERT INTO items (item_name, stock, price, supplier) VALUES ($1, $2, $3, $4)`;
  return pool.query(query, data);
};

const updateRow = async (id, data) => {
  const query = `UPDATE items SET item_name = $1, stock = $2, price = $3, supplier = $4 WHERE item_id = $5`;
  return pool.query(query, [...data, id]);
};

const deleteRow = async (id) => {
  const query = `DELETE FROM items WHERE item_id = $1`;
  return pool.query(query, [id]);
};

const fetchRows = async () => {
  return pool.query("SELECT * FROM items");
};

module.exports = { addRow, updateRow, deleteRow, fetchRows };
