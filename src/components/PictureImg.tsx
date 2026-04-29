import { cn } from "@/lib/utils";

const stripExt = (src: string) => src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
const toWebP = (src: string) => stripExt(src) + ".webp";

interface PictureImgProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  width?: number;
  height?: number;
  fadeIn?: boolean;
  sizes?: string;
  responsive?: boolean;
}

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
}: PictureImgProps) => {
  const fadeClass = fadeIn ? "opacity-0 transition-opacity duration-700" : "";
  return (
    <picture>
      <source srcSet={toWebP(src)} type="image/webp" />
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
