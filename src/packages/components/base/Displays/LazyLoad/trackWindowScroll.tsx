'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import type {
  ScrollPosition,
  ScrollTrackingConfig,
  TrackWindowScrollProps } from './types';

// Extended options for backward compatibility
interface TrackWindowScrollOptions extends ScrollTrackingConfig {
  /** Whether to track horizontal scroll */
  trackHorizontal?: boolean;
  /** Whether to track vertical scroll */
  trackVertical?: boolean;
}

// Global scroll tracking state
let globalScrollPosition: ScrollPosition = { x: 0, y: 0 };
// eslint-disable-next-line no-unused-vars
const scrollListeners: Set<(position: ScrollPosition) => void> = new Set();
let isGlobalListenerAttached = false;
let throttleTimeout: NodeJS.Timeout | null = null;

/**
 * Global scroll handler with throttling
 */
function handleGlobalScroll(throttleTime: number = 300) {
  if (throttleTimeout) return;

  throttleTimeout = setTimeout(() => {
    const newPosition = {
      x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };

    globalScrollPosition = newPosition;

    // Notify all listeners
    scrollListeners.forEach(listener => {
      listener(newPosition);
    });

    throttleTimeout = null;
  }, throttleTime);
}

/**
 * Attach global scroll listener
 */
function attachGlobalScrollListener(throttleTime: number, usePassive: boolean) {
  if (isGlobalListenerAttached || typeof window === 'undefined') return;

  const scrollHandler = () => handleGlobalScroll(throttleTime);

  window.addEventListener('scroll', scrollHandler, { passive: usePassive });
  window.addEventListener('resize', scrollHandler, { passive: usePassive });

  isGlobalListenerAttached = true;

  // Initial position
  globalScrollPosition = {
    x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  };
}

/**
 * Detach global scroll listener
 */
function detachGlobalScrollListener() {
  if (!isGlobalListenerAttached || typeof window === 'undefined') return;

  window.removeEventListener('scroll', () => handleGlobalScroll());
  window.removeEventListener('resize', () => handleGlobalScroll());

  isGlobalListenerAttached = false;

  if (throttleTimeout) {
    clearTimeout(throttleTimeout);
    throttleTimeout = null;
  }
}

/**
 * Hook for tracking window scroll position
 */
export function useWindowScrollPosition(options: TrackWindowScrollOptions = {}) {
  const {
    throttleTime = 300,
    usePassive = true,
    trackHorizontal = true,
    trackVertical = true
  } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(globalScrollPosition);
  const [isScrollTracking, setIsScrollTracking] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const listenerRef = useRef<(position: ScrollPosition) => void | null>(null);

  const updateScrollPosition = useCallback((position: ScrollPosition) => {
    const filteredPosition = {
      x: trackHorizontal ? position.x : scrollPosition.x,
      y: trackVertical ? position.y : scrollPosition.y
    };
    setScrollPosition(filteredPosition);
  }, [trackHorizontal, trackVertical, scrollPosition.x, scrollPosition.y]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Attach global listener if not already attached
    attachGlobalScrollListener(throttleTime, usePassive);

    // Create listener function
    listenerRef.current = updateScrollPosition;

    // Add to listeners set
    scrollListeners.add(updateScrollPosition);
    setIsScrollTracking(true);

    // Set initial position
    setScrollPosition(globalScrollPosition);

    return () => {
      // Remove from listeners set
      if (listenerRef.current) {
        scrollListeners.delete(listenerRef.current);
      }

      // If no more listeners, detach global listener
      if (scrollListeners.size === 0) {
        detachGlobalScrollListener();
      }

      setIsScrollTracking(false);
    };
  }, [throttleTime, usePassive, updateScrollPosition]);

  return { scrollPosition, isScrollTracking };
}

/**
 * Higher-order component that adds scroll position tracking to any component
 */
function trackWindowScroll<P extends object>(
  WrappedComponent: React.ComponentType<P & TrackWindowScrollProps>,
  options: TrackWindowScrollOptions = {}
) {
  const TrackedComponent = React.forwardRef<HTMLElement, P>((props, ref) => {
    const { scrollPosition, isScrollTracking } = useWindowScrollPosition(options);

    return (
      <WrappedComponent
        {...(props as P)}
        ref={ref}
        scrollPosition={scrollPosition}
        isScrollTracking={isScrollTracking}
      />
    );
  });

  TrackedComponent.displayName = `trackWindowScroll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return TrackedComponent;
}

export default trackWindowScroll;
