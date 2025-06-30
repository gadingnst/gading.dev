import '@/designs/styles/globals.css';

import { Courgette, Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { Footer } from '@/modules/Common/components';
import Header from '@/modules/Common/components/Header';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import TopLoader from '@/packages/components/base/Loaders/TopLoader';
import getServerAppTheme from '@/packages/libs/AppTheme/getServerAppTheme';
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
async function RootLayout({ children }: PropsWithChildren) {
  const lang = await getLangugageServer();
  const appTheme = await getServerAppTheme();

  const currentLang = lang as I18nLocales;
  const htmlLang = I18n[currentLang].replace('_', '-').toLowerCase();

  return (
    <html lang={htmlLang}>
      <body data-theme={appTheme} className={`${poppins.variable} ${courgette.variable} antialiased pt-16`}>
        <TopLoader color="primary" height={3} showShadow />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
