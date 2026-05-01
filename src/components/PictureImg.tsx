import { cn } from "@/lib/utils";

const stripExt = (src: string) => src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
const toWebP = (src: string) => stripExt(src) + ".webp";
const toResponsiveWebP = (src: string, width: number) => `${stripExt(src)}-${width}w.webp`;
const toResponsiveAvif = (src: string, width: number) => `${stripExt(src)}-${width}w.avif`;
const responsiveWidths = [640];

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
  sizes = "100vw",
  responsive = true,
}: PictureImgProps) => {
  const fadeClass = fadeIn ? "opacity-0 transition-opacity duration-700" : "";
  const avifSrcSet = responsive
    ? responsiveWidths.map((w) => `${toResponsiveAvif(src, w)} ${w}w`).join(", ")
    : undefined;
  const webpSrcSet = responsive
    ? [
        ...responsiveWidths.map((w) => `${toResponsiveWebP(src, w)} ${w}w`),
        toWebP(src),
      ].join(", ")
    : toWebP(src);

  return (
    <picture>
      {responsive && <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" />}
      <source srcSet={webpSrcSet} sizes={responsive ? sizes : undefined} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchpriority={fetchPriority}
        decoding={decoding}
        width={width}
        height={height}
        sizes={responsive ? sizes : undefined}
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
