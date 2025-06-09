const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downlodeIncomeExcel,
} = require("../controllers/incomeController.js");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downlodeexcel", protect, downlodeIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
