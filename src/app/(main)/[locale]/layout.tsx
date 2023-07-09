import { Fragment, PropsWithChildren } from 'react';
import { withMainLayoutPage } from '@/packages/components/layouts/Pages/Main';
import Navbar from '@/packages/components/layouts/Base/Navbar';
import Footer from '@/packages/components/layouts/Base/Footer';
import { NextPageProps } from '@/@types/global';

function RootMainLayout({ children }: PropsWithChildren<NextPageProps>) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}

export default withMainLayoutPage(RootMainLayout);
