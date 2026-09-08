import { createContext, useContext } from "react";
import { useBudgets } from "../hooks/useBudgets";

const BudgetsContext = createContext();

export function BudgetsProvider({ children }) {
  const budgets = useBudgets();
  return (
    <BudgetsContext.Provider value={budgets}>
      {children}
    </BudgetsContext.Provider>
  );
}

export function useBudgetsContext() {
  return useContext(BudgetsContext);
}
