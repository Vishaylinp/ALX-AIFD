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
  const supabase = createClient();
  const { data: poll } = await supabase
    .from('polls')
    .select('*, options(*)')
    .eq('id', params.id)
    .single();

  if (!poll) {
    notFound();
  }

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