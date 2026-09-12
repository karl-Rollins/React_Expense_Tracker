import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";

function App() {
  return (
    <CurrencyProvider>
      <ThemeProvider>
        <TransactionsProvider>
          <BudgetsProvider>
            <RouterProvider router={router} />
          </BudgetsProvider>
        </TransactionsProvider>
      </ThemeProvider>
    </CurrencyProvider>
  );
}

export default App;
