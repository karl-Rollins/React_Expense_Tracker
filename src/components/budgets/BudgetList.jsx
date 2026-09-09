import BudgetCard from "./BudgetCard";
import "./BudgetList.css";

const normalizeMonth = (month) => {
  if (!month) return null;
  return month instanceof Date ? month.toISOString().slice(0, 7) : month;
};

export default function BudgetList({
  budgets,
  categories,
  selectedMonth,
  onEdit,
  onDelete,
}) {
  const monthKey = normalizeMonth(selectedMonth);
  const monthBudgets = budgets.filter((b) => b.month === monthKey);

  if (monthBudgets.length === 0) {
    return <p className="empty">No budgets set for this month</p>;
  }

  return (
    <div className="budget-list">
      {monthBudgets.map((b) => (
        <BudgetCard
          key={b.id}
          budget={b}
          category={categories.find((c) => c.id === b.categoryId)}
          onEdit={() => onEdit(b)}
          onDelete={() => onDelete(b.id)}
        />
      ))}
    </div>
  );
}
