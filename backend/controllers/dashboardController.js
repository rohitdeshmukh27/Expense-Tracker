const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userObjectId = new Types.ObjectId(userId);

    // Fetch total income
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeResult[0]?.total || 0;

    // Fetch total expense
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = totalExpenseResult[0]?.total || 0;

    // Get income transactions in last 60 days
    const last60DaysIncomeTransaction = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Get expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 transactions (Income + Expenses)
    const incomeTxns = await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);
    const expenseTxns = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const recentTransactions = [
      ...incomeTxns.map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...expenseTxns.map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Final response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpenses: totalExpense,
      last30DaysExpense: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransaction,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
