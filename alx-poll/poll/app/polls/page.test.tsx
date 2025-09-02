// app/polls/page.test.tsx
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// The corrected import path for your data-fetching function
import { fetchPolls } from "../../lib/data/polls";

// The component we are testing
import PollsPage from "./page";

// Mocks
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

// This mock is crucial to prevent the real Supabase client from being created
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          // Mock the data-fetching function
          then: vi.fn(() => ({
            data: [],
            error: null,
          })),
        })),
      })),
    })),
  })),
}));

// --- Test Suite ---
describe("PollsPage", () => {
  // A unit test for the fetchPolls function
  describe("fetchPolls - Unit Tests", () => {
    it("should return polls data on successful fetch", async () => {
      // Mock a successful fetch
      const mockPolls = [{ id: 1, question: "Test" }];
      vi.spyOn(fetchPolls, "then").mockResolvedValue({
        data: mockPolls,
        error: null,
      });

      const result = await fetchPolls();
      expect(result.data).toEqual(mockPolls);
    });

    it("should throw error when Supabase returns error", async () => {
      // Mock an error response
      const mockError = new Error("Database error");
      vi.spyOn(fetchPolls, "then").mockResolvedValue({
        data: null,
        error: mockError,
      });

      const result = await fetchPolls();
      expect(result.error).toEqual(mockError);
    });
  });

  // Integration tests for the component
  describe("PollsPage - Integration Tests", () => {
    it("should render poll list when data is fetched successfully", async () => {
      // Mock the entire module to control the function's behavior
      const mockPolls = [{ id: 1, question: "Test" }];
      vi.spyOn(require('../../lib/data/polls'), 'fetchPolls').mockResolvedValue({
        data: mockPolls,
        error: null,
      });

      render(<PollsPage />);
      expect(await screen.findByText('Test')).toBeInTheDocument();
    });

    it("should display empty state when no polls are found", async () => {
      // Mock an empty data response
      vi.spyOn(require('../../lib/data/polls'), 'fetchPolls').mockResolvedValue({
        data: [],
        error: null,
      });

      render(<PollsPage />);
      expect(await screen.findByText('No polls found.')).toBeInTheDocument();
    });

    it("should display error message when fetch fails", async () => {
      // Mock an error response
      vi.spyOn(require('../../lib/data/polls'), 'fetchPolls').mockResolvedValue({
        data: null,
        error: new Error('Database error'),
      });

      render(<PollsPage />);
      expect(await screen.findByText('Failed to fetch polls.')).toBeInTheDocument();
    });
  });
});
