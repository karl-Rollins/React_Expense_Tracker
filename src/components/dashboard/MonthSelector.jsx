import React from "react";
import "./MonthSelector.css";

export default function MonthSelector({ selectedMonth, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value); // value is "YYYY-MM"
  };

  return (
    <div className="month-selector">
      <label>
        Month
        <input
          type="month"
          value={selectedMonth}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
