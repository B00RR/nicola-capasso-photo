import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/useLang";
import { usePageMeta } from "@/hooks/usePageMeta";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { findShoot, type ShootVideo } from "@/data/portfolio";
import { Lightbox } from "@/components/Lightbox";
import { PictureImg } from "@/components/PictureImg";
import { SITE_URL } from "@/config/site";

const Story = () => {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useLang();
  const prefersReducedMotion = usePrefersReducedMotion();

  const found = useMemo(() => (id ? findShoot(id) : null), [id]);

  const meta = useMemo(() => {
    if (!found) return null;
    const { shoot } = found;
    const t =
      lang === "it"
        ? `${shoot.title} — ${shoot.location} · Nicola`
        : `${shoot.title} — ${shoot.location} · Nicola`;
    const desc = shoot.story
      ? shoot.story[lang]
      : lang === "it"
      ? `Reportage di matrimonio di ${shoot.title} a ${shoot.location}.`
      : `Wedding reportage of ${shoot.title} in ${shoot.location}.`;
    return { title: t, description: desc };
  }, [found, lang]);

  usePageMeta({
    title: meta?.title ?? "",
    description: meta?.description ?? "",
    path: `/portfolio/${id ?? ""}`,
    image: found?.shoot.image,
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!found) return;
    const elId = "jsonld-breadcrumb";
    document.getElementById(elId)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = elId;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE_URL}/portfolio` },
        { "@type": "ListItem", position: 3, name: found.shoot.title, item: `${SITE_URL}/portfolio/${found.shoot.id}` },
      ],
    });
    document.head.appendChild(script);
    return () => { document.getElementById(elId)?.remove(); };
  }, [found]);

  if (!found) return <Navigate to="/portfolio" replace />;

  const { shoot, prev, next } = found;
  const images = shoot.gallery && shoot.gallery.length > 0
    ? [shoot.image, ...shoot.gallery]
    : [shoot.image];

  const yearLabel = shoot.date ?? String(shoot.year);

  return (
    <>
      <main>
        {/* HERO */}
        <section className="relative h-[80svh] md:h-[92svh] w-full overflow-hidden">
          <PictureImg
            src={shoot.image}
            alt={`${shoot.title} — ${shoot.location}`}
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/80" />
          <div aria-hidden="true" className="grain-overlay" />

          <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-24 px-6 md:px-10 max-w-[1500px] mx-auto">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.15 }}
              className="font-sans-tight text-[11px] uppercase tracking-[0.22em] text-background/85 mb-5 inline-flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {t.story.kicker}
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.1, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-display text-background text-[clamp(2.5rem,10vw,7rem)] md:text-[7vw] leading-[0.95] tracking-tight max-w-5xl"
            >
              {shoot.title}
            </motion.h1>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.7 }}
              className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-background/85"
            >
              <span className="font-display italic text-xl md:text-2xl">{shoot.location}</span>
              <span className="hidden md:block h-px w-8 bg-background/50" />
              <span className="font-sans-tight text-[11px] uppercase tracking-[0.22em]">{yearLabel}</span>
            </motion.div>
          </div>
        </section>

        {/* STORY TEXT (optional) */}
        {shoot.story && (
          <section className="px-6 md:px-10 max-w-3xl mx-auto py-20 md:py-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">01</span>
              <span className="h-px flex-1 max-w-[4rem] bg-border" />
              <p className="font-sans-tight text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t.story.sectionStory}
              </p>
            </div>
            <p className="font-display italic text-2xl md:text-4xl leading-snug text-foreground">
              {shoot.story[lang]}
            </p>
          </section>
        )}

        {/* GALLERY */}
        <section className="px-6 md:px-10 max-w-[1500px] mx-auto pb-24 md:pb-32">
          <div className="mb-10 flex items-center gap-4">
            <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">
              {shoot.story ? "02" : "01"}
            </span>
            <span className="h-px flex-1 max-w-[4rem] bg-border" />
            <p className="font-sans-tight text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {t.story.sectionGallery}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-5">
            {images.map((img, i) => {
              const variant = i % 5;
              const layout =
                variant === 0
                  ? { span: "col-span-1 md:col-span-6", aspect: "aspect-[21/9]", margin: "mb-8 md:mb-16" }
                  : variant === 1
                  ? { span: "col-span-1 md:col-span-3", aspect: "aspect-[3/4]", margin: "" }
                  : variant === 2
                  ? { span: "col-span-1 md:col-span-3", aspect: "aspect-[4/3]", margin: "md:mt-8" }
                  : variant === 3
                  ? { span: "col-span-1 md:col-span-6", aspect: "aspect-[21/9]", margin: "mb-8 md:mb-16 mt-2" }
                  : { span: "col-span-1 md:col-span-3", aspect: "aspect-[4/5]", margin: "md:mt-6" };

              const displayIndex = String(i + 1).padStart(2, "0");

              return (
                <motion.figure
                  key={`${img}-${i}`}
                  className={`group cursor-zoom select-none ${layout.span} ${layout.margin}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: (i % 3) * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className={`relative overflow-hidden bg-secondary ${layout.aspect}`}>
                    <PictureImg
                      src={img}
                      alt={`${shoot.title} — ${i + 1}`}
                      loading={i < 2 ? "eager" : "lazy"}
                      fadeIn
                      sizes={variant === 0 || variant === 3 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="h-full w-full object-cover hover-lift"
                    />
                    {/* Sequential number overlay (hover) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-4 left-4 md:top-6 md:left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none"
                    >
                      <span className="font-display italic text-background/70 text-2xl md:text-3xl tracking-tight">
                        {displayIndex}
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/35 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none"
                    />
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </section>

        {/* VIDEO (optional) */}
        {shoot.video && (
          <section className="px-6 md:px-10 max-w-[1500px] mx-auto pb-24 md:pb-32">
            <div className="mb-10 flex items-center gap-4">
              <span className="font-display italic text-accent text-3xl md:text-4xl leading-none">
                {shoot.story ? "03" : "02"}
              </span>
              <span className="h-px flex-1 max-w-[4rem] bg-border" />
              <p className="font-sans-tight text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t.story.sectionFilm}
              </p>
            </div>
            <VideoEmbed video={shoot.video} title={shoot.title} />
          </section>
        )}

        {/* PREV / NEXT */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-14 md:py-20 grid gap-8 md:grid-cols-3 items-center">
            <div className="md:order-2 flex justify-center">
              <Link
                to="/portfolio"
                className="font-sans-tight text-[11px] uppercase tracking-[0.22em] underline-grow pb-1 text-foreground/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm"
              >
                {t.story.allStories}
              </Link>
            </div>

            <div className="md:order-1">
              {prev ? (
                <NavCard
                  shoot={prev}
                  direction="prev"
                  label={t.story.previous}
                />
              ) : (
                <span aria-hidden="true" className="block h-full" />
              )}
            </div>

            <div className="md:order-3 md:text-right">
              {next ? (
                <NavCard
                  shoot={next}
                  direction="next"
                  label={t.story.next}
                />
              ) : (
                <span aria-hidden="true" className="block h-full" />
              )}
            </div>
          </div>
        </section>
      </main>

      <Lightbox
        images={images.map((src, i) => ({
          src,
          alt: `${shoot.title} — ${i + 1}`,
          title: shoot.title,
          location: shoot.location,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : null))
        }
        onNext={() =>
          setLightboxIndex((i) =>
            i !== null ? Math.min(images.length - 1, i + 1) : null
          )
        }
      />
    </>
  );
};

interface NavCardProps {
  shoot: { id: string; title: string; location: string; image: string };
  direction: "prev" | "next";
  label: string;
}

const NavCard = ({ shoot, direction, label }: NavCardProps) => {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      to={`/portfolio/${shoot.id}`}
      className={`group flex items-center gap-5 ${
        direction === "next" ? "md:flex-row-reverse md:text-right" : ""
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:rounded-sm`}
    >
      <div className="relative h-16 w-20 md:h-20 md:w-28 shrink-0 overflow-hidden bg-secondary">
        <PictureImg
          src={shoot.image}
          alt=""
          responsive={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <p className="font-sans-tight text-[10px] uppercase tracking-[0.22em] text-muted-foreground inline-flex items-center gap-2">
          {direction === "prev" && <Icon size={12} className="transition-transform duration-500 group-hover:-translate-x-0.5" />}
          {label}
          {direction === "next" && <Icon size={12} className="transition-transform duration-500 group-hover:translate-x-0.5" />}
        </p>
        <p className="font-display italic text-lg md:text-xl mt-1 truncate">{shoot.title}</p>
        <p className="font-sans-tight text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80 truncate">
          {shoot.location}
        </p>
      </div>
    </Link>
  );
};

interface VideoEmbedProps {
  video: ShootVideo;
  title: string;
}

const VideoEmbed = ({ video, title }: VideoEmbedProps) => {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);

  // mp4: native <video> with poster + click-to-play
  if (video.provider === "mp4") {
    return (
      <div className="relative aspect-video bg-foreground overflow-hidden">
        <video
          src={video.src}
          poster={video.poster}
          controls
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Vimeo / YouTube: lazy iframe (mounted only after click) so we don't ship
  // their player JS to every visitor that just scrolls past.
  const iframeSrc =
    video.provider === "vimeo"
      ? `https://player.vimeo.com/video/${video.src}?autoplay=1&title=0&byline=0&portrait=0`
      : `https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="relative aspect-video bg-foreground overflow-hidden">
      {playing ? (
        <iframe
          src={iframeSrc}
          title={`${title} — film`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label={t.story.playFilm}
        >
          {video.poster && (
            <img
              src={video.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          <span aria-hidden="true" className="absolute inset-0 bg-foreground/20" />
          <span className="relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-background/85 backdrop-blur-sm transition-transform duration-500 ease-editorial group-hover:scale-105">
            <span
              aria-hidden="true"
              className="block h-0 w-0 ml-1 border-y-[10px] border-y-transparent border-l-[16px] border-l-foreground"
            />
          </span>
        </button>
      )}
    </div>
  );
};

export default Story;
