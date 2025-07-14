import StoriesFeed from '@/components/stories/StoriesFeed';

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Gift Stories
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Discover amazing gifts shared by the community
                </p>
              </div>
              
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Story
              </button>
            </div>
          </div>
        </div>

        {/* Stories Feed */}
        <StoriesFeed />

        {/* Trending Gifts Section */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Trending Gifts
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Trending Gift Cards */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                      <span className="text-2xl">🎁</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Gift Item {item}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      $29.99
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white dark:bg-gray-800 py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Popular Categories
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Electronics', emoji: '📱', count: 234 },
                { name: 'Fashion', emoji: '👗', count: 189 },
                { name: 'Home & Garden', emoji: '🏠', count: 156 },
                { name: 'Books', emoji: '📚', count: 98 },
                { name: 'Sports', emoji: '⚽', count: 87 },
                { name: 'Beauty', emoji: '💄', count: 76 },
                { name: 'Food & Drink', emoji: '🍷', count: 65 },
                { name: 'Travel', emoji: '✈️', count: 54 },
              ].map((category) => (
                <button
                  key={category.name}
                  className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {category.count} stories
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
