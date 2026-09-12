import React, { useMemo, useState } from "react";
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
import TransactionFilters from "../components/transactions/TransactionFilters";
import useFilters from "../hooks/useFilters";

export default function DashboardPage() {
  const { transactions } = useTransactionsContext();
  const { budgets } = useBudgetsContext();

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const monthTransactions = useMemo(() => {
    return transactions.filter((tx) => tx.date.startsWith(selectedMonth));
  }, [transactions, selectedMonth]);

  // Apply additional filters (type, category, search)
  const { filters, setFilters, filteredTransactions } =
    useFilters(monthTransactions);

  const income = useMemo(() => {
    return monthTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [monthTransactions]);

  const expenses = useMemo(() => {
    return monthTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [monthTransactions]);

  const netBalance = useMemo(() => income - expenses, [income, expenses]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <MonthSelector
          selectedMonth={selectedMonth}
          onChange={setSelectedMonth}
        />
        <TransactionFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />
      </div>

      <div className="dashboard-grid">
        <SummaryCards
          income={income}
          expenses={expenses}
          netBalance={netBalance}
        />
        <BudgetProgress
          expenses={expenses}
          budgets={budgets}
          selectedMonth={selectedMonth}
        />
      </div>

      <div className="dashboard-charts">
        <CategoryChart
          categories={categories}
          transactions={filteredTransactions}
        />
        <TrendChart transactions={filteredTransactions} />
      </div>

      <RecentTransactions
        transactions={filteredTransactions}
        categories={categories}
      />
    </div>
  );
}
