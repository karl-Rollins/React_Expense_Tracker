import TransactionItem from "./TransactionItem";
import "./TransactionList.css";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions yet</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((tx) => (
        <TransactionItem key={tx.id} tx={tx} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
