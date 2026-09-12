import React from "react";
import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { categories } from "../../data/categories";
import "./BudgetProgress.css";
import { useCurrencyContext } from "../../contexts/CurrencyContext";

export default function BudgetProgress({ expenses, budgets, selectedMonth }) {
  const { transactions } = useTransactionsContext();

  // Filter budgets by selected month
  const monthBudgets = budgets.filter((b) => b.month === selectedMonth);

  const totalBudget = monthBudgets.reduce((sum, b) => sum + b.amount, 0);
  const progress = totalBudget > 0 ? (expenses / totalBudget) * 100 : 0;
  const overBudget = expenses > totalBudget;

  // Helper: compute expenses for a category in the selected month
  const expensesForCategory = (categoryId) => {
    return transactions
      .filter(
        (tx) =>
          tx.categoryId === categoryId &&
          tx.type === "expense" &&
          tx.date.startsWith(selectedMonth),
      )
      .reduce((sum, tx) => sum + tx.amount, 0);
  };

  // Helper: get category details
  const getCategory = (id) => categories.find((c) => c.id === id);

  const { currency, locale } = useCurrencyContext();

  return (
    <div className="budget-progress">
      <h3>Budget Progress</h3>
      {totalBudget === 0 ? (
        <p>No budgets set for this month</p>
      ) : (
        <>
          <p>
            {formatCurrency(expenses, currency, locale)} /{" "}
            {formatCurrency(totalBudget, currency, locale)}
          </p>
          <div className="progress-bar">
            <div
              className={`progress-fill ${overBudget ? "over" : ""}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          {overBudget && <span className="warning">Over budget!</span>}

          <h4>Category Breakdown</h4>
          <ul className="category-breakdown">
            {monthBudgets.map((b) => {
              const category = getCategory(b.categoryId);
              const categorySpent = expensesForCategory(b.categoryId);
              const categoryProgress = (categorySpent / b.amount) * 100;
              const categoryOver = categorySpent > b.amount;

              return (
                <li key={b.id} className="category-item">
                  <span
                    className="category-name"
                    style={{ color: category?.color }}
                  >
                    {category?.name || b.categoryId}
                  </span>
                  <span className="category-amount">
                    {formatCurrency(categorySpent, currency, locale)} /{" "}
                    {formatCurrency(b.amount, currency, locale)}
                  </span>
                  <div className="progress-bar small">
                    <div
                      className={`progress-fill ${categoryOver ? "over" : ""}`}
                      style={{ width: `${Math.min(categoryProgress, 100)}%` }}
                    />
                  </div>
                  {categoryOver && <span className="warning">Over!</span>}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
