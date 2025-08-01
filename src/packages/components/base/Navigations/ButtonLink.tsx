'use client';

import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

import cn from '@/designs/utils/cn';

import NextLink, { type Props as NextLinkProps } from './NextLink';

export interface ButtonLinkProps extends NextLinkProps {
  variant?: 'button' | 'glass' | 'ghost' | 'outline' | 'accent';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  external?: boolean;
  withCurrentLocale?: boolean;
  label?: string;
}

const baseClasses = [
  'inline-flex items-center gap-1 transition-all duration-300 ease-in-out',
  'focus:outline-none',
  'active:scale-95'
];

const variantClasses = {
  button: [
    'btn',
    'hover:shadow-lg',
    'hover:-translate-y-1'
  ],
  glass: [
    'liquid-glass rounded-lg px-4 py-2',
    'text-base-content hover:text-primary',
    'hover:bg-base-100/30 hover:border-primary/20',
    'hover:shadow-lg hover:shadow-primary/10',
    'hover:-translate-y-1'
  ],
  ghost: [
    'btn btn-ghost',
    'hover:bg-primary/10 hover:text-primary',
    'hover:shadow-md'
  ],
  outline: [
    'btn btn-outline btn-primary',
    'hover:shadow-lg hover:shadow-primary/25',
    'hover:-translate-y-1'
  ],
  accent: [
    'btn btn-accent',
    'hover:shadow-lg hover:shadow-accent/25',
    'hover:-translate-y-1'
  ]
};

/**
 * ButtonLink component with button-style variants using DaisyUI 5
 * and liquid glass design integration with optional locale-aware routing
 */
function ButtonLink(props: ButtonLinkProps) {
  const {
    variant = 'button',
    size = 'md',
    icon,
    iconPosition = 'left',
    external = false,
    withCurrentLocale = false,
    className,
    label,
    children,
    ...restProps
  } = props;

  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  const iconClasses = [
    'transition-transform duration-300'
  ];

  const linkClasses = cn([
    'group',
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    className
  ]);

  const linkProps = {
    ...restProps,
    className: linkClasses,
    withCurrentLocale,
    ...(external && {
      target: '_blank',
      rel: 'noopener noreferrer'
    })
  };

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;

    return (
      <span className={cn(iconClasses)}>
        {icon}
      </span>
    );
  };

  const renderExternalIcon = () => {
    if (!external) return null;

    return (
      <ExternalLink
        className={cn([
          'w-3 h-3 opacity-60 transition-all duration-300',
          'group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-1'
        ])}
      />
    );
  };

  return (
    <NextLink {...linkProps} aria-label={label}>
      {renderIcon('left')}
      <span className="transition-all duration-300">
        {children}
      </span>
      {renderIcon('right')}
      {renderExternalIcon()}
    </NextLink>
  );
}

export default ButtonLink;
