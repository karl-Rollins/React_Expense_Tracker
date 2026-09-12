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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const validate = () => {
    const newErrors = {};
    if (!form.categoryId) {
      newErrors.categoryId = "Please select a category.";
    }
    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({ ...form, amount: Number(form.amount) });

    setForm({
      categoryId: "",
      amount: "",
      month: new Date().toISOString().slice(0, 7),
    });
    setEditing(null);
    setErrors({});
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
        {errors.categoryId && (
          <span className="error">{errors.categoryId}</span>
        )}
      </label>

      <label>
        Amount:
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
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
