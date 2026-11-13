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
        'card theme-card z-10',
        hoverEffect && 'lift',
        className
      ])}
    >
      {children}
    </div>
  );
};

export default Card;
