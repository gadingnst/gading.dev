import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

import cn from '@/designs/utils/cn';

import NextLink, { type Props as NextLinkProps } from './NextLink';

export interface LinkProps extends NextLinkProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  external?: boolean;
}

const baseClasses = [
  'inline-flex items-center gap-1 transition-all duration-300 ease-in-out',
  'text-base-content hover:text-primary',
  'underline-offset-4 hover:underline',
  'decoration-primary/60 hover:decoration-primary',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
];

/**
 * Simple Link component for text-based navigation links
 * with external link icon support
 */
function Link(props: LinkProps) {
  const {
    size = 'md',
    icon,
    iconPosition = 'left',
    external = false,
    className,
    children,
    ...restProps
  } = props;

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconClasses = [
    'transition-transform duration-300',
    'group-hover:translate-x-0.5'
  ];

  const linkClasses = cn([
    'group',
    ...baseClasses,
    sizeClasses[size],
    className
  ]);

  const linkProps = {
    ...restProps,
    className: linkClasses,
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
    <NextLink {...linkProps}>
      {renderIcon('left')}
      <span className="transition-all duration-300">
        {children}
      </span>
      {renderIcon('right')}
      {renderExternalIcon()}
    </NextLink>
  );
}

export default Link;
