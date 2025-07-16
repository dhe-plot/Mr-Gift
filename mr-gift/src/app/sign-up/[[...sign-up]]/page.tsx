'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're in demo mode (no Clerk keys configured)
  const isDemoMode = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
                     process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes('your_clerk_publishable_key_here');

  const handleDemoSignUp = () => {
    setIsLoading(true);
    // Simulate sign up process
    setTimeout(() => {
      router.push('/onboarding');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join Mr Gift! 🎁
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start your gifting adventure
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {isDemoMode ? (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Demo Mode Active</strong><br />
                  Click below to create a demo account and experience the onboarding flow
                </p>
              </div>
              <button
                onClick={handleDemoSignUp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
              >
                {isLoading ? 'Creating Account...' : 'Create Demo Account'}
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>Authentication will be available when Clerk is configured.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
