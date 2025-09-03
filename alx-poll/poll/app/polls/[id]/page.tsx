import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

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