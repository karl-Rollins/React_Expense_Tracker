import React from "react";
import "./DashboardPage.css";
import { useTransactionsContext } from "../contexts/TransactionsContext";
import { categories } from "../data/categories";
import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetProgress from "../components/budgets/BudgetProgress";
import CategoryChart from "../components/dashboard/CategoryChart";
import TrendChart from "../components/dashboard/TrendChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function DashboardPage({ selectedMonth }) {
  const { transactions } = useTransactionsContext();
  const {budget} = useTransactionsContext(); 

  const monthTransactions = selectedMonth
    ? transactions.filter((tx) => {
        const date = new Date(tx.date);
        return (
          date.getMonth() === selectedMonth.getMonth() &&
          date.getFullYear() === selectedMonth.getFullYear()
        );
      })
    : transactions;

  const income = monthTransactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = monthTransactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
  const netBalance = income - expenses;

  return (
    <div className="dashboard">
      <SummaryCards income={income} expenses={expenses} netBalance={netBalance} />
      <BudgetProgress expenses={expenses} budget={budget} />
      <CategoryChart categories={categories} transactions={monthTransactions} />
      <TrendChart transactions={monthTransactions} />
      <RecentTransactions transactions={monthTransactions} categories={categories} />
    </div>
  );
}
