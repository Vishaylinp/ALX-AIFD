'use server';

import { createClient } from '../../lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPoll(prevState: { success?: string; error?: string } | null, formData: FormData) {
  const supabase = createClient();

  const question = formData.get('question') as string;
  const optionsString = formData.get('options') as string;
  const options = optionsString.split('\n').map(option => option.trim()).filter(option => option.length > 0);

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'User not authenticated.' };
    }

    const { data: pollData, error: pollError } = await supabase
      .from('polls')
      .insert({ question, user_id: user.id })
      .select()
      .single();

    if (pollError) {
      console.error('Error creating poll:', pollError);
      return { error: pollError.message };
    }

    if (options.length > 0) {
      const optionsToInsert = options.map(optionText => ({
        poll_id: pollData.id,
        text: optionText,
      }));

      const { error: optionsError } = await supabase
        .from('options')
        .insert(optionsToInsert);

      if (optionsError) {
        console.error('Error creating options:', optionsError);
        return { error: optionsError.message };
      }
    }

    revalidatePath('/polls');
    return { success: 'Poll created successfully!' };
  } catch (error: any) {
    console.error('Error creating poll:', error);
    return { error: error.message };
  }
}