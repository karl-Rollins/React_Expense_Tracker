import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../common/EmptyState";
import "./CategoryChart.css";
import { useCurrencyContext } from "../../contexts/CurrencyContext";

export default function CategoryChart({ categories, transactions }) {
  const { currency, locale } = useCurrencyContext();

  const data = categories
    .map((cat) => {
      const total = transactions
        .filter((tx) => tx.categoryId === cat.id && tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);
      return { name: cat.name, value: total, color: cat.color };
    })
    .filter((d) => d.value > 0);

  if (!data.length) {
    return <EmptyState message="No spending data for this month." />;
  }

  return (
    <div className="chart-card category-chart">
      <h3>Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, value }) =>
              `${name}: ${formatCurrency(value, currency, locale)}`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => formatCurrency(val, currency, locale)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
