import { useState, useMemo } from "react";
import { useTransactionsContext } from "../contexts/TransactionsContext";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilters from "../components/transactions/TransactionFilters";
import { categories } from "../data/categories";
import "./TransactionPage.css";

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
  const [filters, setFilters] = useState({
    month: new Date().toISOString().slice(0, 7),
    type: "all",
    category: "",
    search: "",
  });

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

  // Apply filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (!tx.date.startsWith(filters.month)) return false;
      if (filters.type !== "all" && tx.type !== filters.type) return false;
      if (filters.category && tx.categoryId !== filters.category) return false;
      if (
        filters.search &&
        !tx.note.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [transactions, filters]);

  return (
    <div className="transactions-page">
      <div className="transactions-grid">
        <div className="card">
          <h2>{editing ? "Edit Transaction" : "Add Transaction"}</h2>
          <TransactionForm
            form={form}
            errors={errors}
            editing={editing}
            onChange={setForm}
            onSubmit={handleSubmit}
            categories={categories}
          />
        </div>

        <div className="card">
          <h2>Transactions</h2>
          <TransactionFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
            getCategoryName={(id) =>
              categories.find((c) => c.id === id)?.name || "Unknown"
            }
          />
        </div>
      </div>
    </div>
  );
}
