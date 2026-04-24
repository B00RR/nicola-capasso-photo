import { useEffect } from "react";
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
}

export const Lightbox = ({ images, index, onClose, onPrev, onNext }: LightboxProps) => {
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
              className="absolute left-4 md:left-8 text-background/60 hover:text-background transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="w-full max-h-[80vh] object-contain"
            />
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
          </motion.div>

          {images.length > 1 && (
            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 text-background/60 hover:text-background transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
