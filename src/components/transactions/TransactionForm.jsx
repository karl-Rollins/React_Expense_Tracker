import "./TransactionForm.css";

export default function TransactionForm({ form, errors, editing, onChange, onSubmit, categories }) {
  return (
    <form onSubmit={onSubmit} className="transaction-form">
      <label>
        Type:
        <select value={form.type} onChange={(e) => onChange({ ...form, type: e.target.value })}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label>
        Amount:
        <input
          type="number"
          value={form.amount}
          onChange={(e) => onChange({ ...form, amount: e.target.value })}
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </label>

      <label>
        Category:
        <select
          value={form.categoryId}
          onChange={(e) => onChange({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select category</option>
          {categories
            .filter((c) => c.type === form.type) // only show categories matching type
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </label>

      <label>
        Date:
        <input
          type="date"
          value={form.date}
          onChange={(e) => onChange({ ...form, date: e.target.value })}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </label>

      <label>
        Note:
        <input
          type="text"
          value={form.note}
          onChange={(e) => onChange({ ...form, note: e.target.value })}
        />
      </label>

      <button type="submit">{editing ? "Update" : "Add"} Transaction</button>
    </form>
  );
}
