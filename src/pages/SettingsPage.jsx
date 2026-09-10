import React, { useState } from "react";
import "./SettingsPage.css";
import { useThemeContext } from "../contexts/ThemeContext";
import { useBudgetsContext } from "../contexts/BudgetsContext";
import { useTransactionsContext } from "../contexts/TransactionsContext";
import { categories } from "../data/categories";
import { useCurrencyContext } from "../contexts/CurrencyContext";

export default function SettingsPage() {
  const { theme, setTheme } = useThemeContext();
  const { budgets, deleteBudget } = useBudgetsContext();
  const { transactions, deleteTransaction } = useTransactionsContext();
  const { currency, setCurrency } = useCurrencyContext();

  const [localCategories, setLocalCategories] = useState(categories);

  const handleThemeChange = (e) => setTheme(e.target.value);

  const clearBudgets = () => {
    if (window.confirm("Clear all budgets? This cannot be undone.")) {
      budgets.forEach((b) => deleteBudget(b.id));
    }
  };

  const clearTransactions = () => {
    if (window.confirm("Clear all transactions? This cannot be undone.")) {
      transactions.forEach((t) => deleteTransaction(t.id));
    }
  };

  const addCategory = () => {
    const name = prompt("Enter category name:");
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, "-");
    setLocalCategories([
      ...localCategories,
      { id, name, type: "expense", color: "#999", icon: "Tag" },
    ]);
  };

  const deleteCategory = (id) => {
    if (window.confirm("Delete this category?")) {
      setLocalCategories(localCategories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="settings-grid">
        <section className="card">
          <h3>Theme</h3>
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </section>

        <section className="card">
          <h3>Data Management</h3>
          <button onClick={clearBudgets}>Clear Budgets</button>
          <button onClick={clearTransactions}>Clear Transactions</button>
        </section>

        <section className="card">
          <h3>Currency</h3>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD  US Dollar</option>
            <option value="EUR">EUR  Euro</option>
            <option value="GBP">GBP  British Pound</option>
            <option value="XAF">XAF  Central African CFA Franc</option>
          </select>
        </section>

        <section className="card">
          <h3>Manage Categories</h3>
          <ul className="category-list">
            {localCategories.map((c) => (
              <li key={c.id}>
                <span className="category-name" style={{ color: c.color }}>
                  {c.name} ({c.type})
                </span>
                <button onClick={() => deleteCategory(c.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={addCategory}>Add Category</button>
        </section>
      </div>
    </div>
  );
}
