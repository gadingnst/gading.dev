import '@/designs/styles/globals.css';

import { GOOGLE_VERIFICATION_ID, SITE_NAME } from '@/configs/sites';
import RootLayout from '@/modules/Root.layout';
import { withMetadata } from '@/packages/utils/metadata/metadata';

export const metadata = withMetadata({
  metadataBase: new URL('https://gading.dev'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'id-ID': '/id'
    }
  },
  verification: {
    google: GOOGLE_VERIFICATION_ID
  }
});

export default RootLayout;
