import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/i18n/useLang";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { portfolio } from "@/data/portfolio";
import { SITE_URL } from "@/config/site";
import { PictureImg } from "@/components/PictureImg";
import homeData from "@/content/home.json";
import siteData from "@/content/site.json";

const heroImg = `${import.meta.env.BASE_URL}images/photo-22.jpg`;
const aboutImg = `${import.meta.env.BASE_URL}images/photo-37.jpg`;

const Home = () => {
  const { t, lang } = useLang();
  const title = lang === "it" ? "Nicola \u2014 Fotografo di matrimoni" : "Nicola \u2014 Wedding Photographer";
  const description = lang === "it"
    ? "Nicola, fotografo freelance specializzato in matrimoni in Italia e nel mondo. Reportage cinematografico, autentico, su misura."
    : "Nicola, freelance wedding photographer based in Italy, available worldwide. Cinematic, honest, tailor-made reportage.";
  usePageMeta({ title, description, path: "/" });

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
    const existing = document.getElementById('jsonld-schema');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-schema';
    script.textContent = JSON.stringify([
      {"@context":"https://schema.org","@type":"WebSite","name":"Nicola \u2014 Wedding Photographer","url":`${SITE_URL}/`,"potentialAction":{"@type":"SearchAction","target":`${SITE_URL}/portfolio`,"query-input":"required name=search_term_string"}},
      {"@context":"https://schema.org","@type":"LocalBusiness","name":"Nicola Capasso","url":`${SITE_URL}/`,"email":siteData.contacts.email,"telephone":siteData.contacts.whatsapp,"address":{"@type":"PostalAddress","addressCountry":"IT"},"areaServed":"IT","contactPoint":{"@type":"ContactPoint","telephone":siteData.contacts.whatsapp,"contactType":"Customer Service","availableLanguage":["Italian","English"]}}
    ]);
    document.head.appendChild(script);
    return () => { document.getElementById('jsonld-schema')?.remove(); };
  }, [lang]);

  // Marquee items (editable via CMS in src/content/home.json)
  const marquee = homeData.marquee;

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
          <PictureImg
            src={heroImg}
            alt={t.hero.imageAlt}
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/75" />
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div aria-hidden="true" className="grain-overlay" />
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

          <h1 className="font-display text-background text-[clamp(2.75rem,13vw,6rem)] md:text-[9vw] leading-[0.95] tracking-tight">
            {t.hero.title.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
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
      <section className="border-y border-border/60 py-6 overflow-hidden relative">
        <span
          aria-hidden="true"
          className="hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 items-center gap-2 font-sans-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground bg-background/80 backdrop-blur-sm pr-4"
        >
          <span className="h-px w-6 bg-accent" />
          {t.marquee.label}
        </span>
        <div aria-hidden="true" className="flex marquee-track whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={`${m}-${i}`} className="font-display italic text-3xl md:text-5xl px-8 text-foreground/80 inline-flex items-center">
              {m}
              <span aria-hidden className="mx-6 h-[1px] w-8 bg-accent" />
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 md:px-10 py-16 md:py-32 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:gap-16 items-start">
          <div ref={aboutImgRef} className="order-2 md:order-1 overflow-hidden bg-secondary">
            <PictureImg
              src={aboutImg}
              alt={t.about.imageAlt}
              width={800}
              height={1000}
              fadeIn
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div ref={aboutRef} className="order-1 md:order-2 md:pt-4 max-w-2xl reveal">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">01</span>
              <span className="h-px flex-1 max-w-[4rem] bg-border" />
              <p className="font-sans-tight text-[11px] uppercase text-muted-foreground">
                {t.about.kicker}
              </p>
            </div>
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
      <section className="bg-secondary border-y border-border/60">
        <div ref={servicesRef} className="reveal px-6 md:px-10 py-24 md:py-32 max-w-[1500px] mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">02</span>
            <span className="h-px flex-1 max-w-[4rem] bg-border" />
            <p className="font-sans-tight text-[11px] uppercase text-muted-foreground">
              {t.services.kicker}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {t.services.items.map((s, i) => (
              <div
                key={s.t}
                className="group relative bg-background p-8 md:p-10 flex flex-col gap-4 transition-[background-color,color,transform,box-shadow] duration-500 ease-editorial hover:bg-foreground hover:text-background hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_hsl(25_18%_14%/0.35)] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
              >
                <span className="font-sans-tight text-[10px] uppercase text-accent transition-colors group-hover:text-accent/90">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-background/80 transition-colors">
                  {s.d}
                </p>
                <span aria-hidden="true" className="absolute inset-x-8 md:inset-x-10 bottom-6 h-px bg-current opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED IMAGES */}
      <section ref={featRef} className="reveal px-6 md:px-10 py-24 md:py-32 max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">03</span>
              <span className="h-px flex-1 max-w-[4rem] bg-border" />
              <p className="font-sans-tight text-[11px] uppercase text-muted-foreground">
                {t.portfolio.kicker}
              </p>
            </div>
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

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6">
          {featured.map((s, i) => {
            // Editorial 2-row layout on desktop: large+small, then small+large.
            const layout =
              i === 0
                ? { span: "md:col-span-4", aspect: "md:aspect-[4/3]" }
                : i === 1
                  ? { span: "md:col-span-2 md:mt-16", aspect: "md:aspect-[3/4]" }
                  : i === 2
                    ? { span: "md:col-span-2", aspect: "md:aspect-[3/4]" }
                    : { span: "md:col-span-4 md:-mt-16", aspect: "md:aspect-[4/3]" };
            return (
              <Link
                key={s.id}
                to={`/portfolio/${s.id}`}
                className={`overflow-hidden block col-span-1 ${layout.span}`}
              >
                <div className={`overflow-hidden aspect-[3/4] bg-secondary ${layout.aspect}`}>
                  <PictureImg
                    src={s.image}
                    alt={s.title}
                    width={i === 0 || i === 3 ? 1200 : 600}
                    height={i === 0 || i === 3 ? 900 : 800}
                    fadeIn
                    className="h-full w-full object-cover hover-lift"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="font-display italic text-base md:text-lg">{s.title}</p>
                  <p className="font-sans-tight text-[10px] uppercase text-muted-foreground">{s.location.split(",")[1]?.trim()}</p>
                </div>
              </Link>
            );
          })}
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
