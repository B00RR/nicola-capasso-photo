import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { useReveal } from "@/hooks/useReveal";
import { portfolio } from "@/data/portfolio";

const heroImg = "/images/photo-22.jpg";
const aboutImg = "/images/photo-37.jpg";

const Home = () => {
  const { t, lang } = useLang();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 160]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.08]);

  const aboutRef = useReveal<HTMLDivElement>(0.05);
  const aboutImgRef = useReveal<HTMLDivElement>(0.05);
  const servicesRef = useReveal<HTMLDivElement>(0.05);
  const featRef = useReveal<HTMLDivElement>(0.05);

  useEffect(() => {
    document.title = lang === "it"
      ? "Nicola — Fotografo di matrimoni"
      : "Nicola — Wedding Photographer";
    const meta = document.querySelector('meta[name="description"]');
    const desc = lang === "it"
      ? "Nicola, fotografo freelance specializzato in matrimoni in Italia e nel mondo. Reportage cinematografico, autentico, su misura."
      : "Nicola, freelance wedding photographer based in Italy, available worldwide. Cinematic, honest, tailor-made reportage.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }

    const existing = document.getElementById('jsonld-schema');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-schema';
    script.textContent = JSON.stringify([
      {"@context":"https://schema.org","@type":"WebSite","name":"Nicola — Wedding Photographer","url":"https://nicola-captures-dreams.netlify.app/","potentialAction":{"@type":"SearchAction","target":"https://nicola-captures-dreams.netlify.app/portfolio","query-input":"required name=search_term_string"}},
      {"@context":"https://schema.org","@type":"Photographer","name":"Nicola","url":"https://nicola-captures-dreams.netlify.app/","sameAs":["https://instagram.com/nicola_captures"],"address":{"@type":"PostalAddress","addressCountry":"IT"},"areaServed":"IT"}
    ]);
    document.head.appendChild(script);

    return () => {
      document.getElementById('jsonld-schema')?.remove();
    };
  }, [lang]);

  // Marquee items (recent locations)
  const marquee = ["Como", "Positano", "Provence", "Santorini", "Capri", "Marrakech", "Cinque Terre", "Lisbon", "Mykonos"];

  // Featured grid: pick first shoot of each year
  const featured = portfolio.flatMap((y) => y.shoots.slice(0, 1));

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={heroImg}
            alt="Cinematic wedding moment at golden hour"
            loading="eager"
            fetchpriority="high"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/75" />
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-10 max-w-[1500px] mx-auto">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 1, delay: 0.2 }}
            className="font-sans-tight text-[11px] uppercase text-background/90 mb-6"
          >
            — {t.hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-background text-[15vw] md:text-[9vw] leading-[0.95] tracking-tight">
            {t.hero.title.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={prefersReducedMotion ? false : { y: "110%" }}
                  animate={prefersReducedMotion ? {} : { y: "0%" }}
                  transition={prefersReducedMotion ? {} : { duration: 1.1, delay: 0.35 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                  className="block"
                >
                  {i === 1 ? <em className="not-italic font-display italic">{line}</em> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={prefersReducedMotion ? {} : { duration: 1, delay: 1.1 }}
            className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <p className="max-w-md text-background/90 text-base md:text-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <Link
              to="/portfolio"
              className="font-sans-tight text-[11px] uppercase text-background border-b border-background/60 pb-2 self-start md:self-end hover:border-background transition-colors"
            >
              {t.hero.cta} →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={prefersReducedMotion ? {} : { duration: 1, delay: 1.4 }}
          className="absolute bottom-6 right-6 md:right-10 z-10 hidden md:flex items-center gap-3 text-background/80 text-[10px] font-sans-tight uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180"
        >
          {t.hero.scroll}
          <span className="block h-10 w-px bg-background/60 animate-pulse" />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border/60 py-6 overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={`${m}-${i}`} className="font-display italic text-3xl md:text-5xl px-8 text-muted-foreground">
              {m} <span className="text-accent mx-2">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 md:px-10 py-16 md:py-32 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:gap-16 items-start">
          <div ref={aboutImgRef} className="order-2 md:order-1 overflow-hidden">
            <img
              src={aboutImg}
              alt="Portrait of Nicola"
              loading="lazy"
              width={800}
              height={1000}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div ref={aboutRef} className="order-1 md:order-2 md:pt-4 max-w-2xl reveal">
            <p className="font-sans-tight text-[11px] uppercase text-muted-foreground mb-6">
              — {t.about.kicker}
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] whitespace-pre-line">
              {t.about.title}
            </h2>
            <div className="mt-8 space-y-5 max-w-lg text-muted-foreground leading-relaxed">
              {t.about.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {t.about.stats.map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl md:text-5xl">{s.n}</p>
                  <p className="font-sans-tight text-[10px] uppercase text-muted-foreground mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div ref={servicesRef} className="reveal px-6 md:px-10 py-24 md:py-32 max-w-[1500px] mx-auto">
          <p className="font-sans-tight text-[11px] uppercase text-muted-foreground mb-6">
            — {t.services.kicker}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 border border-border/60">
            {t.services.items.map((s, i) => (
              <div key={s.t} className="bg-background p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary/30 transition-colors">
                <span className="font-sans-tight text-[10px] uppercase text-accent">0{i + 1}</span>
                <h3 className="font-display text-2xl md:text-3xl">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED IMAGES */}
      <section ref={featRef} className="reveal px-6 md:px-10 py-24 md:py-32 max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <p className="font-sans-tight text-[11px] uppercase text-muted-foreground mb-4">— {t.portfolio.kicker}</p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight whitespace-pre-line max-w-2xl">
              {t.portfolio.title}
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="font-sans-tight text-[11px] uppercase border-b border-foreground/40 pb-2 hover:border-foreground transition-colors hidden md:inline-block"
          >
            {t.portfolio.viewAll} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {featured.map((s, i) => (
            <Link
              key={s.id}
              to="/portfolio"
              className={`overflow-hidden block ${i % 2 === 0 ? "md:mt-12" : ""}`}
            >
              <div className="overflow-hidden aspect-[3/4]">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={600}
                  height={800}
                  className="h-full w-full object-cover hover-lift"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-display italic text-base md:text-lg">{s.title}</p>
                <p className="font-sans-tight text-[10px] uppercase text-muted-foreground">{s.location.split(",")[1]?.trim()}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/portfolio"
          className="font-sans-tight text-[11px] uppercase border-b border-foreground/40 pb-2 hover:border-foreground transition-colors mt-10 inline-block md:hidden"
        >
          {t.portfolio.viewAll} →
        </Link>
      </section>
    </main>
  );
};

export default Home;
