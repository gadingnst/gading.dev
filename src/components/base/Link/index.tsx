import { FunctionComponent, MouseEvent, PropsWithChildren, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { isURL, sanitizeURL } from '@/utils/helpers/url';
import clsxm from '@/utils/helpers/clsxm';

export interface Props {
  href: string;
  asPath?: string;
  className?: string;
  disabled?: boolean;
  target?: string;
  title?: string;
  locale?: string|false;
  delay?: number;
  onClick?: (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => void;
}

const Link: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const router = useRouter();

  const {
    children,
    href,
    asPath,
    disabled,
    className,
    title,
    target,
    locale,
    delay,
    onClick
  } = props;

  const path = useMemo(() => {
    return asPath || href;
  }, [asPath, href]);

  const link = useMemo(() => {
    return sanitizeURL(locale ? `/${locale}/${path}` : path);
  }, [locale, path]);

  const withDelay = useCallback((callback: () => void) => {
    if (delay) {
      return setTimeout(callback, delay);
    }
    return callback();
  }, []);

  const clickHandler = useCallback((event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    if (onClick && !disabled) {
      withDelay(() => {
        onClick(event);
      });
    }
    if (href && !disabled && href !== '#') {
      if (isURL(href)) {
        withDelay(() => {
          window.open(href, target);
        });
      } else {
        const as = asPath || href;
        const opts = { locale };
        const args = [href, as, opts] as const;
        router.push(...args);
        withDelay(() => {
          router.push(...args);
        });
      }
    }
  }, []);

  return (
    <a
      role="link"
      className={clsxm([
        disabled && 'cursor-not-allowed',
        'transition-all hover:util--underline-dotted hover:underline-offset-2',
        className
      ])}
      href={link}
      onClick={clickHandler}
      title={title}
    >
      {children}
    </a>
  );
};

Link.defaultProps = {
  className: 'text-primary dark:text-accent-2',
  disabled: false,
  target: '_blank',
  delay: 0
};

export default Link;
