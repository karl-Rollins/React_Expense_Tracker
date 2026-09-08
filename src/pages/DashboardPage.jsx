import React from "react";
import "./DashboardPage.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formatCurrency } from "../utils/formatCurrency";
import { categories } from "../data/categories";

export default function DashboardPage({ selectedMonth }) {
  const [transactions] = useLocalStorage("transactions", []);
  const [budget] = useLocalStorage("budget", 0);

  // Filter transactions for selected month
  const monthTransactions = transactions.filter((tx) => {
    const date = new Date(tx.date);
    return (
      date.getMonth() === selectedMonth?.getMonth() &&
      date.getFullYear() === selectedMonth?.getFullYear()
    );
  });

  // Totals
  const income = monthTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = monthTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const netBalance = income - expenses;
  const progress = budget > 0 ? (expenses / budget) * 100 : 0;

  // Recent transactions
  const recentTransactions = monthTransactions.slice(-5).reverse();

  // Category breakdown
  const categoryTotals = categories.map((cat) => {
    const total = monthTransactions
      .filter((tx) => tx.categoryId === cat.id)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { ...cat, total };
  });

  // Trend chart (daily totals)
  const dailyTotals = {};
  monthTransactions.forEach((tx) => {
    const day = tx.date;
    if (!dailyTotals[day]) dailyTotals[day] = 0;
    dailyTotals[day] += tx.type === "expense" ? tx.amount : -tx.amount;
  });
  const trendData = Object.entries(dailyTotals).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div className="dashboard">
      {/* Summary cards */}
      <div className="summary-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p>{formatCurrency(income)}</p>
        </div>
        <div className="card expenses">
          <h3>Total Expenses</h3>
          <p>{formatCurrency(expenses)}</p>
        </div>
        <div className="card balance">
          <h3>Net Balance</h3>
          <p>{formatCurrency(netBalance)}</p>
        </div>
      </div>

      {/* Budget progress */}
      <div className="budget-progress">
        <h3>Budget Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(progress, 100)}%`, background: "var(--accent)" }}
          />
        </div>
        <p>{progress.toFixed(1)}% of budget used</p>
      </div>

      {/* Category breakdown */}
      <div className="category-chart">
        <h3>Spending by Category</h3>
        <ul>
          {categoryTotals.map((cat) => (
            <li key={cat.id} style={{ color: cat.color }}>
              {cat.icon && <span className={`icon-${cat.icon}`}></span>}{" "}
              {cat.name}: {formatCurrency(cat.total)}
            </li>
          ))}
        </ul>
      </div>

      {/* Trend chart */}
      <div className="trend-chart">
        <h3>Spending Trend</h3>
        <ul>
          {trendData.map((d) => (
            <li key={d.date}>
              {d.date}: {formatCurrency(d.total)}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent transactions */}
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map((tx) => {
            const cat = categories.find((c) => c.id === tx.categoryId);
            return (
              <li key={tx.id}>
                <span>{tx.date}</span>
                <span>{cat ? cat.name : "Unknown"}</span>
                <span className={tx.type === "income" ? "pos" : "neg"}>
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </span>
                {tx.note && <span className="note">({tx.note})</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
