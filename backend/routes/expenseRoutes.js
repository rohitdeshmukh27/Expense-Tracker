const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downlodeExpenseExcel,
} = require("../controllers/expenseController.js");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downlodeexcel", protect, downlodeExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
