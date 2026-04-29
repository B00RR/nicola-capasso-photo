import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useLang } from "@/i18n/useLang";
import CookieBanner from "./CookieBanner";

const STORAGE_KEY = "nicola-cookie-consent";

const LangToggle = () => {
  const { toggle } = useLang();
  return (
    <button data-testid="lang-toggle" onClick={toggle}>
      switch
    </button>
  );
};

const wait = (ms: number) =>
  act(() => new Promise<void>((r) => setTimeout(r, ms)));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <LanguageProvider>
      <LangToggle />
      {children}
    </LanguageProvider>
  </MemoryRouter>
);

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it("appears on first visit, hides after dismiss, stays hidden on language switch", async () => {
    render(<CookieBanner />, { wrapper: Wrapper });

    // banner appears after the 800ms reveal delay
    await wait(900);
    const accept = screen.getByText(/got it|ho capito/i);
    expect(accept).toBeInTheDocument();

    fireEvent.click(accept);

    // dismissed: not in DOM
    expect(screen.queryByText(/got it|ho capito/i)).not.toBeInTheDocument();
    // and the consent flag is persisted
    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");

    // simulate language switch — banner must NOT reappear (regression for #29)
    fireEvent.click(screen.getByTestId("lang-toggle"));
    await wait(900);
    expect(screen.queryByText(/got it|ho capito/i)).not.toBeInTheDocument();
  });

  it("stays hidden on subsequent renders when consent is already stored", async () => {
    localStorage.setItem(STORAGE_KEY, "1");
    render(<CookieBanner />, { wrapper: Wrapper });
    await wait(900);
    expect(screen.queryByText(/got it|ho capito/i)).not.toBeInTheDocument();
  });
});
