import '@/styles/bundle.css';

import { Metadata } from 'next';
import { Poppins, Courgette } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { SITE_NAME } from '@/configs/env';
import cxm from '@/packages/utils/cxm';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '600', '700', '800', '900'],
  adjustFontFallback: false
});

const courgette = Courgette({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-courgette',
  adjustFontFallback: false
});

/**
 * HTML Metadata in App Route
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields
 */
export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`
  }
} satisfies Metadata;

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={cxm([poppins.variable, courgette.variable])}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
