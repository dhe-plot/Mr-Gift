import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browser Compatibility Test - Mr Gift',
  description: 'Test page to verify all browser compatibility fixes are working correctly',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    // No maximum-scale or user-scalable for accessibility
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function CompatibilityTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🧪 Browser Compatibility Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Backdrop Filter Test */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Backdrop Filter Test
            </h2>
            <p className="text-white/80 text-sm">
              This card uses backdrop-filter with -webkit- prefix for Safari support.
            </p>
            <div className="mt-4 p-3 bg-black/20 backdrop-blur-sm rounded">
              <span className="text-white text-xs">Nested backdrop blur</span>
            </div>
          </div>

          {/* Filter Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Filter Test
            </h2>
            <div className="space-y-2">
              <div className="w-full h-8 bg-gradient-to-r from-red-400 to-blue-400 filter-blur rounded"></div>
              <div className="w-full h-8 bg-gradient-to-r from-green-400 to-yellow-400 filter-brightness rounded"></div>
              <div className="w-full h-8 bg-gradient-to-r from-purple-400 to-pink-400 filter-contrast rounded"></div>
            </div>
            <p className="text-white/80 text-xs mt-2">
              Filters with -webkit- prefix for Chrome Android support.
            </p>
          </div>

          {/* User Select Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              User Select Test
            </h2>
            <div className="space-y-2 text-sm">
              <p className="select-none text-white/80 bg-black/20 p-2 rounded">
                This text cannot be selected (select-none)
              </p>
              <p className="select-text text-white/80 bg-black/20 p-2 rounded">
                This text can be selected (select-text)
              </p>
              <p className="select-all text-white/80 bg-black/20 p-2 rounded">
                Click to select all (select-all)
              </p>
            </div>
          </div>

          {/* Text Size Adjust Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Text Size Adjust Test
            </h2>
            <div className="text-size-adjust-none">
              <p className="text-white/80 text-sm">
                This text has text-size-adjust: none with proper vendor prefixes.
              </p>
            </div>
            <div className="text-size-adjust-auto mt-2">
              <p className="text-white/80 text-sm">
                This text has text-size-adjust: auto with proper vendor prefixes.
              </p>
            </div>
          </div>

          {/* Flexbox Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Flexbox Test
            </h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-black/20 p-2 rounded">
                <span className="text-white text-sm">Left</span>
                <span className="text-white text-sm">Right</span>
              </div>
              <div className="flex justify-center bg-black/20 p-2 rounded">
                <span className="text-white text-sm">Center</span>
              </div>
            </div>
            <p className="text-white/80 text-xs mt-2">
              Flexbox with vendor prefixes for older browsers.
            </p>
          </div>

          {/* Transform & Transition Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Transform & Transition Test
            </h2>
            <div className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-pink-400 to-red-400 p-4 rounded cursor-pointer">
              <p className="text-white text-sm text-center">
                Hover me for transform effect
              </p>
            </div>
            <p className="text-white/80 text-xs mt-2">
              Transform and transition with vendor prefixes.
            </p>
          </div>

          {/* Shadow Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Shadow Test
            </h2>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded shadow-sm">
                <span className="text-gray-800 text-sm">Small shadow</span>
              </div>
              <div className="bg-white p-3 rounded shadow-lg">
                <span className="text-gray-800 text-sm">Large shadow</span>
              </div>
            </div>
            <p className="text-white/80 text-xs mt-2">
              Box shadows with vendor prefixes.
            </p>
          </div>

          {/* Grid Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Grid Test
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/20 p-2 rounded">
                <span className="text-white text-xs">Grid 1</span>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <span className="text-white text-xs">Grid 2</span>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <span className="text-white text-xs">Grid 3</span>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <span className="text-white text-xs">Grid 4</span>
              </div>
            </div>
            <p className="text-white/80 text-xs mt-2">
              CSS Grid with vendor prefixes.
            </p>
          </div>

          {/* Accessibility Test */}
          <div className="bg-white/20 rounded-lg p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              Accessibility Test
            </h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors">
                Accessible Button
              </button>
              <input 
                type="text" 
                placeholder="Accessible input"
                className="w-full p-2 rounded border border-gray-300 text-gray-800"
              />
            </div>
            <p className="text-white/80 text-xs mt-2">
              Proper viewport settings without maximum-scale.
            </p>
          </div>

        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            ✅ Compatibility Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">Fixed Issues:</h3>
              <ul className="space-y-1 text-white/80">
                <li>✅ Backdrop filter with -webkit- prefix</li>
                <li>✅ Filter properties with vendor prefixes</li>
                <li>✅ User select with vendor prefixes</li>
                <li>✅ Text size adjust with standard property</li>
                <li>✅ Viewport without maximum-scale</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Browser Support:</h3>
              <ul className="space-y-1 text-white/80">
                <li>✅ Chrome 54+</li>
                <li>✅ Chrome Android 54+</li>
                <li>✅ Safari 9+</li>
                <li>✅ Firefox (latest)</li>
                <li>✅ Edge 79+</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/"
            className="inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors backdrop-blur-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
