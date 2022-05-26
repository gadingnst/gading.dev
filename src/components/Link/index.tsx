import { FunctionComponent, MouseEvent, PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/router';
import { isURL } from '@/utils/helpers/url';

export interface Props {
  href?: string;
  asPath?: string;
  className?: string;
  disabled?: boolean;
  target?: string;
  title?: string;
  locale?: string|false;
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
    onClick
  } = props;

  const clickHandler = useCallback((event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    if (onClick && !disabled) onClick(event);
    if (href && !disabled && href !== '#') {
      if (isURL(href)) {
        window.open(href, target);
      } else {
        const as = asPath || href;
        const opts = { locale };
        const args = [href, as, opts] as const;
        router.push(...args);
      }
    }
  }, []);

  let classes = className;
  if (disabled) classes += ' cursor-not-allowed';

  return (
    <a role="link" className={classes} href={href} onClick={clickHandler} title={title}>
      {children}
    </a>
  );
};

Link.defaultProps = {
  className: 'text-primary dark:text-accent-2',
  disabled: false,
  target: '_blank'
};

export default Link;
