import React from "react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
