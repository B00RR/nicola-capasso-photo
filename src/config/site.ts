const DEFAULT_SITE_URL = "https://nicolacapassophoto.com";

const raw = import.meta.env.VITE_SITE_URL as string | undefined;

if (import.meta.env.PROD && (!raw || raw.trim().length === 0)) {
  throw new Error("VITE_SITE_URL is required in production");
}

export const SITE_URL = (raw && raw.trim().length > 0 ? raw : DEFAULT_SITE_URL).replace(/\/$/, "");
