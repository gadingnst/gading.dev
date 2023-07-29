import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Fragment, PropsWithChildren } from 'react';

import { NextPageProps } from '@/@types/global';
import Footer from '@/packages/components/layouts/Base/Footer';
import MainContent from '@/packages/components/layouts/Base/MainContent';
import Navbar from '@/packages/components/layouts/Base/Navbar';
import { withMainLayoutPage } from '@/packages/components/layouts/Pages/Main';

function RootMainLayout({ children, params }: PropsWithChildren<NextPageProps>) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) return notFound();

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
