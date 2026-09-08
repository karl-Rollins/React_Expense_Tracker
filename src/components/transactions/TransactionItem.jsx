import { formatCurrency } from "../../utils/formatCurrency";
import "./TransactionItem.css";

export default function TransactionItem({ tx, onEdit, onDelete }) {
  return (
    <li className="transaction-item">
      <span>{tx.category}</span>
      <span className={tx.type === "income" ? "pos" : "neg"}>
        {tx.type === "income" ? "+" : "-"}
        {formatCurrency(tx.amount)}
      </span>
      <span>{tx.date}</span>
      <span>{tx.note}</span>
      <button onClick={() => onEdit(tx)}>Edit</button>
      <button onClick={() => onDelete(tx.id)}>Delete</button>
    </li>
  );
}
