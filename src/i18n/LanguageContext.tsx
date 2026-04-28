import { useEffect, useState, ReactNode } from "react";
import { translations, type Lang } from "./translations";
import { LanguageContext } from "./useLang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const saved = localStorage.getItem("nicola-lang") as Lang | null;
      if (saved === "it" || saved === "en") return saved;
    } catch {}
    return navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
  });

  useEffect(() => {
    try { localStorage.setItem("nicola-lang", lang); } catch {}
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
