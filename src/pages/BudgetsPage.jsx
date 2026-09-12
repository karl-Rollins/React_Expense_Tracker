import { useState, useMemo } from "react";
import { useBudgetsContext } from "../contexts/BudgetsContext";
import { categories } from "../data/categories";
import BudgetForm from "../components/budgets/BudgetForm";
import BudgetList from "../components/budgets/BudgetList";
import MonthSelector from "../components/dashboard/MonthSelector";
import BudgetSummary from "../components/budgets/BudgetSummary";
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

  // Calculate summary totals
  const totalBudgeted = useMemo(
    () => budgets
      .filter((b) => b.month === selectedMonth)
      .reduce((sum, b) => sum + b.amount, 0),
    [budgets, selectedMonth]
  );

  const totalSpent = useMemo(
    () => budgets
      .filter((b) => b.month === selectedMonth)
      .reduce((sum, b) => sum + (b.spent || 0), 0),
    [budgets, selectedMonth]
  );

  return (
    <div className="budget-page">
      <BudgetSummary
        totalBudgeted={totalBudgeted}
        totalSpent={totalSpent}
        selectedMonth={selectedMonth}
      />

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
