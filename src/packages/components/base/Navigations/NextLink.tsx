import type { LinkProps } from 'next/link';
import Link from 'next-intl/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import cxm from '@/packages/utils/cxm';

type NextLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>
  & LinkProps
  & React.RefAttributes<HTMLAnchorElement>>;

export interface Props extends NextLinkProps {
  disabled?: boolean;
  locale?: string;
}

function NextLink(props: Props) {
  const { disabled = false, className, ...otherProps } = props;
  return (
    <Link
      {...otherProps}
      className={cxm([
        disabled && 'opacity-60 cursor-not-allowed',
        className
      ])}
    />
  );
}

export default NextLink;
