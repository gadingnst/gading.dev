import { PropsWithChildren } from 'react';

import TopLoader from '@/packages/components/base/Loaders/TopLoader';
import Footer from '@/packages/components/layouts/Footer/Footer';
import Header from '@/packages/components/layouts/Header/Header';
import AppThemeInitializer from '@/packages/libs/AppTheme/AppThemeInitializer';

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TopLoader height={3} showShadow />
      <Header />
      {children}
      <Footer />
      <AppThemeInitializer />
    </>
  );
}

export default BaseLayout;
