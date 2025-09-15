import { redirect } from 'next/navigation';

// ... existing code ...
export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>If you see this, the redirect is the issue.</p>
    </div>
  );
}
