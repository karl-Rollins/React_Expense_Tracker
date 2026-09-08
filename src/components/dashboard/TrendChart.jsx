import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import "./TrendChart.css";

export default function TrendChart({ transactions }) {
  const dailyTotals = {};
  transactions.forEach((tx) => {
    const day = tx.date;
    if (!dailyTotals[day]) dailyTotals[day] = 0;
    dailyTotals[day] += tx.type === "expense" ? tx.amount : -tx.amount;
  });

  const trendData = Object.entries(dailyTotals).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div className="trend-chart">
      <h3>Spending Trend</h3>
      <ul>
        {trendData.map((d) => (
          <li key={d.date}>
            {formatDate(d.date)}: {formatCurrency(d.total)}
          </li>
        ))}
      </ul>
    </div>
  );
}
