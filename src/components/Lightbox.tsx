import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  location: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  lang?: "it" | "en";
}

const imgVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center:              { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir * -28 }),
};

export const Lightbox = ({ images, index, onClose, onPrev, onNext, lang = "it" }: LightboxProps) => {
  // Track previous index to derive slide direction.
  // prevIndexRef lags one render behind (updated in useEffect), so during the
  // render that fires when index changes it still holds the old value — which
  // is exactly what we need to compute direction correctly.
  const prevIndexRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/96 px-4 md:px-16"
          onClick={onClose}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-6 right-6 text-background/70 hover:text-background transition-colors"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 text-background/60 hover:text-background transition-colors z-10"
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
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display italic text-background text-lg">{current.title}</span>
                <span className="font-sans-tight text-[10px] uppercase text-background/50 tracking-[0.15em]">
                  {current.location}
                </span>
              </div>
              {images.length > 1 && (
                <p className="mt-2 font-sans-tight text-[10px] text-background/30 text-right">
                  {(index ?? 0) + 1} / {images.length}
                </p>
              )}
              <p className="mt-1 font-sans-tight text-[10px] text-background/30 text-right">
                {lang === "it" ? "← → per navigare  ·  Esc per chiudere" : "← → to navigate  ·  Esc to close"}
              </p>
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 text-background/60 hover:text-background transition-colors z-10"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
