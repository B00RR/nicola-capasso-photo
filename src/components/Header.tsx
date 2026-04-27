import { useLang } from "@/i18n/useLang";
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

  // On the Home page the header sits on top of a dark hero image; elsewhere
  // it sits on the ivory background. Switch chrome accordingly.
  const onHero = pathname === "/" && !scrolled && !open;
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solid
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : onHero
            ? "bg-gradient-to-b from-black/55 via-black/25 to-transparent"
            : "bg-background/0"
      )}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link
          to="/"
          className={cn(
            "flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded-sm transition-[filter] duration-500",
            onHero ? "focus-visible:ring-background/60 [filter:brightness(0)_invert(1)]" : "focus-visible:ring-foreground/50"
          )}
          aria-label="Nicola Capasso — Wedding photography"
        >
          <img
            src={`${import.meta.env.BASE_URL}favicon.svg`}
            alt=""
            className="h-9 md:h-10 w-auto"
            aria-hidden="true"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-sans-tight text-[11px] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:rounded-sm transition-colors",
                  isActive ? "underline-active" : "underline-grow",
                  onHero
                    ? "text-background/90 hover:text-background focus-visible:ring-background/60"
                    : "text-foreground/90 hover:text-foreground focus-visible:ring-foreground/50",
                  isActive && (onHero ? "text-background" : "text-foreground")
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={toggle}
            className={cn(
              "font-sans-tight text-[11px] uppercase tracking-[0.2em] transition-colors",
              onHero ? "text-background/90 hover:text-background" : "text-foreground/90 hover:text-foreground"
            )}
            aria-label={t.a11y.switchLanguage}
          >
            <span className={cn(lang === "it" && (onHero ? "text-background" : "text-foreground"))}>IT</span>
            <span className="mx-1.5 opacity-40">/</span>
            <span className={cn(lang === "en" && (onHero ? "text-background" : "text-foreground"))}>EN</span>
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className={cn("h-px w-6 transition-transform", onHero ? "bg-background" : "bg-foreground", open && "translate-y-[6px] rotate-45")} />
          <span className={cn("h-px w-6 transition-opacity", onHero ? "bg-background" : "bg-foreground", open && "opacity-0")} />
          <span className={cn("h-px w-6 transition-transform", onHero ? "bg-background" : "bg-foreground", open && "-translate-y-[6px] -rotate-45")} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-500 bg-background/95 backdrop-blur-md",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "font-display text-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm transition-colors flex items-center gap-3",
                  isActive ? "text-foreground" : "text-foreground/70"
                )}
              >
                {isActive && <span aria-hidden="true" className="h-px w-6 bg-accent" />}
                {l.label}
              </Link>
            );
          })}
          {/* Language switch hidden on mobile — auto-detected from OS */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
