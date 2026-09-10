import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import EmptyState from "../common/EmptyState";
import "./TrendChart.css";
import { useCurrencyContext } from "../../contexts/CurrencyContext";

export default function TrendChart({ transactions }) {
  const { currency, locale } = useCurrencyContext();

  const dailyTotals = {};
  transactions.forEach((tx) => {
    const day = tx.date;
    if (!dailyTotals[day]) dailyTotals[day] = 0;
    dailyTotals[day] += tx.type === "expense" ? tx.amount : -tx.amount;
  });

  const data = Object.entries(dailyTotals).map(([date, total]) => ({
    date: formatDate(date),
    total,
  }));

  if (!data.length) {
    return <EmptyState message="No trend data available." />;
  }

  return (
    <div className="chart-card trend-chart">
      <h3>Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(val) => formatCurrency(val, currency, locale)}
          />
          <Tooltip formatter={(val) => formatCurrency(val, currency, locale)} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
