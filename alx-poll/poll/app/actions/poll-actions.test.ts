// app/actions/poll-actions.test.ts
import { vi, describe, it, expect, beforeEach } from "vitest";
import { createPoll } from "./poll-actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Mock redirect and Supabase
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

// --- Mocks ---
const mockInsert = vi.fn();
const mockFrom = vi.fn();
const mockGetUser = vi.fn();

// This is the core mock setup for the full Supabase query chain
const mockSingle = vi.fn();
const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
mockInsert.mockReturnValue({ select: mockSelect });
mockFrom.mockImplementation((tableName) => {
  if (tableName === 'polls') {
    return { insert: mockInsert };
  }
  // Mocking the 'options' table insert as well
  if (tableName === 'options') {
    return { insert: vi.fn().mockResolvedValue({ data: null, error: null }) };
  }
  return { insert: mockInsert };
});

(createClient as any).mockReturnValue({
  from: mockFrom,
  auth: { getUser: mockGetUser },
});

// Use beforeEach to reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();

  // Reset function mocks
  mockInsert.mockReset();
  mockFrom.mockReset();
  mockGetUser.mockReset();
  mockSelect.mockReset();
  mockSingle.mockReset();

  // Re-establish mock behavior
  mockInsert.mockReturnValue({ select: mockSelect });
  mockSelect.mockReturnValue({ single: mockSingle });
  
  mockFrom.mockImplementation((tableName) => {
    if (tableName === 'polls') {
      return { insert: mockInsert };
    }
    if (tableName === 'options') {
      return { insert: vi.fn().mockResolvedValue({ data: null, error: null }) };
    }
    return { insert: vi.fn() };
  });

  // Default authenticated user
  mockGetUser.mockResolvedValue({
    data: { user: { id: "mock-user-id", email: "test@example.com" } },
  });
});

describe("createPoll", () => {
  it("should create a poll with valid data", async () => {
    // Arrange: Mock the single() call to return data
    mockSingle.mockResolvedValue({
      data: { id: "mock-poll-id" },
      error: null,
    });

    const formData = new FormData();
    formData.append("question", "What is your favorite color?");
    formData.append("options", "Red\nBlue");

    // Act
    await createPoll(null, formData);

    // Assert
    expect(mockFrom).toHaveBeenCalledWith("polls");
    expect(mockInsert).toHaveBeenCalledWith({
      question: "What is your favorite color?",
      created_by: "mock-user-id",
    });
    expect(mockSelect).toHaveBeenCalled();
    expect(mockSingle).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/polls/mock-poll-id");
  });

  it("should handle empty options", async () => {
    // Arrange
    mockSingle.mockResolvedValue({
      data: { id: "mock-poll-id" },
      error: null,
    });

    const formData = new FormData();
    formData.append("question", "Empty options test");
    formData.append("options", ""); // Explicitly mock an empty options field

    // Act
    await createPoll(null, formData);

    // Assert
    expect(mockFrom).toHaveBeenCalledWith("polls");
    expect(mockInsert).toHaveBeenCalledWith({
      question: "Empty options test",
      created_by: "mock-user-id",
    });
    expect(redirect).toHaveBeenCalledWith("/polls/mock-poll-id");
    // Ensure the options table was not inserted into
    expect(mockFrom).not.toHaveBeenCalledWith("options");
  });

  it("should return error if user not authenticated", async () => {
    // Arrange
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const formData = new FormData();
    formData.append("question", "Unauthenticated test");
    
    // Act
    const result = await createPoll(null, formData);

    // Assert
    expect(result).toEqual({ error: "User not authenticated." });
    expect(mockFrom).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("should return an error if poll creation fails", async () => {
    // Arrange
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: new Error("Mock Supabase error"),
    });

    const formData = new FormData();
    formData.append("question", "Error test");
    formData.append("options", "Option 1");

    // Act
    const result = await createPoll(null, formData);

    // Assert
    expect(result).toEqual({ error: "Mock Supabase error" });
    expect(redirect).not.toHaveBeenCalled();
  });
});