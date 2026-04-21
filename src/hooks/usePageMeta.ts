import { useEffect } from "react";

export const usePageMeta = (title: string, description?: string) => {
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
  }, [title, description]);
};
