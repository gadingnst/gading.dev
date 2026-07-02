'use client';

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
        'card liquid-glass-shadow z-10',
        'transition-all duration-300 ease-in-out',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-2xl',
        className
      ])}
    >
      {children}
    </div>
  );
};

export default Card;
