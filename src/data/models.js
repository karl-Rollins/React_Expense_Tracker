// Transaction model
export const TransactionModel = {
  id: "string",
  type: "income" | "expense",
  amount: "number",
  categoryId: "string",
  date: "string",
  note: "string",
  createdAt: "number",
};

// Category model
export const CategoryModel = {
  id: "string",
  name: "string",
  type: "income" | "expense",
  color: "string",
  icon: "string",
};

// Budget model
export const BudgetModel = {
  id: "string",
  categoryId: "string",
  amount: "number",
  month: "string",
};
