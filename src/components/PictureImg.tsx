import { cn } from "@/lib/utils";

const toWebP = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

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
  sizes?: string;
}

/**
 * Standardized <picture> wrapper with WebP source + JPG fallback and
 * optional fade-in on load. Centralizes the duplicated pattern across
 * Home, Portfolio, Story, and NavCard so future srcset/AVIF rollouts
 * touch a single component.
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
}: PictureImgProps) => {
  const webp = toWebP(src);
  const fadeClass = fadeIn ? "opacity-0 transition-opacity duration-700" : "";
  return (
    <picture>
      <source srcSet={webp} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        width={width}
        height={height}
        sizes={sizes}
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
