'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import cn from '@/designs/utils/cn';
import useMounted from '@/packages/hooks/useMounted';

export interface TopLoaderProps {
  /**
   * Color of the progress bar
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  /**
   * Height of the progress bar in pixels
   * @default 3
   */
  height?: number;
  /**
   * Speed of the progress animation in milliseconds
   * @default 200
   */
  speed?: number;
  /**
   * Whether to show a shadow below the progress bar
   * @default true
   */
  showShadow?: boolean;
  /**
   * Custom className for the progress bar
   */
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error'
};

/**
 * TopLoader component that shows a progress bar at the top of the page during route transitions
 * Automatically detects link clicks and route changes to show/hide the loader accordingly
 */
function TopLoader({
  color = 'accent',
  height = 3,
  speed = 200,
  showShadow = true,
  className
}: TopLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle link clicks to start loading immediately
  useMounted(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);

        // Only start loading for internal navigation
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          startLoading();
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  });

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, speed / 3);
  };

  const completeLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
  };

  // Complete loading when route actually changes
  useEffect(() => {
    if (isLoading) {
      completeLoading();
    }
  }, [isLoading, pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div
      className={cn([
        'fixed top-0 left-0 z-[9999] transition-all duration-300 ease-out',
        colorClasses[color],
        showShadow && 'shadow-lg',
        className
      ])}
      style={{
        height: `${height}px`,
        width: `${progress}%`,
        pointerEvents: 'none'
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute right-0 top-0 h-full w-20 opacity-75"
        style={{
          background: `linear-gradient(to right, transparent, hsl(var(--${color})))`
        }}
      />
    </div>
  );
}

export default TopLoader;
