import { createContext, useContext } from "react";
import { useTransactions } from "../hooks/useTransactions";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const tx = useTransactions();
  return (
    <TransactionsContext.Provider value={tx}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
