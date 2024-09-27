const express = require("express");
const {
  addDataRoute,
  updateDataRoute,
  deleteDataRoute,
  fetchDataRoute,
} = require("../controllers/dataController");

const { syncSheet } = require("../controllers/syncController");

const router = express.Router();

// Routes for interacting with the data
router.post("/add", addDataRoute);
router.put("/update/:id", updateDataRoute);
router.delete("/delete/:id", deleteDataRoute);
router.get("/fetch", fetchDataRoute);

// Route for syncing sheet data
router.post("/sync-sheet", syncSheet);

module.exports = router;
