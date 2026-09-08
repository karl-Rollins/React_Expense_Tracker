import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { BudgetsProvider } from "./contexts/BudgetsContext";

function App() {
  return (
    <TransactionsProvider>
      <BudgetsProvider>
        <RouterProvider router={router} />
      </BudgetsProvider>
    </TransactionsProvider>
  );
}

export default App;
