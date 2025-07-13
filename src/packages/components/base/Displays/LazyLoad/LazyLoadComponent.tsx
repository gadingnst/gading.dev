/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';

import type { LazyLoadComponentProps } from './types';

// Extended props for backward compatibility
interface ExtendedLazyLoadComponentProps extends LazyLoadComponentProps {
  /** Whether component should be visible by default */
  visibleByDefault?: boolean;
  /** Delay method for scroll events */
  delayMethod?: 'throttle' | 'debounce';
  /** Delay time in milliseconds */
  delayTime?: number;
  /** Function called before component starts loading */
  beforeLoad?: () => void;
  /** Function called after component has loaded */
  afterLoad?: () => void;
}

/**
 * LazyLoadComponent for lazy loading any React component
 * Based on react-lazy-load-image-component pattern
 */
function LazyLoadComponent({
  children,
  placeholder,
  threshold = 100,
  useIntersectionObserver = true,
  visibleByDefault = false,
  className,
  style,
  delayMethod = 'throttle',
  delayTime = 300,
  beforeLoad,
  afterLoad,
  tag = 'div'
}: ExtendedLazyLoadComponentProps) {
  const Component = tag as React.ElementType;
  const [isInView, setIsInView] = useState(visibleByDefault);
  const [isLoaded, setIsLoaded] = useState(false);
  const wrapperRef = useRef<any>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Throttle function implementation
   */
  const throttle = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    return (...args: Parameters<T>) => {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  /**
   * Debounce function implementation
   */
  const debounce = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  /**
   * Check if element is in viewport
   */
  const checkInView = useCallback(() => {
    if (!wrapperRef.current) return false;

    const rect = wrapperRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top <= windowHeight + threshold &&
      rect.bottom >= -threshold &&
      rect.left <= windowWidth + threshold &&
      rect.right >= -threshold
    );
  }, [threshold]);

  /**
   * Handle scroll events with delay
   */
  const handleScroll = useCallback(() => {
    if (isInView) return;

    if (checkInView()) {
      setIsInView(true);
    }
  }, [isInView, checkInView]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedHandleScroll = useCallback(
    delayMethod === 'throttle'
      ? throttle(handleScroll, delayTime)
      : debounce(handleScroll, delayTime),
    [handleScroll, delayMethod, delayTime, throttle, debounce]
  );

  /**
   * Setup intersection observer
   */
  useEffect(() => {
    if (!useIntersectionObserver || typeof window === 'undefined') {
      return;
    }

    if ('IntersectionObserver' in window && wrapperRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              if (observerRef.current) {
                observerRef.current.disconnect();
              }
            }
          });
        },
        {
          rootMargin: `${threshold}px`
        }
      );

      observerRef.current.observe(wrapperRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, useIntersectionObserver]);

  /**
   * Setup scroll listeners as fallback
   */
  useEffect(() => {
    if (useIntersectionObserver && 'IntersectionObserver' in window) {
      return;
    }

    if (visibleByDefault || isInView) return;

    // Initial check
    if (checkInView()) {
      setIsInView(true);
      return;
    }

    // Add scroll listeners
    window.addEventListener('scroll', delayedHandleScroll, { passive: true });
    window.addEventListener('resize', delayedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', delayedHandleScroll);
      window.removeEventListener('resize', delayedHandleScroll);
      if (timeoutRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInView, visibleByDefault, checkInView, delayedHandleScroll, useIntersectionObserver]);

  /**
   * Handle component load
   */
  useEffect(() => {
    if (isInView && !isLoaded) {
      if (beforeLoad) {
        beforeLoad();
      }

      setIsLoaded(true);

      if (afterLoad) {
        afterLoad();
      }
    }
  }, [isInView, isLoaded, beforeLoad, afterLoad]);

  return (
    <Component
      ref={wrapperRef}
      className={cn([
        'lazy-load-component',
        className
      ])}
      style={style}
    >
      {isInView ? children : (placeholder || <div className="lazy-placeholder" />)}
    </Component>
  );
}

export default LazyLoadComponent;
