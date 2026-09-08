import { useLocalStorage } from "./useLocalStorage";

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);

  // Add transaction
  const addTransaction = (tx) => {
    setTransactions([
      ...transactions,
      { ...tx, id: crypto.randomUUID(), createdAt: Date.now() },
    ]);
  };

  // Update transaction
  const updateTransaction = (id, updatedTx) => {
    setTransactions(
      transactions.map((tx) => (tx.id === id ? { ...updatedTx, id } : tx)),
    );
  };

  // Delete transaction with confirmation
  const deleteTransaction = (id) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete this transaction?\n\nCategory: ${tx.categoryId}\nAmount: ${tx.amount}\nDate: ${tx.date}`,
    );

    if (confirmed) {
      setTransactions(transactions.filter((tx) => tx.id !== id));
    }
  };

  // Sort by date (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return {
    transactions: sortedTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
