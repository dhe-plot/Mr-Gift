// Compatibility Script - Dynamically fixes CSS vendor prefix issues
// This script runs after the page loads to add missing vendor prefixes

(function() {
  'use strict';
  
  // Function to add missing vendor prefixes to CSS rules
  function addVendorPrefixes() {
    // Get all stylesheets
    const stylesheets = Array.from(document.styleSheets);
    
    stylesheets.forEach(stylesheet => {
      try {
        const rules = Array.from(stylesheet.cssRules || stylesheet.rules || []);
        
        rules.forEach(rule => {
          if (rule.style) {
            // Fix text-size-adjust
            if (rule.style.webkitTextSizeAdjust && !rule.style.textSizeAdjust) {
              rule.style.textSizeAdjust = rule.style.webkitTextSizeAdjust;
              rule.style.mozTextSizeAdjust = rule.style.webkitTextSizeAdjust;
              rule.style.msTextSizeAdjust = rule.style.webkitTextSizeAdjust;
            }
            
            // Fix backdrop-filter
            if (rule.style.backdropFilter && !rule.style.webkitBackdropFilter) {
              rule.style.webkitBackdropFilter = rule.style.backdropFilter;
            }
            
            // Fix filter
            if (rule.style.webkitFilter && !rule.style.filter) {
              rule.style.filter = rule.style.webkitFilter;
            }
            
            // Fix user-select
            if (rule.style.userSelect && !rule.style.webkitUserSelect) {
              rule.style.webkitUserSelect = rule.style.userSelect;
              rule.style.mozUserSelect = rule.style.userSelect;
              rule.style.msUserSelect = rule.style.userSelect;
            }
          }
        });
      } catch (e) {
        // Ignore cross-origin stylesheet errors
        console.log('Skipping cross-origin stylesheet');
      }
    });
  }
  
  // Function to inject critical CSS fixes
  function injectCriticalCSS() {
    const style = document.createElement('style');
    style.id = 'compatibility-fixes';
    style.textContent = `
      /* Critical Compatibility Fixes - Injected via JavaScript */
      
      html {
        -webkit-text-size-adjust: 100% !important;
        -moz-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        text-size-adjust: 100% !important;
      }
      
      .backdrop-filter,
      [class*="backdrop-blur"] {
        -webkit-backdrop-filter: var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, ) !important;
        backdrop-filter: var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, ) !important;
      }
      
      .filter,
      [class*="blur"],
      [class*="brightness"],
      [class*="contrast"],
      [class*="grayscale"],
      [class*="invert"] {
        -webkit-filter: var(--tw-blur, ) var(--tw-brightness, ) var(--tw-contrast, ) var(--tw-grayscale, ) var(--tw-hue-rotate, ) var(--tw-invert, ) var(--tw-saturate, ) var(--tw-sepia, ) var(--tw-drop-shadow, ) !important;
        filter: var(--tw-blur, ) var(--tw-brightness, ) var(--tw-contrast, ) var(--tw-grayscale, ) var(--tw-hue-rotate, ) var(--tw-invert, ) var(--tw-saturate, ) var(--tw-sepia, ) var(--tw-drop-shadow, ) !important;
      }
      
      .select-none,
      .select-text,
      .select-all,
      .select-auto {
        -webkit-user-select: inherit !important;
        -moz-user-select: inherit !important;
        -ms-user-select: inherit !important;
        user-select: inherit !important;
      }
      
      .select-none {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      
      .select-text {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      .select-all {
        -webkit-user-select: all !important;
        -moz-user-select: all !important;
        -ms-user-select: all !important;
        user-select: all !important;
      }
      
      * {
        forced-color-adjust: auto;
      }
      
      @supports not (forced-color-adjust: auto) {
        * {
          color: inherit;
          background-color: inherit;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  // Function to fix viewport meta tag
  function fixViewportMeta() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      let content = viewportMeta.getAttribute('content');
      
      // Remove maximum-scale and user-scalable for accessibility
      content = content.replace(/,?\s*maximum-scale=[^,]*/gi, '');
      content = content.replace(/,?\s*user-scalable=[^,]*/gi, '');
      
      viewportMeta.setAttribute('content', content);
    }
  }
  
  // Function to add theme-color meta tag with media query support
  function fixThemeColorMeta() {
    // Remove existing theme-color meta tags
    const existingThemeColor = document.querySelectorAll('meta[name="theme-color"]');
    existingThemeColor.forEach(meta => meta.remove());
    
    // Add theme-color with media query support
    const lightTheme = document.createElement('meta');
    lightTheme.name = 'theme-color';
    lightTheme.media = '(prefers-color-scheme: light)';
    lightTheme.content = '#ffffff';
    document.head.appendChild(lightTheme);
    
    const darkTheme = document.createElement('meta');
    darkTheme.name = 'theme-color';
    darkTheme.media = '(prefers-color-scheme: dark)';
    darkTheme.content = '#0a0a0a';
    document.head.appendChild(darkTheme);
    
    // Add fallback for browsers that don't support media queries in theme-color
    const fallbackTheme = document.createElement('meta');
    fallbackTheme.name = 'theme-color';
    fallbackTheme.content = '#ffffff';
    document.head.appendChild(fallbackTheme);
  }
  
  // Function to run all fixes
  function runCompatibilityFixes() {
    console.log('Running compatibility fixes...');
    
    // Inject critical CSS first
    injectCriticalCSS();
    
    // Fix viewport meta tag
    fixViewportMeta();
    
    // Fix theme-color meta tag
    fixThemeColorMeta();
    
    // Add vendor prefixes to existing CSS rules
    addVendorPrefixes();
    
    console.log('Compatibility fixes applied!');
  }
  
  // Run fixes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runCompatibilityFixes);
  } else {
    runCompatibilityFixes();
  }
  
  // Also run fixes after a short delay to catch dynamically loaded CSS
  setTimeout(runCompatibilityFixes, 1000);
  
  // Run fixes when new stylesheets are added
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'STYLE' || node.tagName === 'LINK') {
            setTimeout(runCompatibilityFixes, 100);
          }
        });
      }
    });
  });
  
  observer.observe(document.head, {
    childList: true,
    subtree: true
  });
  
})();
