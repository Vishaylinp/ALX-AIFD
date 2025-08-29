'use client';

import Link from 'next/link';

export default function PollsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-yellow-400">Polls Dashboard</h1>
      <p className="text-xl mb-10 text-gray-300">View existing polls or create a new one.</p>

      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Available Polls</h2>
        <ul className="space-y-6 mb-8">
          <li className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">Sample Poll 1: Favorite Color?</h3>
              <p className="text-gray-400 text-sm">Created by: user@example.com</p>
            </div>
            <Link href="/polls/1">
              <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">View Poll</button>
            </Link>
          </li>
          <li className="bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">Sample Poll 2: Best Programming Language?</h3>
              <p className="text-gray-400 text-sm">Created by: anotheruser@example.com</p>
            </div>
            <Link href="/polls/2">
              <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">View Poll</button>
            </Link>
          </li>
        </ul>

        <div className="text-center">
          <Link href="/polls/create">
            <button className="px-8 py-4 bg-purple-700 text-white rounded-xl shadow-xl hover:bg-purple-800 transition duration-300 ease-in-out transform hover:scale-105 text-2xl font-bold">
              Create New Poll
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}