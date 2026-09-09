import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import "./BudgetProgress.css";

export default function BudgetProgress({ expenses, budgets, selectedMonth }) {
  // Filter budgets by selected month
  const monthBudgets = budgets.filter((b) => b.month === selectedMonth);

  const totalBudget = monthBudgets.reduce((sum, b) => sum + b.amount, 0);
  const progress = totalBudget > 0 ? (expenses / totalBudget) * 100 : 0;
  const overBudget = expenses > totalBudget;

  return (
    <div className="budget-progress">
      <h3>Budget Progress</h3>
      {totalBudget === 0 ? (
        <p>No budgets set for this month</p>
      ) : (
        <>
          <p>
            {formatCurrency(expenses)} / {formatCurrency(totalBudget)}
          </p>
          <div className="progress-bar">
            <div
              className={`progress-fill ${overBudget ? "over" : ""}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          {overBudget && <span className="warning">Over budget!</span>}
        </>
      )}
    </div>
  );
}
