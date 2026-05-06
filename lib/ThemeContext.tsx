"use client";

import React, { createContext, useContext, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const toggle = useCallback(() => {
    // Light mode only — no toggling
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
