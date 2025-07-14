'use client';

import { useState } from 'react';
import { StoryGroup } from '@/types/stories';
import { mockStoryGroups } from '@/lib/mockData';
import StoryRing from './StoryRing';
import StoryViewer from './StoryViewer';

export default function StoriesFeed() {
  const [storyGroups] = useState<StoryGroup[]>(mockStoryGroups);
  const [selectedStoryGroup, setSelectedStoryGroup] = useState<StoryGroup | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleStoryClick = (storyGroup: StoryGroup, storyIndex: number = 0) => {
    setSelectedStoryGroup(storyGroup);
    setCurrentStoryIndex(storyIndex);
  };

  const handleCloseViewer = () => {
    setSelectedStoryGroup(null);
    setCurrentStoryIndex(0);
  };

  const handleNextStory = () => {
    if (!selectedStoryGroup) return;
    
    if (currentStoryIndex < selectedStoryGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // Move to next user's stories
      const currentGroupIndex = storyGroups.findIndex(
        group => group.user.id === selectedStoryGroup.user.id
      );
      if (currentGroupIndex < storyGroups.length - 1) {
        const nextGroup = storyGroups[currentGroupIndex + 1];
        setSelectedStoryGroup(nextGroup);
        setCurrentStoryIndex(0);
      } else {
        handleCloseViewer();
      }
    }
  };

  const handlePrevStory = () => {
    if (!selectedStoryGroup) return;
    
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // Move to previous user's stories
      const currentGroupIndex = storyGroups.findIndex(
        group => group.user.id === selectedStoryGroup.user.id
      );
      if (currentGroupIndex > 0) {
        const prevGroup = storyGroups[currentGroupIndex - 1];
        setSelectedStoryGroup(prevGroup);
        setCurrentStoryIndex(prevGroup.stories.length - 1);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Stories Ring Container */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gift Stories
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          
          {/* Horizontal Scrollable Stories */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
            {/* Add Your Story Button */}
            <div className="flex-shrink-0">
              <button
                className="flex flex-col items-center space-y-2 group"
                onClick={() => {/* TODO: Open story creation */}}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-105 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Your Story
                </span>
              </button>
            </div>

            {/* Story Rings */}
            {storyGroups.map((storyGroup) => (
              <StoryRing
                key={storyGroup.user.id}
                storyGroup={storyGroup}
                onClick={() => handleStoryClick(storyGroup)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStoryGroup && (
        <StoryViewer
          storyGroup={selectedStoryGroup}
          currentStoryIndex={currentStoryIndex}
          onClose={handleCloseViewer}
          onNext={handleNextStory}
          onPrev={handlePrevStory}
        />
      )}
    </div>
  );
}
