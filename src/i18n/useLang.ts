import { createContext, useContext } from "react";
import type { Lang, Translations } from "./translations";

export interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translations;
}

export const LanguageContext = createContext<LangCtx | undefined>(undefined);

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
