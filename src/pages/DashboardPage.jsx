import React, { useState } from "react";
import "./DashboardPage.css";
import { useTransactionsContext } from "../contexts/TransactionsContext";
import { categories } from "../data/categories";
import SummaryCards from "../components/dashboard/SummaryCards";
import BudgetProgress from "../components/budgets/BudgetProgress";
import CategoryChart from "../components/dashboard/CategoryChart";
import TrendChart from "../components/dashboard/TrendChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useBudgetsContext } from "../contexts/BudgetsContext";
import MonthSelector from "../components/dashboard/MonthSelector";

export default function DashboardPage() {
  const { transactions } = useTransactionsContext();
  const { budgets } = useBudgetsContext();

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const monthTransactions = transactions.filter((tx) =>
    tx.date.startsWith(selectedMonth),
  );

  const income = monthTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = monthTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const netBalance = income - expenses;

  return (
    <div className="dashboard">
      <MonthSelector
        selectedMonth={selectedMonth}
        onChange={setSelectedMonth}
      />
      <SummaryCards
        income={income}
        expenses={expenses}
        netBalance={netBalance}
      />
      <BudgetProgress expenses={expenses} budgets={budgets} selectedMonth={selectedMonth} />
      <CategoryChart categories={categories} transactions={monthTransactions} />
      <TrendChart transactions={monthTransactions} />
      <RecentTransactions
        transactions={monthTransactions}
        categories={categories}
      />
    </div>
  );
}
