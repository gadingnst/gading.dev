'use client';

import type { PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

export interface CardProps {
  className?: string;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

function Card(_props: PropsWithChildren<CardProps>) {
  const { isDark } = useAppTheme();
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
        'card bg-base-200 z-10 shadow-lg',
        'transition-all duration-300 ease-in-out',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-xl',
        isDark && 'shadow-primary',
        className
      ])}
    >
      {children}
    </div>
  );
};

export default Card;
