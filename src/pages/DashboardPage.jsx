import React from "react";
import "./DashboardPage.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formatCurrency } from "../utils/formatCurrency";

export default function DashboardPage({selectedMonth}) {
  const [transactions] = useLocalStorage("transactions", []);
  const [budget] = useLocalStorage("budget", 0);

  const monthTransactions = transactions.filter((tx) => {
    const date = new Date(tx.date);
    return (
      date.getMonth() === selectedMonth?.getMonth() &&
      date.getFullYear() === selectedMonth?.getFullYear()
    );
  });

  const income = monthTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = monthTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const netBalance = income - expenses;

  const progress = budget > 0 ? (expenses / budget) * 100 : 0;

  const recentTransactions = monthTransactions.slice(-5).reverse();

  return (
    <div className="dashboard">
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

      <div className="budget-progress">
        <h3>Budget Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p>{progress.toFixed(1)}% of budget used</p>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map((tx) => (
            <li key={tx.id}>
              <span>{tx.date}</span>
              <span>{tx.description}</span>
              <span className={tx.type === "income" ? "pos" : "neg"}>
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
