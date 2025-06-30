'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import cn from '@/designs/utils/cn';

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

/**
 * TopLoader component that shows a progress bar at the top of the page during route transitions
 * Automatically detects route changes and shows/hides the loader accordingly
 */
function TopLoader({
  color = 'primary',
  height = 3,
  speed = 200,
  showShadow = true,
  className
}: TopLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    const startLoading = () => {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          const newProgress = prev + Math.random() * 10;
          return newProgress;
        });
      }, speed / 4);
    };

    const completeLoading = () => {
      setProgress(100);
      completeTimer = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, speed);
    };

    startLoading();

    // Complete loading after a longer delay to make it more visible
    const finishTimer = setTimeout(() => {
      completeLoading();
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname, searchParams, speed]);

  if (!isLoading) return null;

  return (
    <div
      className={cn([
        'fixed top-0 left-0 z-[9999] transition-all duration-300 ease-out',
        showShadow && 'shadow-lg',
        className
      ])}
      style={{
        height: `${height}px`,
        width: `${progress}%`,
        backgroundColor: '#3b82f6',
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
