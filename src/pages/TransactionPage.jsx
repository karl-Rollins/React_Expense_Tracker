import { useState } from "react";
import { useTransactionsContext } from "../contexts/TransactionsContext";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import { categories } from "../data/categories";

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactionsContext();
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

    if (editing) {
      updateTransaction(editing.id, { ...form, amount: Number(form.amount) });
      setEditing(null);
    } else {
      addTransaction({ ...form, amount: Number(form.amount) });
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
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
        getCategoryName={(id) =>
          categories.find((c) => c.id === id)?.name || "Unknown"
        }
      />
    </div>
  );
}
