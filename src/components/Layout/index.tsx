import { NextPage } from 'next';
import { FunctionComponent, Fragment, PropsWithChildren, useMemo } from 'react';
import Head, { Props as HeadProps } from '@/components/Head';
import { SITE_NAME } from '@/utils/config';
import { I18nLocales } from '@/types/contents';

export interface Props {
  locale?: I18nLocales|string;
  meta: HeadProps['meta'];
}

export type UnknownProps = Record<string, unknown>;

const Layout: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    locale,
    meta
  } = props;
  const title = meta?.title?.includes(SITE_NAME) ? meta?.title : `${meta?.title} | ${SITE_NAME}`;
  return (
    <Fragment>
      <Head locale={locale} meta={{ ...meta, title }} />
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
    const layoutPropsWithPageProps = useMemo(() => {
      return typeof layoutProps === 'function'
        ? layoutProps(pageProps) : layoutProps;
    }, [layoutProps, pageProps]);

    return (
      <Layout {...layoutPropsWithPageProps}>
        <PageComponent {...pageProps} />
      </Layout>
    );
  };
  return LayoutPage;
};

export default Layout;
