"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppLanguage = "vi" | "en";
export type AppTheme = "light" | "dark";

type GlobalPreferencesContextValue = {
  language: AppLanguage;
  theme: AppTheme;
  setLanguage: (language: AppLanguage) => void;
  setTheme: (theme: AppTheme) => void;
};

const GlobalPreferencesContext = createContext<GlobalPreferencesContextValue | null>(
  null,
);

export function GlobalPreferencesProvider({
  children,
  initialLanguage = "vi",
  initialTheme = "light",
}: {
  children: ReactNode;
  initialLanguage?: AppLanguage;
  initialTheme?: AppTheme;
}) {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    if (typeof window === "undefined") {
      return initialLanguage;
    }

    const savedLanguage = window.localStorage.getItem("lumiere-language");
    return savedLanguage === "en" ? "en" : initialLanguage;
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window === "undefined") {
      return initialTheme;
    }

    const savedTheme = window.localStorage.getItem("lumiere-theme");
    return savedTheme === "dark" ? "dark" : initialTheme;
  });

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("lumiere-language", language);
    document.cookie = `lumiere-language=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("lumiere-theme", theme);
    document.cookie = `lumiere-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  const value = useMemo(
    () => ({ language, theme, setLanguage, setTheme }),
    [language, theme],
  );

  return (
    <GlobalPreferencesContext.Provider value={value}>
      {children}
    </GlobalPreferencesContext.Provider>
  );
}

export function useGlobalPreferences() {
  const context = useContext(GlobalPreferencesContext);

  if (!context) {
    throw new Error("useGlobalPreferences must be used within GlobalPreferencesProvider");
  }

  return context;
}
