import { FunctionComponent, PropsWithChildren, useCallback, MouseEvent, useMemo } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import Link from '@/components/base/Link';
import useDelayedAction from '@/hooks/useDelayedAction';

export interface Props {
  text?: string;
  className?: string;
  href?: string;
  locale?: string;
  delay?: number;
  disableHover?: boolean;
  onClick?: <T>(event: MouseEvent<T, globalThis.MouseEvent>) => void;
}

const Button: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    text,
    children,
    className,
    href,
    onClick,
    locale,
    disableHover,
    delay
  } = props;

  const withDelay = useDelayedAction(delay);

  const classes = useMemo(() => {
    let defaultClass = 'relative shadow-md cursor-pointer p-8 duration-150 transition-all active:scale-95 active:outline-1 active:outline-light dark:active:outline-white';
    if (!disableHover) {
      defaultClass += ' hover:-translate-y-2 hover:shadow-lg active:shadow-none dark:hover:shadow-primary-2';
    }
    return defaultClass;
  }, [disableHover]);

  const onClickBtn = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    withDelay(() => {
      onClick?.(event);
    });
  }, [onClick]);

  if (href) {
    return (
      <Link
        locale={locale}
        delay={delay}
        href={href}
        onClick={onClick}
        className={clsxm(classes, className, 'hover:no-underline')}
      >
        {children || text}
      </Link>
    );
  }

  return (
    <button
      role="button"
      className={clsxm(classes, className, 'text-white')}
      onClick={onClickBtn}
    >
      {children || text}
    </button>
  );
};

Button.defaultProps = {
  text: '',
  className: 'bg-primary rounded-8',
  href: '',
  disableHover: false,
  onClick: () => void 0
};

export default Button;
