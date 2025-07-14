'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoryGroup } from '@/types/stories';

interface StoryViewerProps {
  storyGroup: StoryGroup;
  currentStoryIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StoryViewer({
  storyGroup,
  currentStoryIndex,
  onClose,
  onNext,
  onPrev,
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentStory = storyGroup.stories[currentStoryIndex];
  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, onNext, storyDuration]);

  useEffect(() => {
    setProgress(0);
    setIsLiked(currentStory.isLiked);
  }, [currentStoryIndex, currentStory.isLiked]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Send like to backend
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share story:', currentStory.id);
  };

  const handleGiftInquiry = () => {
    // TODO: Open gift inquiry modal
    console.log('Gift inquiry for:', currentStory.gift?.name);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentStory.media[0].url}
          alt="Story background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Story Content */}
      <div className="relative w-full max-w-md h-full flex flex-col">
        {/* Progress Bars */}
        <div className="flex space-x-1 p-4">
          {storyGroup.stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: index === currentStoryIndex 
                    ? `${progress}%` 
                    : index < currentStoryIndex 
                      ? '100%' 
                      : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={storyGroup.user.avatar}
                alt={storyGroup.user.firstName}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-white font-semibold text-sm">
                  {storyGroup.user.username}
                </span>
                {storyGroup.user.isVerified && (
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-white text-opacity-70 text-xs">
                {new Date(currentStory.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Story Content Area */}
        <div 
          className="flex-1 flex items-center justify-center p-4"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Navigation Areas */}
          <button
            className="absolute left-0 top-0 w-1/3 h-full z-10"
            onClick={onPrev}
          />
          <button
            className="absolute right-0 top-0 w-1/3 h-full z-10"
            onClick={onNext}
          />
        </div>

        {/* Story Caption and Location */}
        {(currentStory.caption || currentStory.location) && (
          <div className="p-4 space-y-2">
            {currentStory.caption && (
              <p className="text-white text-sm leading-relaxed">
                {currentStory.caption}
              </p>
            )}
            {currentStory.location && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-opacity-70 text-xs">
                  {currentStory.location}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Gift Card */}
        {currentStory.gift && (
          <div className="p-4">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={currentStory.gift.image}
                    alt={currentStory.gift.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {currentStory.gift.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {currentStory.gift.brand}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    ${currentStory.gift.price}
                  </p>
                </div>
                <button
                  onClick={handleGiftInquiry}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Gift
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                isLiked ? 'text-red-500' : 'text-white'
              }`}
            >
              <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button
              onClick={handleShare}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-white text-opacity-70 text-xs">
            <span>{currentStory.views} views</span>
            <span>•</span>
            <span>{currentStory.likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
