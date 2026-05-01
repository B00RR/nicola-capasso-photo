import { useEffect } from "react";
import { SITE_URL } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Optional absolute or root-relative image URL for og:image / twitter:image. */
  image?: string;
  /** Open Graph content type. */
  type?: "website" | "article";
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Build an absolute URL from a path that may already be base-prefixed (via
// withBase()). SITE_URL is expected to include the deploy base, so we strip
// the base from the path before concatenating to avoid duplication.
const toAbsolute = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url;
  const base = import.meta.env.BASE_URL || "/";
  const path = url.startsWith(base)
    ? "/" + url.slice(base.length)
    : url.startsWith("/")
    ? url
    : "/" + url;
  return `${SITE_URL}${path}`;
};

export const usePageMeta = ({ title, description, path, image, type = "website" }: PageMeta) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, val: string, prop = false) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (prop) el.setAttribute("property", attr);
        else el.setAttribute("name", attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };

    const ogImage = image ? toAbsolute(image) : DEFAULT_OG_IMAGE;

    setMeta('meta[name="description"]', "description", description);
    setMeta('meta[property="og:title"]', "og:title", title, true);
    setMeta('meta[property="og:description"]', "og:description", description, true);
    setMeta('meta[property="og:type"]', "og:type", type, true);
    setMeta('meta[property="og:url"]', "og:url", `${SITE_URL}${path}`, true);
    setMeta('meta[property="og:image"]', "og:image", ogImage, true);
    setMeta('meta[name="twitter:title"]', "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "twitter:image", ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${path}`;

    // hreflang
    ["it", "en", "x-default"].forEach((lang) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = `${SITE_URL}${path}`;
    });
  }, [title, description, path, image, type]);
};
