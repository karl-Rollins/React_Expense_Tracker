import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./TransactionPage.css";
import { formatCurrency } from "../utils/formatCurrency";

export default function TransactionPage() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [editing, setEditing] = useState(null);

  // Form state
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });
  const [errors, setErrors] = useState({});

  // Validation
  const validate = () => {
    const errs = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      errs.amount = "Amount must be a number greater than 0";
    }
    if (!form.category) {
      errs.category = "Category is required";
    }
    if (!form.date) {
      errs.date = "Date is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Save transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTx = {
      id: editing ? editing.id : Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    if (editing) {
      setTransactions(
        transactions.map((tx) => (tx.id === editing.id ? newTx : tx)),
      );
      setEditing(null);
    } else {
      setTransactions([...transactions, newTx]);
    }

    setForm({
      type: "expense",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
    setErrors({});
  };

  // Edit
  const handleEdit = (tx) => {
    setEditing(tx);
    setForm({
      type: tx.type,
      amount: tx.amount,
      category: tx.category,
      date: tx.date,
      note: tx.note,
    });
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      setTransactions(transactions.filter((tx) => tx.id !== id));
    }
  };

  // Sort most recent first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="transactions-page">
      <h2>{editing ? "Edit Transaction" : "Add Transaction"}</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <label>
          Type:
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
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
          Category:
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </label>

        <label>
          Date:
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </label>

        <label>
          Note:
          <input
            type="text"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </label>

        <button type="submit">{editing ? "Update" : "Add"} Transaction</button>
      </form>

      <h2>Transactions</h2>
      {sortedTransactions.length === 0 ? (
        <p className="empty">No transactions yet</p>
      ) : (
        <ul className="transaction-list">
          {sortedTransactions.map((tx) => (
            <li key={tx.id} className="transaction-item">
              <span>{tx.category}</span>
              <span className={tx.type === "income" ? "pos" : "neg"}>
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </span>
              <span>{tx.date}</span>
              <span>{tx.note}</span>
              <button onClick={() => handleEdit(tx)}>Edit</button>
              <button onClick={() => handleDelete(tx.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
