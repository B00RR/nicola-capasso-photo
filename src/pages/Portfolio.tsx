import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

const Portfolio = () => {
  const { t, lang } = useLang();
  const [activeYear, setActiveYear] = useState(portfolio[0].year);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    document.title = lang === "it" ? "Portfolio — Nicola" : "Portfolio — Nicola";
  }, [lang]);

  // Update active year based on which section is closest to viewport center
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const center = window.innerHeight * 0.4;
      let best = portfolio[0].year;
      let bestDist = Infinity;
      portfolio.forEach((y) => {
        const el = sectionRefs.current[y.year];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // distance from section top to our reference line
        const dist = Math.abs(rect.top - center);
        // prefer sections whose top is at or above the line
        if (rect.top <= center + 10 && dist < bestDist) {
          bestDist = dist;
          best = y.year;
        }
      });
      setActiveYear(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (year: number) => {
    sectionRefs.current[year]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="pt-32 md:pt-36">
      {/* Intro */}
      <section className="px-6 md:px-10 max-w-[1500px] mx-auto pt-12 md:pt-0 pb-16 md:pb-24">
        <p className="font-sans-tight text-[11px] uppercase text-muted-foreground mb-6">— {t.portfolio.kicker}</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] md:leading-[1] whitespace-pre-line max-w-4xl">
          {t.portfolio.title}
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">{t.portfolio.intro}</p>
      </section>

      {/* Timeline */}
      <div className="relative px-6 md:px-10 max-w-[1500px] mx-auto pb-24">
        <div className="flex gap-10 md:gap-16">
          {/* Sticky year nav */}
          <aside className="hidden md:block w-24 shrink-0">
            <div className="sticky top-28">
              <p className="font-sans-tight text-[10px] uppercase text-muted-foreground mb-6">Timeline</p>
              <div className="relative pl-4">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
                <div
                  className="absolute left-0 w-px bg-foreground transition-all duration-700"
                  style={{
                    top: `${portfolio.findIndex((p) => p.year === activeYear) * 56 + 8}px`,
                    height: "32px",
                  }}
                />
                <ul className="flex flex-col gap-7">
                  {portfolio.map((y) => (
                    <li key={y.year}>
                      <button
                        onClick={() => scrollTo(y.year)}
                        className={cn(
                          "font-display text-2xl transition-all",
                          activeYear === y.year ? "text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground"
                        )}
                      >
                        {y.year}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Mobile floating year selector */}
          <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-background/90 backdrop-blur border-b border-border/60">
            <div className="flex overflow-x-auto px-6 py-3 gap-5 no-scrollbar">
              {portfolio.map((y) => (
                <button
                  key={y.year}
                  onClick={() => scrollTo(y.year)}
                  className={cn(
                    "font-display text-xl transition-colors shrink-0",
                    activeYear === y.year ? "text-foreground" : "text-muted-foreground/60"
                  )}
                >
                  {y.year}
                </button>
              ))}
            </div>
          </div>

          {/* Years */}
          <div className="flex-1 min-w-0 space-y-32 md:space-y-48 pt-6 md:pt-0">
            {portfolio.map((y) => (
              <YearSection
                key={y.year}
                yearData={y}
                lang={lang}
                registerRef={(el) => (sectionRefs.current[y.year] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

interface YearSectionProps {
  yearData: typeof portfolio[number];
  lang: "it" | "en";
  registerRef: (el: HTMLElement | null) => void;
}

const YearSection = ({ yearData, lang, registerRef }: YearSectionProps) => {
  const revealRef = useReveal<HTMLElement>(0.05);
  const setRefs = (el: HTMLElement | null) => {
    (revealRef as any).current = el;
    registerRef(el);
  };
  return (
    <section ref={setRefs} className="reveal scroll-mt-32" data-year={yearData.year}>
      <div className="flex items-baseline gap-6 mb-8 md:mb-12">
        <h2 className="font-display text-7xl md:text-[9rem] leading-none">{yearData.year}</h2>
        <div className="flex-1 h-px bg-border" />
        <span className="font-sans-tight text-[10px] uppercase text-muted-foreground">{yearData.shoots.length} stories</span>
      </div>
      <p className="max-w-xl text-muted-foreground italic font-display text-lg md:text-xl mb-12">
        {yearData.caption[lang]}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5">
        {yearData.shoots.map((s, i) => {
          const span =
            s.span === "wide"
              ? "col-span-2 md:col-span-4"
              : s.span === "tall"
              ? "col-span-2 md:col-span-2 md:row-span-2"
              : "col-span-2 md:col-span-2";
          const aspect = s.span === "tall" ? "aspect-[3/4]" : s.span === "wide" ? "aspect-[16/9]" : "aspect-[4/5]";
          return (
            <figure key={s.id} className={cn("group", span, i % 2 === 1 && "md:mt-12")}>
              <div className={cn("overflow-hidden", aspect)}>
                <img
                  src={s.image}
                  alt={`${s.title} — ${s.location}`}
                  loading="lazy"
                  className="h-full w-full object-cover hover-lift"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="font-display italic text-base md:text-lg">{s.title}</span>
                <span className="font-sans-tight text-[10px] uppercase text-muted-foreground">{s.location}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
