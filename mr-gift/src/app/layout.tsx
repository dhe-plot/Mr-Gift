import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr Gift - Your Ultimate Gifting Platform",
  description: "Discover, share, and give the perfect gifts with Mr Gift's innovative platform featuring stories, payments, and AI assistance.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    // Removed maximum-scale and user-scalable for better accessibility
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  other: {
    // Add theme-color fallback for browsers that don't support media queries in theme-color
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For now, don't use ClerkProvider until properly configured
  return (
    <html lang="en">
      <head>
        <Script
          id="compatibility-fixes"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Critical Compatibility Fixes - Inline Script
              (function() {
                'use strict';

                function injectCriticalCSS() {
                  const style = document.createElement('style');
                  style.id = 'compatibility-fixes-inline';
                  style.textContent = \`
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
                  \`;

                  document.head.appendChild(style);
                }

                // Run immediately
                injectCriticalCSS();

                // Run when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', injectCriticalCSS);
                } else {
                  injectCriticalCSS();
                }
              })();
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
