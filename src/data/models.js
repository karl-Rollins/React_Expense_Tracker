// Transaction model
export const TransactionModel = {
  id: "string", // uuid / crypto.randomUUID()
  type: "income" | "expense",
  amount: "number", // positive; type decides sign in totals
  categoryId: "string", // links to Category.id
  date: "string", // ISO date, e.g. "2026-08-17"
  note: "string", // optional
  createdAt: "number", // timestamp
};

// Category model
export const CategoryModel = {
  id: "string",
  name: "string",
  type: "income" | "expense",
  color: "string", // hex color
  icon: "string", // lucide icon name
};

// Budget model
export const BudgetModel = {
  id: "string",
  categoryId: "string",
  amount: "number", // monthly limit
  month: "string", // "YYYY-MM", e.g. "2026-08"
};
