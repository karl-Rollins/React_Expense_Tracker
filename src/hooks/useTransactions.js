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

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
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
