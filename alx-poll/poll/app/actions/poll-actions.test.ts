import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createPoll, recordVote } from './poll-actions';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// --- MOCKS ---
vi.mock('next/navigation', () => ({ redirect: vi.fn() }));

// Fully mock Supabase update chain for votes
const mockThen = vi.fn((callback) => callback({ data: {}, error: null }));
const mockEqChain = {
  eq: vi.fn(() => mockEqChain),
  then: mockThen,
};
const mockUpdate = vi.fn(() => mockEqChain);

const mockInsert = vi.fn();
const mockFrom = vi.fn();
const mockGetUser = vi.fn();
const mockSelect = vi.fn();
const mockSingle = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    from: mockFrom,
    auth: { getUser: mockGetUser },
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();

  mockUpdate.mockReset();
  mockInsert.mockReset();
  mockFrom.mockReset();
  mockGetUser.mockReset();
  mockSelect.mockReset();
  mockSingle.mockReset();
  mockEqChain.eq.mockReset();
  mockThen.mockReset();

  // Mock tables
  mockFrom.mockImplementation((tableName: string) => {
    if (tableName === 'votes') return { update: mockUpdate };
    if (tableName === 'polls') return { insert: mockInsert };
    if (tableName === 'options')
      return { insert: vi.fn().mockResolvedValue({ data: null, error: null }) };
    return { insert: vi.fn() };
  });

  mockGetUser.mockResolvedValue({
    data: { user: { id: 'mock-user-id', email: 'test@example.com' } },
  });

  mockInsert.mockReturnValue({ select: mockSelect });
  mockSelect.mockReturnValue({ single: mockSingle });
  mockSingle.mockResolvedValue({ data: { id: 'mock-poll-id' }, error: null });
});

// --- RECORD VOTE TESTS ---
describe('recordVote', () => {
  it('should successfully record a vote', async () => {
    const result = await recordVote('test-poll-id', 'test-option-id');

    expect(mockUpdate).toHaveBeenCalledWith({ votes: 1 });
    expect(mockEqChain.eq).toHaveBeenCalledWith('poll_id', 'test-poll-id');
    expect(mockEqChain.eq).toHaveBeenCalledWith('option_id', 'test-option-id');
    expect(result).toEqual({ success: true });
  });

  it('should handle invalid pollId', async () => {
    const result = await recordVote('', 'test-option-id');
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(result).toEqual({ success: false, error: 'Invalid poll or option.' });
  });

  it('should handle invalid optionId', async () => {
    const result = await recordVote('test-poll-id', '');
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(result).toEqual({ success: false, error: 'Invalid poll or option.' });
  });

  it('should handle database errors', async () => {
    mockThen.mockImplementationOnce((callback) =>
      callback({ data: null, error: new Error('Database error') })
    );

    const result = await recordVote('test-poll-id', 'test-option-id');

    expect(mockUpdate).toHaveBeenCalledWith({ votes: 1 });
    expect(result).toEqual({ success: false, error: 'Database error' });
  });
});

// --- CREATE POLL TESTS ---
describe('createPoll', () => {
  it('should create a poll with valid data', async () => {
    const formData = new FormData();
    formData.append('question', 'Favorite color?');
    formData.append('options', 'Red');
    formData.append('options', 'Blue');

    await createPoll(null, formData);

    expect(mockFrom).toHaveBeenCalledWith('polls');
    expect(mockInsert).toHaveBeenCalledWith([
      { question: 'Favorite color?', creator_id: 'mock-user-id' },
    ]);
    expect(mockSelect).toHaveBeenCalled();
    expect(mockSingle).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith('/polls/mock-poll-id');
  });

  it('should handle empty options', async () => {
    const formData = new FormData();
    formData.append('question', 'Empty test');
    formData.append('options', '');

    const result = await createPoll(null, formData);
    expect(result).toEqual({ error: 'Question and at least one option are required.' });
    expect(mockFrom).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('should return error if user not authenticated', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });
    const formData = new FormData();
    formData.append('question', 'Unauthenticated test');
    formData.append('options', 'Option 1');

    const result = await createPoll(null, formData);
    expect(result).toEqual({ error: 'User not authenticated.' });
    expect(mockFrom).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('should return error if poll creation fails', async () => {
    mockSingle.mockResolvedValueOnce({ data: null, error: new Error('Mock Supabase error') });
    const formData = new FormData();
    formData.append('question', 'Error test');
    formData.append('options', 'Option 1');

    const result = await createPoll(null, formData);
    expect(result).toEqual({ error: 'Mock Supabase error' });
    expect(redirect).not.toHaveBeenCalled();
  });
});
