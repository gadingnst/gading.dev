import { NextPage } from 'next';
import { FunctionComponent, Fragment, PropsWithChildren } from 'react';
import Head from '@/components/Head';
import { SITE_NAME } from '@/utils/config';

export interface Props {
  title: string;
}

export type UnknownProps = Record<string, unknown>;

const Layout: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, title } = props;
  return (
    <Fragment>
      <Head>
        <title>
          {title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`}
        </title>
      </Head>
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    </Fragment>
  );
};

/**
 * Higher-order component that wraps the provided component in a `<Layout>` component.
 * @param PageComponent - The page component to wrap with the layout
 * @param layoutProps - The props to pass to the layout
 * @returns - NextPage
 */
export const withLayoutPage = <T extends UnknownProps>(
  PageComponent: NextPage<T>, layoutProps: Props|((pageProps: T) => Props)
) => {
  const LayoutPage: FunctionComponent<T> = (pageProps) => {
    const layoutPropsWithPageProps = typeof layoutProps === 'function'
      ? layoutProps(pageProps) : layoutProps;
    return (
      <Layout {...layoutPropsWithPageProps}>
        <PageComponent {...pageProps} />
      </Layout>
    );
  };
  return LayoutPage;
};

export default Layout;
