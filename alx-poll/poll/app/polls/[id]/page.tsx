'use client';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  userId: string;
  createdAt: Date;
}

interface PollPageProps {
  params: { id: string };
}

// Mock poll data for demonstration
const mockPolls: Poll[] = [
  {
    id: "1",
    question: "What is your favorite color?",
    options: [
      { id: "1", text: "Red", votes: 10 },
      { id: "2", text: "Blue", votes: 15 },
      { id: "3", text: "Green", votes: 8 },
    ],
    userId: "user1",
    createdAt: new Date(),
  },
  {
    id: "2",
    question: "Which programming language do you prefer?",
    options: [
      { id: "1", text: "JavaScript", votes: 20 },
      { id: "2", text: "Python", votes: 18 },
      { id: "3", text: "Java", votes: 12 },
    ],
    userId: "user2",
    createdAt: new Date(),
  },
];

export default function PollPage({ params }: PollPageProps) {
  const { id } = params;
  const [poll, setPoll] = useState<Poll | undefined>(mockPolls.find(p => p.id === id));
  const [hasVoted, setHasVoted] = useState(false);

  if (!poll) {
    notFound();
  }

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    const updatedOptions = poll.options.map(option =>
      option.id === optionId ? { ...option, votes: option.votes + 1 } : option
    );
    setPoll({ ...poll, options: updatedOptions });
    setHasVoted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">{poll.question}</h1>
        <ul className="space-y-4">
          {poll.options.map((option) => (
            <li key={option.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-md">
              <span className="text-lg">{option.text}</span>
              <Button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                {hasVoted ? 'Voted' : 'Vote'}
              </Button>
            </li>
          ))}
        </ul>
        {hasVoted && (
          <p className="mt-8 text-center text-green-400 text-xl font-semibold">
            Thank you for voting!
          </p>
        )}
        <p className="mt-8 text-center text-gray-400">Created by: {poll.userId}</p>
      </div>
    </main>
  );
}