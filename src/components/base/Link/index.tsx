import { AnchorHTMLAttributes, FunctionComponent, MouseEvent, PropsWithChildren, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { isURL, sanitizeURL } from '@/utils/helpers/url';
import clsxm from '@/utils/helpers/clsxm';
import useDelayedAction from '@/hooks/useDelayedAction';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asPath?: string;
  locale?: string|false;
  disabled?: boolean;
  delay?: number;
  className?: string;
  target?: string;
  title?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => void;
}

const Link: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const router = useRouter();

  const {
    children,
    href,
    asPath,
    disabled,
    delay,
    locale,
    ...anchorProps
  } = props;

  const {
    className,
    title,
    target,
    onClick
  } = anchorProps;

  const withDelay = useDelayedAction(delay);

  const path = useMemo(() => {
    return asPath || href;
  }, [asPath, href]);

  const link = useMemo(() => {
    return sanitizeURL(locale ? `/${locale}/${path}` : path);
  }, [locale, path]);

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
  }, [onClick, disabled, asPath, href, locale, title, target]);

  return (
    <a
      {...anchorProps}
      role="link"
      className={clsxm([
        disabled && 'cursor-not-allowed',
        className,
        'transition-all hover:util--underline-dotted hover:underline-offset-2'
      ])}
      href={link}
      onClick={clickHandler}
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
