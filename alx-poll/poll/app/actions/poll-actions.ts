'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
    return null;
  } catch (error) {
    return { error: (error as Error).message };
  }
}

