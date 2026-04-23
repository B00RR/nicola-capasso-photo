import { useLang } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  const { lang, toggle, t } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-gradient-to-b from-background/85 via-background/45 to-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1500px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between",
          !(scrolled || open) && "[text-shadow:0_1px_3px_rgba(255,250,240,0.75)]"
        )}
      >
        <Link
          to="/"
          className="font-display text-xl md:text-2xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm"
          aria-label="Nicola — Wedding photography"
        >
          Nicola<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "font-sans-tight text-[11px] uppercase underline-grow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm",
                pathname === l.to ? "text-foreground" : "text-foreground/90 hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="font-sans-tight text-[11px] uppercase tracking-[0.2em] text-foreground/90 hover:text-foreground transition-colors"
            aria-label="Switch language"
          >
            <span className={lang === "it" ? "text-foreground" : ""}>IT</span>
            <span className="mx-1.5 opacity-40">/</span>
            <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Menu"
        >
          <span className={cn("h-px w-6 bg-foreground transition-transform", open && "translate-y-[6px] rotate-45")} />
          <span className={cn("h-px w-6 bg-foreground transition-opacity", open && "opacity-0")} />
          <span className={cn("h-px w-6 bg-foreground transition-transform", open && "-translate-y-[6px] -rotate-45")} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-500 bg-background/95 backdrop-blur-md",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="font-sans-tight text-[11px] uppercase tracking-[0.2em] text-muted-foreground self-start mt-2"
          >
            <span className={lang === "it" ? "text-foreground" : ""}>IT</span>
            <span className="mx-1.5 opacity-40">/</span>
            <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
