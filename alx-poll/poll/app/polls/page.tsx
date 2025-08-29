import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const mockPolls = [
  { id: '1', question: 'What is your favorite color?', description: 'Choose wisely!', votes: 120 },
  { id: '2', question: 'Best programming language?', description: 'The eternal debate.', votes: 250 },
  { id: '3', question: 'Favorite food?', description: 'Sweet or savory?', votes: 90 },
];

export default function PollsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to the Polls Dashboard!
        </h1>

        <p className="mt-3 text-2xl mb-8">
          Create and participate in engaging polls.
        </p>

        <div className="flex items-center justify-center mb-8">
          <Link href="/polls/create" passHref>
            <Button className="text-lg px-8 py-4">Create New Poll</Button>
          </Link>
        </div>

        <h2 className="text-4xl font-bold mb-6">Available Polls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {mockPolls.map((poll) => (
            <Card key={poll.id} className="w-full">
              <CardHeader>
                <CardTitle>{poll.question}</CardTitle>
                <CardDescription>{poll.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Votes: {poll.votes}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/polls/${poll.id}`} passHref>
                  <Button className="w-full">View Poll</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}