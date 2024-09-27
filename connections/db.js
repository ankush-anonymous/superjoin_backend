// db.js
const { Pool } = require("pg");

// Database connection URL
const dbUrl =
  "postgresql://superjoin_database_1kd6_user:vH8L1O01sI7e8InCkBw7q2e9UiBN3ool@dpg-crr5qrd6l47c73cdi6ng-a.singapore-postgres.render.com:5432/superjoin_database_1kd6";

// Create a new pool using the connection URL
const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Function to connect to the database
const connectToDB = async () => {
  try {
    const client = await pool.connect();
    client.release();
    return true;
  } catch (err) {
    console.error("Database connection error:", err.stack);
    throw err;
  }
};

module.exports = { connectToDB, pool };
