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
    process.env.VITE_CONTACT_ENDPOINT = "http://test.com/contact";
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

  it("submits via fetch as JSON", async () => {
    // Advance Date.now past the 2s antibot time-trap.
    const nowSpy = vi.spyOn(Date, "now");
    nowSpy.mockReturnValue(0);
    render(<Contact />, { wrapper: Wrapper });
    nowSpy.mockReturnValue(3000);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "Mario" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "mario@test.com" } });
    fireEvent.change(screen.getByLabelText(/raccontami/i), { target: { value: "Ciao Nicola" } });

    fireEvent.click(screen.getByRole("button", { name: /invia richiesta/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
    nowSpy.mockRestore();

    const [url, options] = mockFetch.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("http://test.com/contact");
    expect(options.method).toBe("POST");
    expect((options.headers as Record<string, string>)?.["Content-Type"]).toBe("application/json");
    const body = JSON.parse(String(options.body));
    expect(body.name).toBe("Mario");
    expect(body.email).toBe("mario@test.com");
    expect(body.message).toBe("Ciao Nicola");
  });
});
