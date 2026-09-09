import { useState, useEffect } from "react";
import "./BudgetForm.css";

export default function BudgetForm({
  categories,
  onSubmit,
  editing,
  setEditing,
}) {
  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm({
      categoryId: "",
      amount: "",
      month: new Date().toISOString().slice(0, 7),
    });
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <label>
        Category:
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Amount:
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </label>

      <label>
        Month:
        <input
          type="month"
          value={form.month}
          onChange={(e) => setForm({ ...form, month: e.target.value })}
        />
      </label>

      <button type="submit">{editing ? "Update" : "Add"} Budget</button>
    </form>
  );
}
