import { useState } from "react";
import { useBudgetsContext } from "../contexts/BudgetsContext";
import { categories } from "../data/categories";
import BudgetForm from "../components/budgets/BudgetForm";
import BudgetList from "../components/budgets/BudgetList";
import MonthSelector from "../components/dashboard/MonthSelector";
import "./BudgetPage.css";

export default function BudgetsPage() {
  const { budgets, addBudget, updateBudget, deleteBudget } =
    useBudgetsContext();
  const [editing, setEditing] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

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
      <div className="budget-grid">
        <div className="card">
          <h2>{editing ? "Edit Budget" : "Add Budget"}</h2>
          <BudgetForm
            categories={categories}
            onSubmit={handleSubmit}
            editing={editing}
            setEditing={setEditing}
          />
        </div>

        <div className="card">
          <div className="budget-header">
            <h2>Budgets</h2>
            <MonthSelector
              selectedMonth={selectedMonth}
              onChange={setSelectedMonth}
            />
          </div>
          <BudgetList
            budgets={budgets}
            categories={categories}
            selectedMonth={selectedMonth}
            onEdit={setEditing}
            onDelete={deleteBudget}
          />
        </div>
      </div>
    </div>
  );
}
