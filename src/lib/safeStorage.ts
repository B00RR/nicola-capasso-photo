/**
 * Safe wrappers around `localStorage` that no-op when access is blocked
 * (private mode, Brave shields, Safari ITP, SSR, quota-exceeded, etc.).
 * Use these instead of touching `window.localStorage` directly so a hostile
 * environment can't bring down the whole app on first render.
 */
export const safeGet = (key: string): string | null => {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const safeSet = (key: string, value: string): void => {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — silently drop */
  }
};

export const safeRemove = (key: string): void => {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(key);
  } catch {
    /* storage unavailable — silently drop */
  }
};
