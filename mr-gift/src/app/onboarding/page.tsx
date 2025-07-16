'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserTypeSelection } from '@/components/onboarding/UserTypeSelection';

export default function OnboardingPage() {
  const user = { firstName: 'User' }; // Temporary fallback
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // Start with user type selection
  const [userType, setUserType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    interests: [] as string[],
    giftingStyle: '',
    budget: '',
    notifications: true,
  });

  const interests = [
    '🎮 Gaming', '📚 Books', '🎵 Music', '🎬 Movies', '🏃‍♂️ Fitness',
    '🍳 Cooking', '🌱 Gardening', '🎨 Art', '✈️ Travel', '📱 Tech',
    '👗 Fashion', '🏠 Home Decor', '🐕 Pets', '🚗 Cars', '⚽ Sports'
  ];

  const giftingStyles = [
    { id: 'thoughtful', label: 'Thoughtful & Personal', emoji: '💝' },
    { id: 'practical', label: 'Practical & Useful', emoji: '🛠️' },
    { id: 'luxurious', label: 'Luxurious & Premium', emoji: '✨' },
    { id: 'creative', label: 'Creative & Unique', emoji: '🎨' },
    { id: 'experiential', label: 'Experiences & Adventures', emoji: '🎢' },
  ];

  const budgetRanges = [
    { id: 'budget', label: 'Budget-friendly ($0-$50)', emoji: '💰' },
    { id: 'moderate', label: 'Moderate ($50-$200)', emoji: '💳' },
    { id: 'premium', label: 'Premium ($200-$500)', emoji: '💎' },
    { id: 'luxury', label: 'Luxury ($500+)', emoji: '👑' },
  ];

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setCurrentStep(1); // Move to interests step
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleComplete = () => {
    // Save the complete onboarding data including user type
    const completeData = {
      ...formData,
      userType,
      firstName: user?.firstName || 'User',
      onboardingCompleted: true,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage for demo purposes
    localStorage.setItem('mrGiftUserData', JSON.stringify(completeData));

    // Dispatch custom event to update header
    window.dispatchEvent(new Event('userDataUpdated'));

    console.log('Onboarding completed:', completeData);
    router.push('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <UserTypeSelection onSelect={handleUserTypeSelect} />;

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to Mr Gift, {user?.firstName}! 🎉
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let&apos;s personalize your gifting experience. What are your interests?
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {interest}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What&apos;s your gifting style? 🎁
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This helps us recommend the perfect gifts for you and your loved ones.
              </p>
            </div>
            
            <div className="space-y-3">
              {giftingStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setFormData(prev => ({ ...prev, giftingStyle: style.id }))}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    formData.giftingStyle === style.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{style.emoji}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {style.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What&apos;s your typical gift budget? 💰
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We&apos;ll show you gifts that match your budget preferences.
              </p>
            </div>
            
            <div className="space-y-3">
              {budgetRanges.map((budget) => (
                <button
                  key={budget.id}
                  onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    formData.budget === budget.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{budget.emoji}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {budget.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Don't show progress bar for user type selection
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {renderStep()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of 3
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round((currentStep / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={
                  (currentStep === 1 && formData.interests.length === 0) ||
                  (currentStep === 2 && !formData.giftingStyle) ||
                  (currentStep === 3 && !formData.budget)
                }
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!formData.budget}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
