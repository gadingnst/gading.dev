import { PropsWithChildren } from 'react';

import TopLoader from '@/packages/components/base/Loaders/TopLoader';
import Footer from '@/packages/components/layouts/Footer/Footer';
import Header from '@/packages/components/layouts/Header/Header';
import AppThemeInitializer from '@/packages/libs/AppTheme/AppThemeInitializer';

function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopLoader height={3} showShadow />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <AppThemeInitializer />
    </div>
  );
}

export default BaseLayout;
