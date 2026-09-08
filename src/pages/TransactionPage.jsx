import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionLIst";
import { categories } from "../data/categories";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      errs.amount = "Amount must be a number greater than 0";
    }
    if (!form.categoryId) errs.category = "Category is required";
    if (!form.date) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTx = {
      id: editing ? editing.id : crypto.randomUUID(),
      ...form,
      amount: Number(form.amount),
      createdAt: Date.now(),
    };

    if (editing) {
      setTransactions(transactions.map((tx) => (tx.id === editing.id ? newTx : tx)));
      setEditing(null);
    } else {
      setTransactions([...transactions, newTx]);
    }

    setForm({
      type: "expense",
      amount: "",
      categoryId: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
    setErrors({});
  };

  const handleEdit = (tx) => {
    setEditing(tx);
    setForm({ ...tx });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      setTransactions(transactions.filter((tx) => tx.id !== id));
    }
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Helper: resolve category name
  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Unknown";
  };

  return (
    <div className="transactions-page">
      <h2>{editing ? "Edit Transaction" : "Add Transaction"}</h2>
      <TransactionForm
        form={form}
        errors={errors}
        editing={editing}
        onChange={setForm}
        onSubmit={handleSubmit}
        categories={categories}
      />

      <h2>Transactions</h2>
      <TransactionList
        transactions={sortedTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getCategoryName={getCategoryName}
      />
    </div>
  );
}
