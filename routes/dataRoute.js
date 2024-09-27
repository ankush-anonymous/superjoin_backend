const express = require("express");
const {
  addData,
  updateData,
  deleteData,
  fetchData,
} = require("../controllers/dataController");

const { syncSheet } = require("../controllers/syncController");

const router = express.Router();

router.post("/add", addData);
router.put("/update/:id", updateData);
router.delete("/delete/:id", deleteData);
router.get("/fetch", fetchData);
router.post("/sync-sheet", syncSheet);

module.exports = router;
