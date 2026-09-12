import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [locale, setLocale] = useState("en-US");

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, locale, setLocale }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}
