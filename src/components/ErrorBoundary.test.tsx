import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

const ThrowError = () => {
  throw new Error("Test error");
};

const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

describe("ErrorBoundary", () => {
  afterEach(() => {
    consoleError.mockRestore();
  });

  it("renders fallback on error", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
