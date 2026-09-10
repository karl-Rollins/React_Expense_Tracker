import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import "./BudgetSummary.css";

export default function BudgetSummary({
  totalBudgeted,
  totalSpent,
  selectedMonth,
}) {
  const net = totalBudgeted - totalSpent;

  return (
    <div className="budget-summary card">
      <h2>Summary for {selectedMonth}</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <h4>Budgeted</h4>
          <p>{formatCurrency(totalBudgeted)}</p>
        </div>
        <div className="summary-item">
          <h4>Spent</h4>
          <p>{formatCurrency(totalSpent)}</p>
        </div>
        <div className="summary-item">
          <h4>Remaining</h4>
          <p style={{ color: net >= 0 ? "var(--accent)" : "var(--neg)" }}>
            {formatCurrency(net)}
          </p>
        </div>
      </div>
    </div>
  );
}
