import { useParams, Link } from "react-router-dom";
import { useLang } from "@/i18n/useLang";
import { usePageMeta } from "@/hooks/usePageMeta";
import { portfolio } from "@/data/portfolio";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

const Shoot = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const revealRef = useReveal<HTMLDivElement>(0.05);

  const shoot = portfolio
    .flatMap((y) => y.shoots)
    .find((s) => s.id === id);

  if (!shoot) {
    return (
      <main className="pt-32 md:pt-36 pb-10 px-6 md:px-10 max-w-[1500px] mx-auto text-center">
        <h1 className="font-display text-4xl md:text-6xl">
          {lang === "it" ? "Storia non trovata" : "Story not found"}
        </h1>
        <Link to="/portfolio" className="inline-block mt-8 font-sans-tight text-[11px] uppercase border-b border-foreground/40 pb-2 hover:border-foreground transition-colors">
          {lang === "it" ? "Torna al portfolio" : "Back to portfolio"} →
        </Link>
      </main>
    );
  }

  const title = `${shoot.title} — Nicola`;
  const description = lang === "it"
    ? `Reportage di matrimonio di ${shoot.title} a ${shoot.location}. Fotografia di Nicola Capasso.`
    : `Wedding reportage of ${shoot.title} in ${shoot.location}. Photography by Nicola Capasso.`;
  usePageMeta({ title, description, path: `/shoot/${shoot.id}` });

  return (
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <section className="px-6 md:px-10 max-w-[1500px] mx-auto">
        <div ref={revealRef} className="reveal">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-sans-tight text-[11px] uppercase text-muted-foreground">
              {shoot.location}
            </span>
            <span className="h-px flex-1 max-w-[4rem] bg-border" />
          </div>

          <motion.h1
            className="font-display text-4xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {shoot.title}
          </motion.h1>

          <div className="mt-12 md:mt-16 overflow-hidden bg-secondary">
            <motion.picture
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <source srcSet={toWebP(shoot.image)} type="image/webp" />
              <img
                src={shoot.image}
                alt={`${shoot.title} — ${shoot.location}`}
                loading="eager"
                width={1600}
                height={1067}
                className="w-full aspect-[3/2] object-cover"
              />
            </motion.picture>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <Link
              to="/portfolio"
              className="font-sans-tight text-[11px] uppercase border-b border-foreground/40 pb-2 hover:border-foreground transition-colors"
            >
              {lang === "it" ? "Torna al portfolio" : "Back to portfolio"} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shoot;
