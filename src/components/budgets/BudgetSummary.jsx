import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import "./BudgetSummary.css";
import { useCurrencyContext } from "../../contexts/CurrencyContext";

export default function BudgetSummary({
  totalBudgeted,
  totalSpent,
  selectedMonth,
}) {
  const net = totalBudgeted - totalSpent;
  const percentSpent =
    totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

  const { currency, locale } = useCurrencyContext();

  return (
    <div className="budget-summary card">
      <h2>Summary for {selectedMonth}</h2>
      <div className="summary-grid">
        <div className="summary-item">
          <h4>Budgeted</h4>
          <p>{formatCurrency(totalBudgeted, currency, locale)}</p>
        </div>
        <div className="summary-item">
          <h4>Spent</h4>
          <p>{formatCurrency(totalSpent, currency, locale)}</p>
        </div>
        <div className="summary-item">
          <h4>Remaining</h4>
          <p style={{ color: net >= 0 ? "var(--accent)" : "var(--neg)" }}>
            {formatCurrency(net, currency, locale)}
          </p>
        </div>
      </div>

      <div className="summary-progress">
        <div className="progress-bar">
          <div
            className={`progress-fill ${percentSpent > 100 ? "over" : ""}`}
            style={{ width: `${Math.min(percentSpent, 100)}%` }}
          />
        </div>
        <small>{Math.round(percentSpent)}% of budget spent</small>
      </div>
    </div>
  );
}
