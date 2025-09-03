import { vi, describe, it, expect, beforeEach } from 'vitest';
import { recordVote } from './poll-actions';
import { createClient } from '@/lib/supabase/server';

// Mock Supabase client for integration tests
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            then: vi.fn((callback) => callback({ data: {}, error: null }))
          }))
        }))
      })),
    })),
  })),
}));

describe('recordVote (Integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully record a vote with mocked Supabase', async () => {
    const result = await recordVote('test-poll-id', 'test-option-id');
    expect(result).toEqual({ success: true });
  });
});