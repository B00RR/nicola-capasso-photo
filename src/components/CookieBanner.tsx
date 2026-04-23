import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "nicola-cookie-consent";

const CookieBanner = () => {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const id = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(id);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.legal.cookieBanner.title}
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[60] bg-background border border-border rounded-sm shadow-lg p-5 md:p-6"
    >
      <p className="font-display text-lg md:text-xl leading-snug">
        {t.legal.cookieBanner.title}
      </p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {t.legal.cookieBanner.body}
      </p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <Link
          to="/cookies"
          className="font-sans-tight text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground underline-grow"
        >
          {t.legal.cookieBanner.more}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="font-sans-tight text-[11px] uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
        >
          {t.legal.cookieBanner.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
