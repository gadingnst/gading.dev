/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';

import type {
  LazyImageProps,
  LazyLoadState,
  ResizeEventHandler,
  ScrollEventHandler
} from './types';

type DebouncedFunction<T extends (...args: never[]) => unknown> = (
  ...args: Parameters<T>
) => void;

type ThrottledFunction<T extends (...args: never[]) => unknown> = (
  ...args: Parameters<T>
) => void;

/**
 * Throttle function to limit the rate of function calls
 */
function throttle<T extends(...args: never[]) => unknown>(
  func: T,
  limit: number
): ThrottledFunction<T> {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function to delay function calls until after a specified time
 */
function debounce<T extends(...args: never[]) => unknown>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Check if an element is in the viewport
 */
function isElementInViewport(
  element: Element,
  threshold: number = 0
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top <= windowHeight + threshold &&
    rect.bottom >= -threshold &&
    rect.left <= windowWidth + threshold &&
    rect.right >= -threshold
  );
}

/**
 * LazyImage component for lazy loading images with various effects
 */
function LazyImage({
  src,
  alt,
  width,
  height,
  effect,
  placeholderSrc,
  placeholder,
  showShimmer = true,
  threshold = 100,
  useIntersectionObserver = true,
  observerOptions,
  onLoad,
  onError,
  once = true,
  className,
  wrapperClassName,
  style,
  beforeLoad,
  afterLoad,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollPosition,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isScrollTracking,
  ...imgProps
}: LazyImageProps) {
  const [state, setState] = useState<LazyLoadState>({
    isInView: false,
    isLoaded: false,
    hasError: false,
    isLoading: false
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  /**
   * Handle image load success
   */
  const handleImageLoad = useCallback(() => {
    setState(prev => ({ ...prev, isLoaded: true, isLoading: false }));
    if (afterLoad) {
      afterLoad();
    }
    onLoad?.();
  }, [onLoad, afterLoad]);

  /**
   * Handle image load error
   */
  const handleImageError = useCallback(() => {
    setState(prev => ({ ...prev, hasError: true, isLoading: false }));
    onError?.();
  }, [onError]);

  /**
   * Check if element is in viewport and update state
   */
  const checkInView = useCallback(() => {
    if (!wrapperRef.current) return;

    const inView = isElementInViewport(wrapperRef.current, threshold);
    if (inView && (!state.isInView || !once)) {
      if (beforeLoad) {
        beforeLoad();
      }
      setState(prev => ({ ...prev, isInView: true, isLoading: true }));
    }
  }, [threshold, state.isInView, once, beforeLoad]);

  /**
   * Setup IntersectionObserver
   */
  const setupIntersectionObserver = useCallback(() => {
    if (!wrapperRef.current || !window.IntersectionObserver) return;

    const options = {
      rootMargin: `${threshold}px`,
      threshold: 0,
      ...observerOptions
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (!state.isInView || !once)) {
          if (beforeLoad) {
            beforeLoad();
          }
          setState(prev => ({ ...prev, isInView: true, isLoading: true }));
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      });
    }, options);

    observerRef.current.observe(wrapperRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, observerOptions, state.isInView, once]);

  /**
   * Setup scroll and resize listeners as fallback
   */
  const setupScrollListeners = useCallback(() => {
    const throttledCheck = throttle(checkInView, 100);
    const debouncedCheck = debounce(checkInView, 250);

    const scrollHandler: ScrollEventHandler = () => throttledCheck();
    const resizeHandler: ResizeEventHandler = () => debouncedCheck();

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler, { passive: true });

    // Initial check
    checkInView();

    scrollListenerRef.current = () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [checkInView]);

  /**
   * Initialize lazy loading
   */
  useEffect(() => {
    if (useIntersectionObserver && window.IntersectionObserver) {
      setupIntersectionObserver();
    } else {
      setupScrollListeners();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollListenerRef.current) {
        scrollListenerRef.current();
      }
    };
  }, [useIntersectionObserver, setupIntersectionObserver, setupScrollListeners]);

  /**
   * Get effect classes based on loading state
   */
  const getEffectClasses = () => {
    if (!effect) return '';

    const baseClass = `lazy-image-${effect}`;
    const loadedClass = state.isLoaded ? `${baseClass}-loaded` : '';

    return cn([baseClass, loadedClass]);
  };

  /**
   * Render placeholder content
   */
  const renderPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }

    if (placeholderSrc) {
      return (
        <img
          src={placeholderSrc}
          alt={alt}
          className={cn([
            'lazy-image-placeholder',
            effect && `lazy-image-${effect}-placeholder`,
            className
          ])}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            ...style
          }}
        />
      );
    }

    if (showShimmer) {
      return (
        <div
          className={cn([
            'lazy-image-shimmer',
            className
          ])}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            ...style
          }}
        />
      );
    }

    return null;
  };

  /**
   * Render the actual image
   */
  const renderImage = () => {
    if (!state.isInView && !state.isLoaded) {
      return null;
    }

    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={cn([
          'lazy-image',
          getEffectClasses(),
          state.isLoaded && 'lazy-image-loaded',
          state.hasError && 'lazy-image-error',
          className
        ])}
        style={{
          opacity: state.isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          ...style
        }}
        {...imgProps}
      />
    );
  };

  return (
    <div
      ref={wrapperRef}
      className={cn([
        'lazy-image-wrapper',
        state.isLoading && 'lazy-image-loading',
        state.isLoaded && 'lazy-image-wrapper-loaded',
        state.hasError && 'lazy-image-wrapper-error',
        wrapperClassName
      ])}
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden'
      }}
    >
      {!state.isLoaded && renderPlaceholder()}
      {renderImage()}
    </div>
  );
}

export default LazyImage;
export { LazyImage };
export type { LazyImageProps };
