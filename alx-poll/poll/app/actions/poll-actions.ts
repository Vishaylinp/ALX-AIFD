'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

// --- CREATE POLL ---
export async function createPoll(prevState: any, formData: FormData) {
  const question = formData.get('question') as string | null;
  const optionsArray = formData
    .getAll('options')
    .map(opt => (opt as string).trim())
    .filter(opt => opt !== '');

  if (!question || optionsArray.length === 0) {
    return { error: 'Question and at least one option are required.' };
  }

  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated.');
    }

    // Insert poll
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert([{ question, creator_id: user.id }])
      .select()
      .single();

    if (pollError) throw pollError;

    // Insert options
    const formattedOptions = optionsArray.map(text => ({
      option_text: text,
      poll_id: poll.id,
    }));

    const { error: optionsError } = await supabase
      .from('options')
      .insert(formattedOptions);

    if (optionsError) throw optionsError;

    // Redirect to the newly created poll
    redirect(`/polls/${poll.id}`);
    return { pollId: poll.id };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- RECORD VOTE ---
export async function recordVote(pollId: string, optionId: string) {
  if (!pollId || !optionId) {
    return { success: false, error: 'Invalid poll or option.' };
  }

  const supabase = createClient();

  try {
    // Increment vote count
    const { data, error } = await supabase
      .from('votes')
      .update({ votes: 1 })
      .eq('poll_id', pollId)
      .eq('option_id', optionId);

    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Database error' };
  }
}
