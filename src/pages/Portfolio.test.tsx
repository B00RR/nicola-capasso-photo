import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Portfolio from "./Portfolio";
import portfolioData from "@/content/portfolio.json";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <LanguageProvider>{children}</LanguageProvider>
  </MemoryRouter>
);

describe("Portfolio", () => {
  it("renders one card per shoot across all years", () => {
    render(<Portfolio />, { wrapper: Wrapper });
    const totalShoots = portfolioData.years.reduce(
      (acc, y) => acc + y.shoots.length,
      0
    );
    // Each card has a Link wrapping the figure with an aria-label "Title — Location"
    const links = screen.getAllByRole("link", { name: / — / });
    expect(links.length).toBeGreaterThanOrEqual(totalShoots);
  });

  it("renders a year heading for each year block", () => {
    render(<Portfolio />, { wrapper: Wrapper });
    for (const y of portfolioData.years) {
      expect(
        screen.getByRole("heading", { level: 2, name: String(y.year) })
      ).toBeInTheDocument();
    }
  });
});
