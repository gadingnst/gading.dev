import { Fragment, PropsWithChildren } from 'react';

import { NextPageProps } from '@/@types/global';
import Footer from '@/modules/Home/components/Footer';
import MainContent from '@/packages/components/layouts/Base/MainContent';
import Navbar from '@/packages/components/layouts/Base/Navbar';
import { withMainLayoutPage } from '@/packages/components/layouts/Pages/Main';

function RootMainLayout({ children }: PropsWithChildren<NextPageProps>) {
  return (
    <Fragment>
      <Navbar />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </Fragment>
  );
}

export default withMainLayoutPage(RootMainLayout);
