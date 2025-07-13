import '@/designs/styles/globals.css';

import { AUTHOR_FULLNAME, AUTHOR_TWITTER } from '@/configs/author';
import { DEFAULT_LOCALE, SITE_NAME } from '@/configs/sites';
import withHomeLocales from '@/modules/Home/Home.locales';
import RootLayout from '@/modules/Root.layout';
import { withMetadata } from '@/packages/utils/metadata/metadata';

const content = withHomeLocales('en');

export const metadata = withMetadata({
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`
  },
  description: content.description,
  authors: {
    name: AUTHOR_FULLNAME,
    url: `https://twitter.com/${AUTHOR_TWITTER}`
  },
  keywords: [],
  robots: { index: true, follow: true },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://gading.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'id-ID': '/id-ID'
    }
  },
  openGraph: {
    title: content.title,
    description: content.description,
    url: './',
    siteName: SITE_NAME,
    locale: DEFAULT_LOCALE,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    creator: `@${AUTHOR_TWITTER}`,
    title: content.title,
    description: content.description,
    site: `@${AUTHOR_TWITTER}`
  },
  verification: {
    google: 'eGOhdZjNeSLIBtMneyjMwoE3fg4c4-v4okvoqNf4ZlQ'
  }
});

export default RootLayout;
