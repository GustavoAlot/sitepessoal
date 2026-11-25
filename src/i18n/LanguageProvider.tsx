import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import { messages } from "./messages";
import type { Language } from "./types";

const STORAGE_KEY = "portfolio:language";

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, updateLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  });
  const t = messages[language];

  function setLanguage(next: Language) {
    updateLanguage(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* The switch also works without storage. */
    }
  }

  useEffect(() => {
    document.documentElement.lang = t.meta.language;
    document.title = t.meta.title;
    const metadata = [
      ['meta[name="description"]', t.meta.description],
      ['meta[property="og:title"]', t.meta.title],
      ['meta[property="og:description"]', t.meta.description],
      ['meta[property="og:locale"]', t.meta.locale],
    ];
    metadata.forEach(([selector, content]) =>
      document.querySelector(selector)?.setAttribute("content", content),
    );
  }, [t]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
