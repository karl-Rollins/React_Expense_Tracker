export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// For budgets (month only)
export function formatMonth(ymString) {
  const [year, month] = ymString.split("-");
  return new Date(year, month - 1).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}
