import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
import Select from "../common/Select";
import MonthSelector from "../dashboard/MonthSelector";
import "./TransactionFilters.css";

export default function TransactionFilters({ filters, setFilters, categories }) {
  const [searchValue, setSearchValue] = useState("");

  // debounce search
  const handleSearch = (value) => {
    setSearchValue(value);
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setFilters(f => ({ ...f, search: value }));
    }, 300);
  };

  return (
    <div className="transaction-filters">
      <MonthSelector
        selectedMonth={filters.month}
        onChange={(month) => setFilters(f => ({ ...f, month }))}
      />

      <Select
        value={filters.type}
        options={[
          { label: "All", value: "all" },
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" }
        ]}
        onChange={(type) => setFilters(f => ({ ...f, type }))}
      />

      <Select
        value={filters.category || ""}
        options={[
          { label: "All Categories", value: "" },
          ...categories.map(c => ({ label: c.name, value: c.id }))
        ]}
        onChange={(category) => setFilters(f => ({ ...f, category }))}
      />

      <SearchBar
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search notes..."
      />
    </div>
  );
}
