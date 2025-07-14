'use client';

import Image from 'next/image';
import { StoryGroup } from '@/types/stories';

interface StoryRingProps {
  storyGroup: StoryGroup;
  onClick: () => void;
}

export default function StoryRing({ storyGroup, onClick }: StoryRingProps) {
  const { user, hasUnviewed } = storyGroup;

  return (
    <div className="flex-shrink-0">
      <button
        className="flex flex-col items-center space-y-2 group"
        onClick={onClick}
      >
        {/* Story Ring with Gradient Border */}
        <div className="relative">
          {/* Gradient Ring for Unviewed Stories */}
          {hasUnviewed && (
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800" />
            </div>
          )}
          
          {/* Gray Ring for Viewed Stories */}
          {!hasUnviewed && (
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800" />
            </div>
          )}

          {/* User Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden group-hover:scale-105 transition-transform">
            <Image
              src={user.avatar}
              alt={`${user.firstName}'s story`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* Verified Badge */}
          {user.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Gift Star Rating */}
          <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-800">
            ⭐ {user.giftStars}
          </div>
        </div>

        {/* Username */}
        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium max-w-16 truncate">
          {user.username}
        </span>
      </button>
    </div>
  );
}
