const DEFAULT_SITE_URL = "https://b00rr.github.io/nicola-capasso-photo";

const raw = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (raw && raw.trim().length > 0 ? raw : DEFAULT_SITE_URL).replace(/\/$/, "");
