import { formatCurrency } from "../../utils/formatCurrency";
import "./CategoryChart.css";

export default function CategoryChart({ categories, transactions }) {
  const categoryTotals = categories.map((cat) => {
    const total = transactions
      .filter((tx) => tx.categoryId === cat.id)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { ...cat, total };
  });

  return (
    <div className="category-chart">
      <h3>Spending by Category</h3>
      <ul>
        {categoryTotals.map((cat) => (
          <li key={cat.id} style={{ color: cat.color }}>
            <cat.icon size={16} style={{ marginRight: "6px" }} />
            {cat.name}: {formatCurrency(cat.total)}
          </li>
        ))}
      </ul>
    </div>
  );
}
