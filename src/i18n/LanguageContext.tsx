import { useEffect, useState, ReactNode } from "react";
import { translations, type Lang } from "./translations";
import { LanguageContext } from "./useLang";
import { safeGet, safeSet } from "@/lib/safeStorage";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = safeGet("nicola-lang") as Lang | null;
    if (saved === "it" || saved === "en") return saved;
    return navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
  });

  useEffect(() => {
    safeSet("nicola-lang", lang);
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
