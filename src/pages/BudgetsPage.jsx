import { useState } from "react";
import { useBudgetsContext } from "../contexts/BudgetsContext";
import { categories } from "../data/categories";
import BudgetForm from "../components/budgets/BudgetForm";
import BudgetList from "../components/budgets/BudgetList";
import "./BudgetPage.css";

export default function BudgetsPage({ selectedMonth }) {
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgetsContext();
  const [editing, setEditing] = useState(null);

  const handleSubmit = (budget) => {
    if (editing) {
      updateBudget(editing.id, budget);
      setEditing(null);
    } else {
      addBudget(budget);
    }
  };

  return (
    <div className="budget-page">
      <h2>{editing ? "Edit Budget" : "Add Budget"}</h2>
      <BudgetForm
        categories={categories}
        onSubmit={handleSubmit}
        editing={editing}
        setEditing={setEditing}
      />

      <h2>Budgets</h2>
      <BudgetList
        budgets={budgets}
        categories={categories}
        selectedMonth={selectedMonth}
        onEdit={setEditing}
        onDelete={deleteBudget}
      />
    </div>
  );
}
