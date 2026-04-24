import portfolioData from "@/content/portfolio.json";
import siteData from "@/content/site.json";

export interface Shoot {
  id: string;
  title: string;
  location: string;
  image: string;
  span?: "tall" | "wide" | "normal";
}

export interface YearBlock {
  year: number;
  caption: { it: string; en: string };
  shoots: Shoot[];
}

export const portfolio: YearBlock[] = portfolioData.years.map((y) => ({
  year: y.year,
  caption: { it: y.caption_it, en: y.caption_en },
  shoots: y.shoots as Shoot[],
}));

export const CONTACTS = siteData.contacts;
