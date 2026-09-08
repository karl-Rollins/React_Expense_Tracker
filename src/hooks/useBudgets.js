import { useLocalStorage } from "./useLocalStorage";

export function useBudgets() {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);

  const addBudget = (budget) => {
    setBudgets([...budgets, { ...budget, id: crypto.randomUUID() }]);
  };

  const updateBudget = (id, updatedBudget) => {
    setBudgets(
      budgets.map((b) => (b.id === id ? { ...updatedBudget, id } : b)),
    );
  };

  const deleteBudget = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget?",
    );
    if (confirmed) {
      setBudgets(budgets.filter((b) => b.id !== id));
    }
  };

  return { budgets, addBudget, updateBudget, deleteBudget };
}
