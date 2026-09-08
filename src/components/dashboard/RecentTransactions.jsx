import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import "./RecentTransactions.css";

export default function RecentTransactions({ transactions, categories }) {
  const recentTransactions = transactions.slice(-5).reverse();

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Unknown";
  };

  return (
    <div className="recent-transactions">
      <h3>Recent Transactions</h3>
      <ul>
        {recentTransactions.map((tx) => (
          <li key={tx.id}>
            <span>{formatDate(tx.date)}</span>
            <span>{getCategoryName(tx.categoryId)}</span>
            <span className={tx.type === "income" ? "pos" : "neg"}>
              {tx.type === "income" ? "+" : "-"}
              {formatCurrency(tx.amount)}
            </span>
            {tx.note && <span className="note">({tx.note})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
