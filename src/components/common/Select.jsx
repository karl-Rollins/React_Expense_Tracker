import React from "react";
import "./Select.css";

export default function Select({ value, options, onChange }) {
  return (
    <select
      className="select"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
