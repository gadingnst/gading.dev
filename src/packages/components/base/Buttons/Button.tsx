'use client';

import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import cn from '@/designs/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glass' | 'outline' | 'error' | 'warning' | 'success' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'default' | 'square' | 'circle';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  wide?: boolean;
  block?: boolean;
  label?: string;
}

const baseClasses = [
  'btn transition-all duration-300 ease-in-out',
  'focus:outline-none',
  'active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
];

const variantClasses = {
  primary: [
    'btn',
    'hover:shadow-lg',
    'hover:-translate-y-1'
  ],
  secondary: [
    'btn-secondary',
    'hover:shadow-lg hover:shadow-secondary/25',
    'hover:-translate-y-1'
  ],
  accent: [
    'btn-accent',
    'hover:shadow-lg hover:shadow-accent/25',
    'hover:-translate-y-1'
  ],
  ghost: [
    'btn-ghost',
    'hover:bg-base-200/50',
    'hover:shadow-md'
  ],
  glass: [
    'liquid-glass border-0',
    'text-base-content hover:text-primary',
    'hover:bg-base-100/30 hover:border-primary/20',
    'hover:shadow-lg hover:shadow-primary/10',
    'hover:-translate-y-1'
  ],
  outline: [
    'btn-outline btn-primary',
    'hover:shadow-lg hover:shadow-primary/25',
    'hover:-translate-y-1'
  ],
  error: [
    'btn-error',
    'hover:shadow-lg hover:shadow-error/25',
    'hover:-translate-y-1'
  ],
  warning: [
    'btn-warning',
    'hover:shadow-lg hover:shadow-warning/25',
    'hover:-translate-y-1'
  ],
  success: [
    'btn-success',
    'hover:shadow-lg hover:shadow-success/25',
    'hover:-translate-y-1'
  ],
  info: [
    'btn-info',
    'hover:shadow-lg hover:shadow-info/25',
    'hover:-translate-y-1'
  ]
};

const sizeClasses = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg'
};

const shapeClasses = {
  default: '',
  square: 'btn-square',
  circle: 'btn-circle'
};

/**
 * Reusable Button component with intuitive styling using DaisyUI 5
 * and liquid glass design integration
 */
function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'default',
    icon,
    iconPosition = 'left',
    loading = false,
    wide = false,
    block = false,
    className,
    children,
    disabled,
    label,
    ...restProps
  } = props;

  const iconClasses = [
    'transition-transform duration-300',
    loading && 'animate-spin'
  ];

  const buttonClasses = cn([
    'group',
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    wide && 'btn-wide',
    block && 'btn-block',
    loading && 'loading',
    className
  ]);

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position || loading) return null;

    return (
      <span className={cn(iconClasses)}>
        {icon}
      </span>
    );
  };

  const renderLoadingIcon = () => {
    if (!loading) return null;

    return (
      <Loader2
        className={cn([
          'w-4 h-4 animate-spin',
          'transition-all duration-300'
        ])}
      />
    );
  };

  const renderContent = () => {
    if (shape === 'square' || shape === 'circle') {
      return (
        <>
          {renderLoadingIcon()}
          {!loading && icon && (
            <span className={cn(iconClasses)}>
              {icon}
            </span>
          )}
        </>
      );
    }

    return (
      <>
        {renderLoadingIcon()}
        {renderIcon('left')}
        {children && (
          <span className="transition-all duration-300">
            {children}
          </span>
        )}
        {renderIcon('right')}
      </>
    );
  };

  return (
    <button
      {...restProps}
      aria-label={label}
      className={buttonClasses}
      disabled={disabled || loading}
    >
      {renderContent()}
    </button>
  );
}

export default Button;
