import portfolioData from "@/content/portfolio.json";
import siteData from "@/content/site.json";

export type VideoProvider = "vimeo" | "youtube" | "mp4";

export interface ShootVideo {
  provider: VideoProvider;
  /** Vimeo/YouTube id, or full URL for mp4 */
  src: string;
  /** Optional poster shown before play */
  poster?: string;
}

export interface Shoot {
  id: string;
  title: string;
  location: string;
  /** Hero / cover image */
  image: string;
  span?: "tall" | "wide" | "normal";
  /** Optional date displayed under the title (e.g. "Giugno 2025") */
  date?: string;
  /** Bilingual short paragraph shown at the top of the story page */
  story?: { it: string; en: string };
  /** Additional images for the story page; cover is always shown first */
  gallery?: string[];
  /** Optional narrative chapters dividing the gallery */
  galleryChapters?: { start: number; title_it: string; title_en: string }[];
  /** Optional film embedded inside the story */
  video?: ShootVideo;
}

export interface YearBlock {
  year: number;
  caption: { it: string; en: string };
  shoots: Shoot[];
}

const withBase = (path: string) =>
  import.meta.env.BASE_URL + path.replace(/^\/+/, "");

export const portfolio: YearBlock[] = portfolioData.years.map((y) => ({
  year: y.year,
  caption: { it: y.caption_it, en: y.caption_en },
  shoots: y.shoots.map((raw) => {
    const s = raw as Shoot;
    return {
      ...s,
      image: withBase(s.image),
      gallery: s.gallery?.map(withBase),
      video: s.video
        ? {
            ...s.video,
            poster: s.video.poster ? withBase(s.video.poster) : undefined,
          }
        : undefined,
    };
  }),
}));

/** Flat list of all shoots, in display order, augmented with their year. */
export const allShoots: (Shoot & { year: number })[] = portfolio.flatMap((y) =>
  y.shoots.map((s) => ({ ...s, year: y.year }))
);

export const findShoot = (id: string) => {
  const idx = allShoots.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  return {
    shoot: allShoots[idx],
    prev: idx > 0 ? allShoots[idx - 1] : null,
    next: idx < allShoots.length - 1 ? allShoots[idx + 1] : null,
  };
};

export const CONTACTS = siteData.contacts as typeof siteData.contacts & { phone: string };
