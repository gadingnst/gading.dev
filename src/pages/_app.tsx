import type { AppProps } from 'next/app';
import Script from 'next/script';
import { Fragment, FunctionComponent, memo, useMemo, useRef } from 'react';
import NProgress from 'nextjs-progressbar';
import { useMounted, useUpdated } from '@/hooks';
import useAppTheme from '@/hooks/stores/useAppTheme';
import { ANALYTICS_ID, IS_DEV } from '@/utils/config';
import '@/styles/globals.css';

export { reportWebVitals } from 'next-axiom';

const App: FunctionComponent<AppProps> = (props) => {
  const { Component, pageProps } = props;
  const [theme] = useAppTheme();
  const root = useRef<HTMLElement>();

  const nprogressColor = useMemo(() => {
    return theme.current === 'light' ? '#B89BFF' : '#5E72E4';
  }, [theme.current]);

  useMounted(() => {
    root.current = window.document.documentElement;
  });

  useUpdated(() => {
    const htmlClass = root.current?.classList;
    htmlClass?.remove(theme.next);
    htmlClass?.add(theme.current);
  }, [theme]);

  return (
    <Fragment>
      <NProgress color={nprogressColor} />
      <Component {...pageProps} />
      {!IS_DEV && (
        <Script async defer data-website-id={ANALYTICS_ID} src="https://analytics.gading.dev/umami.js" />
      )}
    </Fragment>
  );
};

export default memo(App);
