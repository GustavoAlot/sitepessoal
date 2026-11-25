import { createContext } from "react";
import type { Language } from "./types";
import type { Messages } from "./messages";

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Messages;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
