import { useState, useMemo } from "react";

export default function useFilters(transactions) {
  const [filters, setFilters] = useState({
    month: null,
    type: "all",
    category: null,
    search: "",
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Month filter
      if (filters.month && new Date(tx.date).getMonth() !== filters.month) {
        return false;
      }
      // Type filter
      if (filters.type !== "all" && tx.type !== filters.type) {
        return false;
      }
      // Category filter
      if (filters.category && tx.category !== filters.category) {
        return false;
      }
      // Search filter
      if (
        filters.search &&
        !tx.note.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [transactions, filters]);

  return { filters, setFilters, filteredTransactions };
}
