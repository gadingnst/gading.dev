import { FunctionComponent, PropsWithChildren } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import Link from '@/components/Link';

export interface Props {
  text?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const Button: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    text,
    children,
    className,
    href,
    onClick
  } = props;

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={clsxm('relative cursor-pointer transition-all rounded-8 p-8', className)}
      >
        {children || text}
      </Link>
    );
  }

  return (
    <button
      role="button"
      className={clsxm('relative cursor-pointer transition-all rounded-8 p-8 text-white', className)}
      onClick={onClick}
    >
      {children || text}
    </button>
  );
};

Button.defaultProps = {
  text: '',
  className: 'bg-primary',
  href: '',
  onClick: () => void 0
};

export default Button;
