import { FunctionComponent, PropsWithChildren } from 'react';
import NextHead from 'next/head';
import { AUTHOR_FULLNAME } from '@/utils/config';

interface Props {
  title?: string;
}

const Head: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children } = props;
  return (
    <NextHead>
      {children}
      <meta name="author" content={AUTHOR_FULLNAME} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </NextHead>
  );
};

export default Head;
