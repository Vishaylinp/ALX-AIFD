'use client';

import Link from 'next/link';

export default function HomeButton() {
  return (
    <Link href="/polls" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Go to Polls
    </Link>
  );
}