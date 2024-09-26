const express = require("express");
const { connectToDB } = require("./connections/db");
const { syncSheetToDatabase } = require("./connections/googleSheets");
const dataRoutes = require("./routes/dataRoute");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running and connected to Google Sheets and PostgreSQL");
});

app.use("/data", dataRoutes);

const start = async () => {
  try {
    const db = await connectToDB();
    if (db) {
      console.log("Database is connected");
      await syncSheetToDatabase();
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
