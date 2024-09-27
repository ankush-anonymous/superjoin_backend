// db.js
const { Pool } = require("pg");

// Database connection URL
const dbUrl =
  "postgresql://superjoin_database_user:HsX7lwAEabNcK3ssahaNk7UkBHQ8t5pL@dpg-crqn8tbtq21c73euv720-a.oregon-postgres.render.com:5432/superjoin_database";

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
