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

  const handleDemoSignIn = () => {
    setIsLoading(true);
    // Simulate sign in process
    setTimeout(() => {
      // Create demo user data
      const demoUserData = {
        firstName: 'Demo',
        lastName: 'User',
        userType: 'user',
        interests: ['Electronics', 'Fashion', 'Home'],
        giftingStyle: 'thoughtful',
        budget: 'moderate',
        onboardingCompleted: true,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('mrGiftUserData', JSON.stringify(demoUserData));

      // Dispatch custom event to update header
      window.dispatchEvent(new Event('userDataUpdated'));

      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back to Mr Gift! 🎁
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue your gifting journey
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {isDemoMode ? (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Demo Mode Active</strong><br />
                  Click below to sign in with a demo account
                </p>
              </div>
              <button
                onClick={handleDemoSignIn}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
              >
                {isLoading ? 'Signing In...' : 'Demo Sign In'}
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
            New to Mr Gift?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
