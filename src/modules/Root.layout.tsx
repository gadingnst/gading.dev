import '@/designs/styles/globals.css';

import { Caveat, JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

import { NextPageProps } from '@/@types/global';
import { ANALYTICS_ID, IS_DEV } from '@/configs/sites';
import { APP_THEME_ATTRIBUTE_PREFIX, APP_THEME_KEY } from '@/packages/libs/AppTheme/constants';
import { getLangugageServer } from '@/packages/libs/I18n/i18n.server';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700']
});

/** labels, dates, chips, terminal */
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500']
});

/** hand-written accents only (doodles, stickers, sign-off) */
const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['600']
});

/**
 * Reads the persisted theme cookie and applies it to <html> before first paint.
 * Kept inline (not a module) so it runs ahead of hydration, and cookie based so
 * it keeps working on the static export build where the server has no request.
 */
const APPLY_THEME_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${APP_THEME_KEY}=([^;]*)/);var v=m?decodeURIComponent(m[1]).replace(/^"|"$/g,''):'';if(v==='light'||v==='dark'){document.documentElement.setAttribute('data-theme','${APP_THEME_ATTRIBUTE_PREFIX}'+v)}else{document.documentElement.removeAttribute('data-theme')}}catch(e){}})();`;

/**
 * Layout for language-specific routes
 * Validates language parameter and renders header with language selector
 */
async function RootLayout({ children, ...props }: PropsWithChildren<NextPageProps>) {
  const params = await props.params;
  const lang = params.lang || await getLangugageServer();

  const currentLang = lang as I18nLocales;
  const htmlLang = I18n[currentLang].replace('_', '-').toLowerCase();

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      {/* `next/head` is Pages Router only; App Router layouts render <head> directly */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/*
          * `data-theme` belongs on <html>, not <body>: daisyUI paints the page
          * canvas from `:root` and, while <html> carries no theme, falls back to
          * `prefers-color-scheme` — that mismatch is what leaked a dark strip
          * below the footer in light mode. Applying it here, before first paint,
          * also avoids a theme flash. "system" is left unset on purpose so the
          * CSS media-query fallback stays in charge.
          */}
        <script dangerouslySetInnerHTML={{ __html: APPLY_THEME_SCRIPT }} />
      </head>
      <body className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${caveat.variable} antialiased relative min-h-screen overflow-x-hidden`}>
        {children}
        {!IS_DEV && (
          <Script data-website-id={ANALYTICS_ID} defer src="https://cloud.umami.is/script.js" />
        )}
      </body>
    </html>
  );
}

export default RootLayout;
