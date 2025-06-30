import '@/designs/styles/globals.css';

import homePageLocales from '@/modules/Home/locales';
import RootLayout from '@/modules/Root.layout';
import { withMetadata } from '@/packages/utils/metadata';

const content = homePageLocales('en');

export const metadata = withMetadata({
  title: content.title,
  description: content.description,
  openGraph: {
    title: content.title,
    description: content.description
  }
});

export default RootLayout;
