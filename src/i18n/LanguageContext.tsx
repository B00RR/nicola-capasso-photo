import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translations;
}

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("nicola-lang") as Lang | null;
    if (saved === "it" || saved === "en") return saved;
    return navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
  });

  useEffect(() => {
    localStorage.setItem("nicola-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggle: () => setLang(lang === "it" ? "en" : "it"),
        t: translations[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
