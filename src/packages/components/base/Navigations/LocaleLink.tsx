'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { I18n } from '@/@types/i18n';
import UnstyledLink, { type Props as UntyledLinkProps } from '@/packages/components/base/Navigations/UnstyledLink';
import cn from '@/packages/utils/cn';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface Props extends UntyledLinkProps {
  href?: string;
  locale: string;
}

function omitLocaleFromPathname(pathname: string) {
  // detect first segment of pathname
  const firstSegment = pathname.split('/')[1];
  // if first segment is locale, remove it
  if (Object.keys(I18n).includes(firstSegment)) {
    return pathname.slice(3);
  }
  return pathname;
}

function LocaleLink(props: Props) {
  const { href, ...otherProps } = props;
  const pathname = usePathname();

  const localeHref = useMemo(() => {
    return `/${props.locale}${omitLocaleFromPathname(pathname)}`;
  }, [pathname, props.locale]);

  return (
    <UnstyledLink
      {...otherProps}
      href={href || localeHref}
      className={cn([
        'link underline-offset-4 decoration-dashed no-underline hover:underline',
        props.className
      ])}
    />
  );
}

export default LocaleLink;
