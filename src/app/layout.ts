import '@/designs/styles/globals.css';

import withHomeLocales from '@/modules/Home/Home.locales';
import RootLayout from '@/modules/Root.layout';
import { withMetadata } from '@/packages/utils/metadata';

const content = withHomeLocales('en');

export const metadata = withMetadata({
  title: content.title,
  description: content.description,
  openGraph: {
    title: content.title,
    description: content.description
  }
});

export default RootLayout;
