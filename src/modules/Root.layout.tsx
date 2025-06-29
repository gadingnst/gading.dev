import { PropsWithChildren } from 'react';
import { Poppins, Courgette } from 'next/font/google';
import { I18nLocales, I18n } from '@/packages/libs/I18n/interface';
import Header from '@/modules/Common/components/Header';
import '@/designs/styles/globals.css';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';

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

  const currentLang = lang as I18nLocales;
  const htmlLang = I18n[currentLang].replace('_', '-').toLowerCase();

  return (
    <html lang={htmlLang}>
      <body
        className={`${poppins.variable} ${courgette.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
