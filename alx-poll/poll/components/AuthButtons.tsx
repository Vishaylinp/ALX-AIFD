'use client';

import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthButtons() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/auth/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link href="/auth/signup" className="text-white hover:text-gray-300">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}