import { useCurrencyContext } from "../../contexts/CurrencyContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./SummaryCards.css";

export default function SummaryCards({ income, expenses, netBalance }) {
  const { currency, locale } = useCurrencyContext();
  return (
    <div className="summary-cards">
      <div className="card income">
        <h3>Total Income</h3>
        <p>{formatCurrency(income, currency, locale)}</p>
      </div>
      <div className="card expenses">
        <h3>Total Expenses</h3>
        <p>{formatCurrency(expenses, currency, locale)}</p>
      </div>
      <div className="card balance">
        <h3>Net Balance</h3>
        <p>{formatCurrency(netBalance, currency, locale)}</p>
      </div>
    </div>
  );
}
