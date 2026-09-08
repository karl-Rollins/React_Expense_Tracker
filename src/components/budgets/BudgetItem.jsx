import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./BudgetItem.css";

export default function BudgetItem({ budget, category, onEdit, onDelete }) {
  const { transactions } = useTransactionsContext();

  const spent = transactions
    .filter((tx) => tx.categoryId === budget.categoryId && tx.date.startsWith(budget.month))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const progress = (spent / budget.amount) * 100;
  const overBudget = spent > budget.amount;

  return (
    <li className="budget-item">
      <span>{category?.name || "Unknown"}</span>
      <span>{formatCurrency(spent)} / {formatCurrency(budget.amount)}</span>
      <div className="progress-bar">
        <div
          className={`progress-fill ${overBudget ? "over" : ""}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {overBudget && <span className="warning">Over budget!</span>}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
