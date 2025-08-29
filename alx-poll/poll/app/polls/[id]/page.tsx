'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

// Mock data for demonstration
const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'What is your favorite programming language?',
    options: [
      { id: '1a', text: 'JavaScript', votes: 15 },
      { id: '1b', text: 'Python', votes: 20 },
      { id: '1c', text: 'TypeScript', votes: 10 },
      { id: '1d', text: 'Java', votes: 5 },
    ],
  },
  {
    id: '2',
    question: 'Best framework for web development?',
    options: [
      { id: '2a', text: 'React', votes: 25 },
      { id: '2b', text: 'Angular', votes: 10 },
      { id: '2c', text: 'Vue', votes: 15 },
    ],
  },
];

export default function ViewPollPage() {
  const params = useParams();
  const pollId = params.id as string;
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch poll data from an API
    const foundPoll = mockPolls.find((p) => p.id === pollId);
    setPoll(foundPoll || null);
  }, [pollId]);

  const handleVote = (optionId: string) => {
    if (poll && !hasVoted) {
      const updatedOptions = poll.options.map((option) =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      );
      setPoll({ ...poll, options: updatedOptions });
      setSelectedOption(optionId);
      setHasVoted(true);
      // In a real application, you would send the vote to your backend
      alert(`Voted for: ${updatedOptions.find(opt => opt.id === optionId)?.text}`);
    }
  };

  if (!poll) {
    return <div className="container mx-auto p-4">Poll not found.</div>;
  }

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{poll.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-4">
                {!hasVoted ? (
                  <Button
                    variant="outline"
                    onClick={() => handleVote(option.id)}
                    className="flex-grow"
                  >
                    {option.text}
                  </Button>
                ) : (
                  <div className="flex-grow">
                    <p className="font-medium">{option.text}</p>
                    <Progress value={(option.votes / totalVotes) * 100} className="w-full" />
                    <p className="text-sm text-gray-500">{option.votes} votes ({(totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0).toFixed(1)}%)</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {hasVoted && (
            <p className="mt-4 text-center text-lg font-semibold">
              Total Votes: {totalVotes}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}