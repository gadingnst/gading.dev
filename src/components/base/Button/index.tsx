import { FunctionComponent, PropsWithChildren, useCallback, MouseEvent } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import Link from '@/components/base/Link';
import useDelayedAction from '@/hooks/useDelayedAction';

export interface Props {
  text?: string;
  className?: string;
  href?: string;
  locale?: string;
  delay?: number;
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
    delay
  } = props;

  const classes = 'relative cursor-pointer transition-all duration-150 p-8'
    + ' hover:scale-105 active:scale-95 active:outline-1 active:outline-white';

  const withDelay = useDelayedAction(delay);

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
        className={clsxm(classes, className)}
      >
        {children || text}
      </Link>
    );
  }

  return (
    <button
      role="button"
      className={clsxm(classes, 'text-white', className)}
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
  onClick: () => void 0
};

export default Button;
