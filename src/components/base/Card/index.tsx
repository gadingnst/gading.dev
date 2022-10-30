import type { FunctionComponent, PropsWithChildren } from 'react';
import clsxm from '@/utils/helpers/clsxm';

export interface Props {
  className?: string;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

const Card: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className, style, hoverEffect } = props;
  return (
    <div
      style={style}
      className={clsxm(
        'bg-white shadow-lg transition-all duration-200 z-20 dark:bg-dark-50',
        hoverEffect && 'hover:-translate-y-8 hover:shadow-2xl dark:hover:shadow-primary',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  className: '',
  hoverEffect: false,
  style: {}
};

export default Card;
