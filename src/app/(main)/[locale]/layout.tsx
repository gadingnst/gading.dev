import { Fragment, PropsWithChildren } from 'react';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { NextPageProps } from '@/@types/global';

import { withMainLayoutPage } from '@/packages/components/layouts/Pages/Main';
import Navbar from '@/packages/components/layouts/Base/Navbar';
import Footer from '@/packages/components/layouts/Base/Footer';

function RootMainLayout({ children, params }: PropsWithChildren<NextPageProps>) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) return notFound();

  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}

export default withMainLayoutPage(RootMainLayout);
