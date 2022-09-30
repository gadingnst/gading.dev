import type { FunctionComponent, PropsWithChildren } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import Link from '@/components/base/Link';

export interface Props {
  text?: string;
  className?: string;
  href?: string;
  locale?: string;
  onClick?: () => void;
}

const Button: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    text,
    children,
    className,
    href,
    onClick,
    locale
  } = props;

  const classes = 'relative cursor-pointer transition-all duration-150 p-8'
    + ' hover:scale-105 active:scale-95 active:outline-1 active:outline-white';

  if (href) {
    return (
      <Link
        locale={locale}
        delay={300}
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
      onClick={onClick}
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
