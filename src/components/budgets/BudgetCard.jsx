import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatMonth } from "../../utils/formatDate";
import "./BudgetCard.css";

export default function BudgetCard({ budget, category, onEdit, onDelete }) {
  const { transactions } = useTransactionsContext();

  const spent = transactions
    .filter(
      (tx) =>
        tx.categoryId === budget.categoryId && tx.date.startsWith(budget.month),
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const progress = (spent / budget.amount) * 100;
  const overBudget = spent > budget.amount;

  return (
    <div className="budget-card">
      <header>
        <h3>{category?.name || "Unknown"}</h3>
        <span>{formatMonth(budget.month)}</span>
      </header>

      <p className="amount">
        {formatCurrency(spent)} / {formatCurrency(budget.amount)}
      </p>

      <div className="progress-bar">
        <div
          className={`progress-fill ${overBudget ? "over" : ""}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {overBudget && <span className="warning">Over budget!</span>}

      <footer>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </footer>
    </div>
  );
}
