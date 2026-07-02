import '@/designs/styles/globals.css';

import { Courgette, Poppins } from 'next/font/google';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

import { NextPageProps } from '@/@types/global';
import { ANALYTICS_ID, IS_DEV } from '@/configs/sites';
import { getLangugageServer } from '@/packages/libs/I18n/i18n.server';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const courgette = Courgette({
  variable: '--font-courgette',
  subsets: ['latin'],
  weight: ['400']
});

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
    <html lang={htmlLang}>
      <body className={`${poppins.variable} ${courgette.variable} antialiased relative min-h-screen overflow-x-hidden`}>
        {/* Ambient background glow for Liquid Glass effect (Dark mode only) */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none hidden dark:block">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] transition-all duration-500" />
          <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/8 blur-[150px] transition-all duration-500" />
          <div className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-accent/8 blur-[130px] transition-all duration-500" />
        </div>
        {children}
        {!IS_DEV && (
          <Script data-website-id={ANALYTICS_ID} defer src="https://cloud.umami.is/script.js" />
        )}
      </body>
    </html>
  );
}

export default RootLayout;
