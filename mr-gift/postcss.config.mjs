const config = {
  plugins: [
    'tailwindcss',
    // Add autoprefixer for better browser compatibility in all environments
    ['autoprefixer', {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Safari >= 9',
        'Chrome >= 54',
        'Edge >= 79',
        'iOS >= 9',
        'Android >= 4.4'
      ],
      grid: true,
      flexbox: 'no-2009',
      // Force autoprefixer to add standard properties
      add: true,
      remove: false
    }]
  ],
};

export default config;
