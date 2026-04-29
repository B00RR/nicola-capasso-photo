const DEFAULT_SITE_URL = "https://nicolacapassophoto.com";

const raw = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (raw && raw.trim().length > 0 ? raw : DEFAULT_SITE_URL).replace(/\/$/, "");
