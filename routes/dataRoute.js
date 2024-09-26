const express = require("express");
const {
  addData,
  updateData,
  deleteData,
  fetchData,
} = require("../controllers/dataController");

const router = express.Router();

router.post("/add", addData);
router.put("/update/:id", updateData);
router.delete("/delete/:id", deleteData);
router.get("/fetch", fetchData);

module.exports = router;
