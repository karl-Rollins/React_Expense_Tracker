import { formatCurrency } from "../../utils/formatCurrency";
import "./SummaryCards.css";

export default function SummaryCards({ income, expenses, netBalance }) {
  return (
    <div className="summary-cards">
      <div className="card income">
        <h3>Total Income</h3>
        <p>{formatCurrency(income)}</p>
      </div>
      <div className="card expenses">
        <h3>Total Expenses</h3>
        <p>{formatCurrency(expenses)}</p>
      </div>
      <div className="card balance">
        <h3>Net Balance</h3>
        <p>{formatCurrency(netBalance)}</p>
      </div>
    </div>
  );
}
