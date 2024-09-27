// db.js
const { Pool } = require("pg");

// Database connection URL
const dbUrl =
  "postgresql://superjoin_database_5zuw_user:Nf5v3rgqpquWwW6uWVpOxUxjOzlh5ntD@dpg-crrb9fij1k6c73ecvh4g-a.singapore-postgres.render.com:5432/superjoin_database_5zuw";

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
