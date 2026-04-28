import { cn } from "@/lib/utils";

const stripExt = (src: string) => src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
const toWebP = (src: string) => stripExt(src) + ".webp";

const RESPONSIVE_WIDTHS = [640, 1280, 1920] as const;

const buildSrcSet = (src: string, ext: "webp" | "avif") => {
  const stem = stripExt(src);
  return RESPONSIVE_WIDTHS.map((w) => `${stem}-${w}w.${ext} ${w}w`).join(", ");
};

interface PictureImgProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  width?: number;
  height?: number;
  /** When true, image starts at opacity-0 and fades in on load. */
  fadeIn?: boolean;
  /** Required for responsive srcset (without it the browser can't pick a width). */
  sizes?: string;
  /**
   * Set false on tiny chrome (NavCard thumbnails, etc.) where shipping a
   * responsive set would just download the smallest variant anyway.
   * Falls back to the original WebP/JPG.
   */
  responsive?: boolean;
}

/**
 * Standardized <picture> wrapper with AVIF + WebP responsive sources and
 * a JPG fallback. Also handles the opacity-0 → opacity-100 fade-in on load
 * when `fadeIn` is set. Centralizes the duplicated pattern across Home,
 * Portfolio, Story, and NavCard so future format/width rollouts touch a
 * single component.
 */
export const PictureImg = ({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  width,
  height,
  fadeIn = false,
  sizes,
  responsive = true,
}: PictureImgProps) => {
  const fadeClass = fadeIn ? "opacity-0 transition-opacity duration-700" : "";

  const sources = responsive ? (
    <>
      <source srcSet={buildSrcSet(src, "avif")} type="image/avif" sizes={sizes} />
      <source srcSet={buildSrcSet(src, "webp")} type="image/webp" sizes={sizes} />
    </>
  ) : (
    <source srcSet={toWebP(src)} type="image/webp" />
  );

  return (
    <picture>
      {sources}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchpriority={fetchPriority}
        decoding={decoding}
        width={width}
        height={height}
        className={cn(fadeClass, className)}
        onLoad={
          fadeIn
            ? (e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")
            : undefined
        }
        ref={
          fadeIn
            ? (img) => {
                if (img?.complete) img.classList.replace("opacity-0", "opacity-100");
              }
            : undefined
        }
      />
    </picture>
  );
};
