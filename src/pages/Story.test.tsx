import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Story from "./Story";
import portfolioData from "@/content/portfolio.json";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Routes>
          <Route path="/portfolio/:id" element={<Story />} />
          <Route path="/portfolio" element={<div>portfolio-list</div>} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  );

describe("Story", () => {
  it("renders the matching shoot title for a valid id", () => {
    const first = portfolioData.years[0].shoots[0];
    renderAt(`/portfolio/${first.id}`);
    expect(
      screen.getByRole("heading", { level: 1, name: first.title })
    ).toBeInTheDocument();
  });

  it("redirects to /portfolio when the id is unknown", () => {
    renderAt(`/portfolio/does-not-exist`);
    expect(screen.getByText("portfolio-list")).toBeInTheDocument();
  });
});
