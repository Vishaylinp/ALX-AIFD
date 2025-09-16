import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

/**
 * `PollDetailsPage` Component
 * 
 * This component displays the detailed view of a single poll, identified by its ID.
 * It is crucial for user interaction, allowing users to see the poll question,
 * available options, and eventually cast their votes.
 * 
 * ### Key Responsibilities:
 * - Fetches specific poll data (question and options) from Supabase based on the provided ID.
 * - Renders the poll details, including its question and options.
 * - Handles cases where a poll is not found by redirecting to a 404 page.
 * 
 * ### Connection to App Context:
 * This page is a direct extension of the `/polls` page, providing the granular view
 * for each poll. It forms a critical part of the voting system, as it's where users
 * will interact with individual poll options and submit their choices.
 */
export default async function PollDetailsPage({ params }: { params: { id: string } }) {
  const isValidUuid = (uuid: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  if (!params.id || typeof params.id !== 'string' || !isValidUuid(params.id)) {
    notFound();
  }

  const supabase = createClient();
  
  // First, try to fetch the poll without its options
  const { data: pollData, error: pollError } = await supabase
    .from('polls')
    .select('*') // Select only poll data
    .eq('id', params.id)
    .single();

  if (pollError) {
    // In a real application, you might want to log this error more robustly
    console.error('Error fetching poll data:', pollError);
    notFound(); 
  }

  if (!pollData) {
    notFound();
  }

  // Now, fetch the options for the found poll
  const { data: optionsData, error: optionsError } = await supabase
    .from('options')
    .select('*')
    .eq('poll_id', pollData.id); // Assuming 'poll_id' is the foreign key in the options table

  if (optionsError) {
    console.error('Error fetching poll options:', optionsError);
    // Decide how to handle this: either show poll without options or treat as not found
    // For now, let's proceed with an empty options array if there's an error
    // or if no options are found.
  }

  const poll = {
    ...pollData,
    options: optionsData || [], // Ensure options is an array, even if empty or error
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>
      <div className="space-y-2">
        {poll.options.map((option: any) => (
          <div key={option.id} className="flex items-center justify-between p-2 border rounded">
            <span>{option.option_text}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}