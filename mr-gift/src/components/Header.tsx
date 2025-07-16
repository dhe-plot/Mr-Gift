'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthButton } from './auth/AuthButton';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{
    firstName?: string;
    lastName?: string;
    fullName?: string;
    userType?: string;
    personal?: { firstName?: string; imageUrl?: string };
    imageUrl?: string;
  } | null>(null);

  // Check for existing user data on component mount and listen for changes
  useEffect(() => {
    const checkUserData = () => {
      const savedUserData = localStorage.getItem('mrGiftUserData');
      if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
        setIsAuthenticated(true);
      } else {
        setUserData(null);
        setIsAuthenticated(false);
      }
    };

    // Check on mount
    checkUserData();

    // Listen for storage changes (when user completes onboarding)
    window.addEventListener('storage', checkUserData);

    // Custom event for same-tab updates
    window.addEventListener('userDataUpdated', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
      window.removeEventListener('userDataUpdated', checkUserData);
    };
  }, []);



  const handleOpenPreferences = () => {
    // Handle preferences modal opening
    console.log('Opening preferences...');
  };

  // For now, authentication is disabled until Clerk is properly configured

  const handleGetStarted = () => {
    // Scroll to features section or redirect to onboarding
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎁</span>
              <h1 className="text-xl font-bold text-foreground">
                Mr Gift
              </h1>
            </Link>
          </div>

          {/* Navigation & Auth Buttons */}
          <div className="flex items-center gap-4">
            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Get Started
            </button>

            {/* Authentication Button */}
            <AuthButton
              onOpenPreferences={handleOpenPreferences}
              isAuthenticated={isAuthenticated}
              userData={userData}
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 hover:bg-background/50 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => {
                handleGetStarted();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              Get Started
            </button>
            <div className="pt-4 border-t border-border">
              <AuthButton
                onOpenPreferences={handleOpenPreferences}
                isAuthenticated={isAuthenticated}
                userData={userData}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


