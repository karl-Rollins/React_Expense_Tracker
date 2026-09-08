import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { TransactionsProvider } from "./contexts/TransactionsContext";

function App() {
  return (
    <TransactionsProvider>
      <RouterProvider router={router} />
    </TransactionsProvider>
  );
}

export default App;
