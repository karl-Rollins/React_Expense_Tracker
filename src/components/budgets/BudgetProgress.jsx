import "./BudgetProgress.css";

export default function BudgetProgress({ expenses, budget }) {
  const progress = budget > 0 ? (expenses / budget) * 100 : 0;

  return (
    <div className="budget-progress">
      <h3>Budget Progress</h3>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p>{progress.toFixed(1)}% of budget used</p>
    </div>
  );
}
