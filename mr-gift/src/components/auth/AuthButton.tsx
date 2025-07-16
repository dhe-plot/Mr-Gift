'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogIn, UserPlus, ChevronDown, Settings } from 'lucide-react';

interface AuthButtonProps {
  onOpenPreferences?: () => void;
}

export function AuthButton({ onOpenPreferences }: AuthButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Check for existing user data on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('mrGiftUserData');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    // Clear localStorage and reset state
    localStorage.removeItem('mrGiftUserData');
    setIsAuthenticated(false);
    setUserData(null);
    setIsDropdownOpen(false);
    // Reload the page to reset all state
    window.location.reload();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.auth-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  if (isAuthenticated && userData) {
    return (
      <div className="relative auth-dropdown">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <img
            src={userData?.personal?.imageUrl || userData?.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80'}
            alt={userData?.personal?.firstName || userData?.firstName || 'User'}
            className="w-8 h-8 rounded-full border-2 border-blue-500"
          />
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
            {userData?.personal?.firstName || userData?.firstName || 'User'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {userData?.personal?.firstName || userData?.firstName || 'Demo User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userData?.userType === 'both' ? 'Buyer & Seller' : 
                 userData?.userType === 'seller' ? 'Seller' : 'Gift Explorer'}
              </p>
            </div>
            <div className="py-1">
              {onOpenPreferences && (
                <button
                  onClick={() => {
                    onOpenPreferences();
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4" />
                  Preferences
                </button>
              )}
              <Link href="/dashboard">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogIn className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative auth-dropdown">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <User className="w-4 h-4" />
        <span className="font-medium">Join Mr Gift</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Welcome to Mr Gift! 🎁
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Choose how you'd like to get started
            </p>
          </div>
          <div className="py-1">
            <Link href="/sign-in">
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogIn className="w-4 h-4 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Sign In</div>
                  <div className="text-xs text-gray-500">Already have an account</div>
                </div>
              </button>
            </Link>
            <Link href="/sign-up">
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserPlus className="w-4 h-4 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Create Account</div>
                  <div className="text-xs text-gray-500">New to Mr Gift</div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
