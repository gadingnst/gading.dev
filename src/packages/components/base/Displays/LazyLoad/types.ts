/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { ImgHTMLAttributes, ReactNode } from 'react';

// Base lazy loading effect types
export type LazyImageEffect = 'blur' | 'black-and-white' | 'opacity' | 'none';

// Scroll position interface
export interface ScrollPosition {
  x: number;
  y: number;
}

// Intersection Observer options
export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

// Track window scroll props
export interface TrackWindowScrollProps {
  /** Current scroll position */
  scrollPosition: ScrollPosition;
  /** Whether scroll tracking is enabled */
  isScrollTracking: boolean;
}

// Scroll tracking configuration
export interface ScrollTrackingConfig {
  /** Throttle delay in milliseconds */
  throttleTime?: number;
  /** Whether to use passive event listeners */
  usePassive?: boolean;
}

// Base props for lazy loading components
export interface LazyLoadBaseProps {
  /** Threshold in pixels before component loads */
  threshold?: number;
  /** Whether to use IntersectionObserver */
  useIntersectionObserver?: boolean;
  /** Custom IntersectionObserver options */
  observerOptions?: IntersectionObserverOptions;
  /** Whether the component should only load once */
  once?: boolean;
  /** Function called before component starts loading */
  beforeLoad?: () => void;
  /** Function called after component has loaded */
  afterLoad?: () => void;
}

// Lazy image specific props
export interface LazyImageProps extends LazyLoadBaseProps, Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError' | 'referrerPolicy'>, Partial<TrackWindowScrollProps> {
  /** Image source URL */
  src: string;
  /** Alternative text for the image */
  alt: string;
  /** Image width */
  width?: number | string;
  /** Image height */
  height?: number | string;
  /** Placeholder image source */
  placeholderSrc?: string;
  /** Visual effect to apply during loading */
  effect?: LazyImageEffect;
  /** Custom placeholder component */
  placeholder?: ReactNode;
  /** Whether to show a shimmer effect while loading */
  showShimmer?: boolean;
  /** Whether to wrap image in a container */
  wrapperClassName?: string;
  /** Custom wrapper styles */
  wrapperStyle?: React.CSSProperties;
  /** Whether to use native lazy loading */
  useNativeLazyLoading?: boolean;
  /** Image loading attribute */
  loading?: 'lazy' | 'eager';
  /** Image decoding attribute */
  decoding?: 'async' | 'sync' | 'auto';
  /** Image sizes attribute for responsive images */
  sizes?: string;
  /** Image srcset attribute for responsive images */
  srcSet?: string;
  /** Cross-origin attribute */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /** Referrer policy */
  referrerPolicy?: React.ImgHTMLAttributes<HTMLImageElement>['referrerPolicy'];
  /** Callback fired when image loads successfully */
  onLoad?: () => void;
  /** Callback fired when image fails to load */
  onError?: () => void;
}

// Lazy load component props - avoiding HTMLAttributes conflict
export interface LazyLoadComponentProps {
  /** Content to lazy load */
  children: ReactNode;
  /** Threshold in pixels before component loads */
  threshold?: number;
  /** Whether to use IntersectionObserver */
  useIntersectionObserver?: boolean;
  /** Custom IntersectionObserver options */
  observerOptions?: IntersectionObserverOptions;
  /** Whether the component should only load once */
  once?: boolean;
  /** Custom className for wrapper */
  className?: string;
  /** Custom styles for wrapper */
  style?: React.CSSProperties;
  /** Placeholder content while not in view */
  placeholder?: ReactNode;
  /** Function called before component starts loading */
  beforeLoad?: () => void;
  /** Function called after component has loaded */
  afterLoad?: () => void;
  /** Function called when loading fails */
  onError?: () => void;
  /** Function called when loading succeeds */
  onLoad?: () => void;
  /** Custom wrapper element type */
  tag?: keyof React.JSX.IntrinsicElements;
  /** Height of the placeholder (helps prevent layout shift) */
  height?: number | string;
  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;
}

// Lazy load state
export interface LazyLoadState {
  isInView: boolean;
  isLoaded: boolean;
  hasError: boolean;
  isLoading: boolean;
}

// Utility function types
export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

// Event handler types
export type ScrollEventHandler = (event: Event) => void;
export type ResizeEventHandler = (event: Event) => void;

// Scroll listener configuration
export interface ScrollListenerConfig {
  throttleTime?: number;
  usePassive?: boolean;
  capture?: boolean;
}

// Global scroll state
export interface GlobalScrollState {
  scrollPosition: ScrollPosition;
  listeners: Set<(position: ScrollPosition) => void>;
  isTracking: boolean;
  throttledHandler?: ThrottledFunction<ScrollEventHandler>;
}
