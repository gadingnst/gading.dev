'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import { getLocalizedPathname } from '@/packages/libs/I18n/utils';

type NextLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>
  & LinkProps
  & React.RefAttributes<HTMLAnchorElement>>;

export interface Props extends NextLinkProps {
  disabled?: boolean;
  withCurrentLocale?: boolean;
}

/**
 * NextLink component with optional locale-aware routing
 * @param withCurrentLocale - When true, prepends current locale to href
 */
function NextLink(props: Props) {
  const { disabled = false, withCurrentLocale = false, className, href, ...restProps } = props;
  const currentLanguage = useLangugage();

  const localizedHref = withCurrentLocale && href
    ? getLocalizedPathname(href.toString(), currentLanguage)
    : href;

  return (
    <Link
      {...restProps}
      href={localizedHref}
      className={cn([
        disabled && 'opacity-60 pointer-events-none cursor-not-allowed',
        className
      ])}
    />
  );
}

export default NextLink;
