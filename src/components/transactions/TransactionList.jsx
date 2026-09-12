import EmptyState from "../common/EmptyState";
import TransactionItem from "./TransactionItem";
import "./TransactionList.css";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  getCategoryName,
}) {
  if (transactions.length === 0) {
    return <EmptyState message="No transactions Yet" />;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          tx={tx}
          onEdit={onEdit}
          onDelete={onDelete}
          getCategoryName={getCategoryName}
        />
      ))}
    </ul>
  );
}
