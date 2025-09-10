'use server';

import { supabase } from '@/lib/supabase';

export async function getPollById(id: string) {
  const { data: poll, error } = await supabase
    .from('polls')
    .select('*, options(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching poll:', error);
    return null;
  }

  return poll;
}
