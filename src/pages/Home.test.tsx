import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Home from "./Home";

vi.mock("@/assets/hero.jpg", () => ({ default: "/hero.jpg" }));
vi.mock("@/assets/about.jpg", () => ({ default: "/about.jpg" }));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <LanguageProvider>{children}</LanguageProvider>
  </MemoryRouter>
);

describe("Home", () => {
  it("renders hero content", () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText(/storie/i)).toBeInTheDocument();
  });
});
