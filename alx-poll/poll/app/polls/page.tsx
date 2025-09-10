// Import required dependencies and components
'use client';

import { fetchPolls } from '@/app/actions/poll-fetch-actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Main component for displaying polls dashboard
/**
 * `PollsPage` Component
 * 
 * This component serves as the main dashboard for displaying a list of polls.
 * It is crucial for user engagement, allowing users to view existing polls and
 * navigate to create new ones or interact with specific polls.
 * 
 * ### Key Responsibilities:
 * - Renders a list of polls, currently using mock data.
 * - Provides navigation to individual poll detail pages.
 * - Offers a clear call-to-action for creating new polls.
 * 
 * ### Connection to App Context:
 * This page is the central hub for poll management, providing an overview of
 * available polls and acting as a gateway to both poll creation and individual
 * poll interaction. It will eventually integrate with server-side data fetching
 * to display real-time poll data.
 */
export default function PollsPage() {
  
  // Mock data for polls - to be replaced with actual data fetch
  const polls = [
    {
      id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
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
      id: "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
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

  return (
    // Main container with styling for the dashboard
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
      {/* Dashboard header section */}
      <h1 className="text-5xl font-extrabold mb-6 text-yellow-400">Polls Dashboard</h1>
      <p className="text-xl mb-10 text-gray-300">View existing polls or create a new one.</p>

      {/* Polls display container */}
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Available Polls</h2>
        {/* List of polls */}
        <ul className="space-y-6 mb-8">
          {polls.map((poll) => (
            // Individual poll card
            <li key={poll.id} className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center">
              {/* Poll information */}
              <div>
                <h3 className="text-2xl font-semibold text-white">{poll.question}</h3>
                <p className="text-gray-400 text-sm">Created by: {poll.userId}</p>
              </div>
              {/* Action buttons for each poll */}
              <div className="flex space-x-2">
                <Link href={`/polls/${poll.id}`}>
                  <Button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">View Poll</Button>
                </Link>
                {/* {user && user.id === poll.userId && ( */}
                  <>
                    <Button variant="outline" className="mt-4 md:mt-0 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="mt-4 md:mt-0 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your poll
                            and remove its data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => console.log('Poll deleted!')}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                {/* )} */}
              </div>
            </li>
          ))}
        </ul>
        
        {/* Create new poll button */}
        <div className="text-center">
          <Link href="/polls/create">
            <Button className="px-8 py-4 bg-purple-700 text-white rounded-xl shadow-xl hover:bg-purple-800 transition duration-300 ease-in-out transform hover:scale-105 text-2xl font-bold">
              Create New Poll
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}