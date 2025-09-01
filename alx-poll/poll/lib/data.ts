import { createClient } from '@/lib/supabase/server';

export async function fetchPolls() {
  const supabase = createClient();
  const { data: polls, error } = await supabase.from('polls').select('*');

  if (error) {
    console.error('Error fetching polls:', error);
    return [];
  }

  return polls;
}