import { useEffect } from "react";

export const usePageMeta = (title: string, description?: string, canonicalPath?: string) => {
  useEffect(() => {
    document.title = title;

    if (description !== undefined) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.name = "description";
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }

    if (canonicalPath !== undefined) {
      let canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canon) {
        canon = document.createElement("link");
        canon.rel = "canonical";
        document.head.appendChild(canon);
      }
      canon.href = `${window.location.origin}${canonicalPath}`;
    }
  }, [title, description, canonicalPath]);
};
