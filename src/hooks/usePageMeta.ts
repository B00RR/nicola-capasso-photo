import { useEffect } from "react";
import { SITE_URL } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export const usePageMeta = ({ title, description, path }: PageMeta) => {
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

    setMeta('meta[name="description"]', "description", description);
    setMeta('meta[property="og:title"]', "og:title", title, true);
    setMeta('meta[property="og:description"]', "og:description", description, true);
    setMeta('meta[property="og:url"]', "og:url", `${SITE_URL}${path}`, true);
    setMeta('meta[name="twitter:title"]', "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "twitter:description", description);

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
  }, [title, description, path]);
};
