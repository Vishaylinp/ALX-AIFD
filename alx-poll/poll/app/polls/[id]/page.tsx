import QRCodeDisplay from '@/components/QRCodeDisplay';

export default async function PollDetailsPage({ params }: { params: { id: string } }) {
  console.log("Displaying mock poll");

  const mockPoll = {
    id: params.id,
    question: 'What is your favorite color?',
    options: [
      { id: '1', option_text: 'Red' },
      { id: '2', option_text: 'Blue' },
      { id: '3', option_text: 'Green' },
      { id: '4', option_text: 'Yellow' },
    ],
  };

  const pollUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/polls/${mockPoll.id}`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{mockPoll.question}</h1>
      <QRCodeDisplay value={pollUrl} size={256} />

      <div className="space-y-4">
        {mockPoll.options.map((option: { id: string; option_text: string }) => (
          <div key={option.id} className="flex items-center space-x-4">
            <button type="button" className="flex-grow border rounded p-2 hover:bg-gray-100">
              {option.option_text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}