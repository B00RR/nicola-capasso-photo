import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/i18n/useLang";

interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  location: string;
  chapter?: string | null;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const imgVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center:              { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir * -28 }),
};

export const Lightbox = ({ images, index, onClose, onPrev, onNext }: LightboxProps) => {
  const { t } = useLang();
  // Track previous index to derive slide direction.
  // prevIndexRef lags one render behind (updated in useEffect), so during the
  // render that fires when index changes it still holds the old value — which
  // is exactly what we need to compute direction correctly.
  const prevIndexRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const dir =
    index !== null && prevIndexRef.current !== null
      ? index > prevIndexRef.current ? 1 : -1
      : 0;

  useEffect(() => {
    prevIndexRef.current = index;
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    // Save focus, move it to close button so screen readers anchor on the
    // dialog and Tab keeps a sensible starting point.
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Tab") {
        // Trap focus inside the dialog: cycle between focusable elements.
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restore focus to whatever opened the lightbox.
      previouslyFocusedRef.current?.focus?.();
    };
  }, [index, onClose, onPrev, onNext]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/96 px-4 md:px-16"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.a11y.lightboxLabel}
        >
          <button
            ref={closeBtnRef}
            aria-label={t.a11y.lightboxClose}
            onClick={onClose}
            className="absolute top-6 right-6 text-background/70 hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 focus-visible:rounded-sm"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <button
              aria-label={t.a11y.lightboxPrev}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 text-background/60 hover:text-background transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 focus-visible:rounded-sm"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Inner AnimatePresence handles slide transitions between images */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center">
                {!loaded && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-background/5 backdrop-blur-sm"
                    />
                    <div className="relative w-8 h-8 border-2 border-background/20 border-t-background/80 rounded-full animate-spin motion-reduce:animate-none" />
                  </>
                )}
                <img
                  src={current.src}
                  alt={current.alt}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setLoaded(true)}
                  className={`w-full max-h-[80vh] object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-6">
                <div className="min-w-0">
                  <span className="font-display italic text-background text-lg">{current.title}</span>
                  {current.chapter && (
                    <p className="mt-1 font-sans-tight text-[10px] uppercase text-background/45 tracking-[0.18em]">
                      {current.chapter}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-sans-tight text-[10px] uppercase text-background/50 tracking-[0.15em]">
                    {current.location}
                  </span>
                  {images.length > 1 && (
                    <p className="mt-2 font-sans-tight text-[10px] text-background/35">
                      {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-3 font-sans-tight text-[10px] text-background/30 text-right">
                {t.a11y.lightboxHint}
              </p>
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <button
              aria-label={t.a11y.lightboxNext}
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 text-background/60 hover:text-background transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/60 focus-visible:rounded-sm"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
