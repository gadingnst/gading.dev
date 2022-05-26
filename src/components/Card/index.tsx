import { FunctionComponent, PropsWithChildren } from 'react';
import clsxm from '@/utils/helpers/clsxm';

export interface Props {
  className?: string;
  hoverEffect?: boolean;
}

const Card: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className, hoverEffect } = props;
  return (
    <div
      className={clsxm(
        'bg-white shadow-all transition-all duration-200 z-20 dark:bg-dark-60',
        hoverEffect && 'hover:scale-102',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  className: '',
  hoverEffect: false
};

export default Card;
