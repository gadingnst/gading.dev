import { PropsWithChildren } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { I18nLocales, I18n } from '@/packages/libs/I18n/interface';
import Header from '@/modules/Common/components/Header';
import '@/designs/styles/globals.css';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

/**
 * Layout for language-specific routes
 * Validates language parameter and renders header with language selector
 */
async function RootLayout({ children }: PropsWithChildren) {
  const lang = await getLangugageServer();

  const currentLang = lang as I18nLocales;
  const htmlLang = I18n[currentLang].replace('_', '-').toLowerCase();

  return (
    <html lang={htmlLang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
