import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom backdrop blur utilities with vendor prefixes
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    // Custom plugin to add vendor prefixes for compatibility
    function({ addUtilities }: any) {
      const newUtilities = {
        // Backdrop filter utilities with vendor prefixes
        '.backdrop-blur-none': {
          '-webkit-backdrop-filter': 'none',
          'backdrop-filter': 'none',
        },
        '.backdrop-blur-sm': {
          '-webkit-backdrop-filter': 'blur(4px)',
          'backdrop-filter': 'blur(4px)',
        },
        '.backdrop-blur': {
          '-webkit-backdrop-filter': 'blur(8px)',
          'backdrop-filter': 'blur(8px)',
        },
        '.backdrop-blur-md': {
          '-webkit-backdrop-filter': 'blur(12px)',
          'backdrop-filter': 'blur(12px)',
        },
        '.backdrop-blur-lg': {
          '-webkit-backdrop-filter': 'blur(16px)',
          'backdrop-filter': 'blur(16px)',
        },
        '.backdrop-blur-xl': {
          '-webkit-backdrop-filter': 'blur(24px)',
          'backdrop-filter': 'blur(24px)',
        },
        // Filter utilities with vendor prefixes
        '.filter-none': {
          '-webkit-filter': 'none',
          'filter': 'none',
        },
        '.filter-blur': {
          '-webkit-filter': 'blur(4px)',
          'filter': 'blur(4px)',
        },
        '.filter-brightness': {
          '-webkit-filter': 'brightness(1.25)',
          'filter': 'brightness(1.25)',
        },
        '.filter-contrast': {
          '-webkit-filter': 'contrast(1.25)',
          'filter': 'contrast(1.25)',
        },
        '.filter-grayscale': {
          '-webkit-filter': 'grayscale(1)',
          'filter': 'grayscale(1)',
        },
        '.filter-invert': {
          '-webkit-filter': 'invert(1)',
          'filter': 'invert(1)',
        },
        // User select utilities with vendor prefixes
        '.select-none': {
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        },
        '.select-text': {
          '-webkit-user-select': 'text',
          '-moz-user-select': 'text',
          '-ms-user-select': 'text',
          'user-select': 'text',
        },
        '.select-all': {
          '-webkit-user-select': 'all',
          '-moz-user-select': 'all',
          '-ms-user-select': 'all',
          'user-select': 'all',
        },
        // Text size adjust utilities
        '.text-size-adjust-none': {
          '-webkit-text-size-adjust': 'none',
          '-moz-text-size-adjust': 'none',
          '-ms-text-size-adjust': 'none',
          'text-size-adjust': 'none',
        },
        '.text-size-adjust-auto': {
          '-webkit-text-size-adjust': 'auto',
          '-moz-text-size-adjust': 'auto',
          '-ms-text-size-adjust': 'auto',
          'text-size-adjust': 'auto',
        },
      }

      addUtilities(newUtilities)
    }
  ],
  // Ensure proper browser support
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Add experimental features for better compatibility
  experimental: {
    optimizeUniversalDefaults: true,
  },
}

export default config
