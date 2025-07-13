import type { PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';

export interface CardProps {
  className?: string;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

function Card(_props: PropsWithChildren<CardProps>) {
  const {
    children,
    className,
    style,
    hoverEffect = false
  } = _props;
  return (
    <div
      style={style}
      className={cn([
        'card bg-base-200 shadow-lg shadow-base-300/20 transition-all duration-200 z-20',
        'dark:shadow-base-content/10',
        hoverEffect && 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-base-300/30 dark:hover:shadow-base-content/20',
        className
      ])}
    >
      {children}
    </div>
  );
};

export default Card;
