import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Contact from "./Contact";

const mockFetch = vi.fn(() => Promise.resolve({ ok: true } as Response));
globalThis.fetch = mockFetch;

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
  Toaster: () => null,
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <LanguageProvider>{children}</LanguageProvider>
  </MemoryRouter>
);

describe("Contact", () => {
  beforeEach(() => {
    localStorage.setItem("nicola-lang", "it");
    mockFetch.mockClear();
  });
  afterEach(() => {
    localStorage.removeItem("nicola-lang");
    vi.clearAllMocks();
  });

  it("renders form fields", () => {
    render(<Contact />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/raccontami/i)).toBeInTheDocument();
  });

  it("submits to Netlify via fetch", async () => {
    render(<Contact />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "Mario" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "mario@test.com" } });
    fireEvent.change(screen.getByLabelText(/raccontami/i), { target: { value: "Ciao Nicola" } });

    fireEvent.click(screen.getByRole("button", { name: /invia richiesta/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("/");
    expect(options?.method).toBe("POST");
    expect(options?.headers?.["Content-Type"]).toBe("application/x-www-form-urlencoded");
    const body = String(options?.body);
    expect(body).toContain("Mario");
    expect(body).toContain("mario%40test.com");
    expect(body).toContain("Ciao+Nicola");
  });
});
