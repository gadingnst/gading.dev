import '@/designs/styles/globals.css';

import { Courgette, Poppins } from 'next/font/google';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

import { ANALYTICS_ID, IS_DEV } from '@/configs/sites';
import Footer from '@/modules/Common/components/Footer/Footer';
import Header from '@/modules/Common/components/Header/Header';
import TopLoader from '@/packages/components/base/Loaders/TopLoader';
import AppThemeInitializer from '@/packages/libs/AppTheme/AppThemeInitializer';

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
async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body className={`${poppins.variable} ${courgette.variable} antialiased`}>
        <TopLoader color="primary" height={3} showShadow />
        <Header />
        {children}
        <Footer />
        <AppThemeInitializer />
        {!IS_DEV && (
          <Script data-website-id={ANALYTICS_ID} defer src="https://cloud.umami.is/script.js" />
        )}
      </body>
    </html>
  );
}

export default RootLayout;
