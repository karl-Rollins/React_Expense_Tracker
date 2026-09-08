import BudgetItem from "./BudgetItem";
import "./BudgetList.css";

export default function BudgetList({ budgets, categories, selectedMonth, onEdit, onDelete }) {
  const monthBudgets = budgets.filter((b) => b.month === selectedMonth?.toISOString().slice(0, 7));

  if (monthBudgets.length === 0) {
    return <p className="empty">No budgets set for this month</p>;
  }

  return (
    <ul className="budget-list">
      {monthBudgets.map((b) => (
        <BudgetItem
          key={b.id}
          budget={b}
          category={categories.find((c) => c.id === b.categoryId)}
          onEdit={() => onEdit(b)}
          onDelete={() => onDelete(b.id)}
        />
      ))}
    </ul>
  );
}
