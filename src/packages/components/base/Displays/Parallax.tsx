/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';

export interface ParallaxProps {
  /** Background image URL for parallax effect */
  bgImage?: string;
  /** Alt text for background image */
  bgImageAlt?: string;
  /** Background image sizes attribute */
  bgImageSize?: string;
  /** Background image srcset attribute */
  bgImageSrcSet?: string;
  /** Custom style for the component */
  style?: React.CSSProperties;
  /** Additional style for background image */
  bgStyle?: React.CSSProperties;
  /** Custom className for background image */
  bgClassName?: string;
  /** Custom className for content container */
  contentClassName?: string;
  /** Background image specific styles */
  bgImageStyle?: React.CSSProperties;
  /** Parallax effect strength in pixels */
  strength?: number;
  /** Blur effect - number or object with min/max values */
  blur?: number | { min: number; max: number };
  /** Function to render custom layer based on scroll percentage */
  // eslint-disable-next-line no-unused-vars
  renderLayer?: (percentage: number) => React.ReactNode;
  /** Disable parallax effect */
  disabled?: boolean;
  /** Additional className for the component */
  className?: string;
  /** Parent element for nested scrolling */
  parent?: Element | null;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Background component for custom parallax elements
 */
export interface BackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function Background({ className, children }: BackgroundProps) {
  return (
    <div
      className={cn([
        'absolute inset-0 overflow-hidden',
        className
      ])}
      style={{
        transform: 'translate3d(0, 0, 0)',
        zIndex: -1
      }}
    >
      {children}
    </div>
  );
}

/**
 * Parallax component that creates smooth parallax scrolling effects
 * Based on react-parallax library implementation
 */
export function Parallax({
  bgImage,
  bgImageAlt = '',
  bgImageSize,
  bgImageSrcSet,
  style,
  bgStyle,
  bgClassName,
  contentClassName = 'react-parallax-content',
  bgImageStyle,
  strength = 100,
  blur = 0,
  renderLayer,
  disabled = false,
  className,
  parent,
  children
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);
  const [bgTransform, setBgTransform] = useState('translate3d(0, 0, 0)');
  const [bgBlur, setBgBlur] = useState(0);

  /**
   * Calculate scroll percentage and update transforms
   */
  const updateParallax = useCallback(() => {
    if (!containerRef.current || disabled) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate visibility percentage
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Element is visible when it's between -elementHeight and windowHeight
    const visibleRange = windowHeight + elementHeight;
    const currentPosition = windowHeight - elementTop;
    const scrollPercentage = Math.max(0, Math.min(1, currentPosition / visibleRange));

    setPercentage(scrollPercentage);

    // Calculate parallax transform
    const yPos = -(scrollPercentage - 0.5) * strength;
    setBgTransform(`translate3d(0, ${yPos}px, 0)`);

    // Calculate blur if dynamic
    if (typeof blur === 'object') {
      const blurValue = blur.min + (blur.max - blur.min) * scrollPercentage;
      setBgBlur(blurValue);
    } else {
      setBgBlur(blur);
    }
  }, [strength, blur, disabled]);

  /**
   * Handle scroll events
   */
  useEffect(() => {
    if (disabled) return;

    const scrollElement = parent || window;
    const handleScroll = () => {
      requestAnimationFrame(updateParallax);
    };

    // Initial calculation
    updateParallax();

    // Add scroll listener
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateParallax, disabled, parent]);

  /**
   * Generate background image styles
   */
  const backgroundImageStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '120%', // Extra height for parallax movement
    objectFit: 'cover',
    transform: bgTransform,
    filter: bgBlur ? `blur(${Math.abs(bgBlur)}px)` : undefined,
    zIndex: -1,
    ...bgImageStyle,
    ...bgStyle
  };

  return (
    <div
      ref={containerRef}
      className={cn([
        'relative overflow-hidden',
        className
      ])}
      style={{
        transform: 'translate3d(0, 0, 0)',
        ...style
      }}
    >
      {/* Background Image */}
      {bgImage && (
        <img
          src={bgImage}
          alt={bgImageAlt}
          sizes={bgImageSize}
          srcSet={bgImageSrcSet}
          className={cn([
            'absolute inset-0 w-full h-full object-cover',
            bgClassName
          ])}
          style={backgroundImageStyles}
          loading="lazy"
        />
      )}

      {/* Custom Render Layer */}
      {renderLayer && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 0 }}
        >
          {renderLayer(percentage)}
        </div>
      )}

      {/* Content */}
      <div
        className={cn([
          'relative z-10',
          contentClassName
        ])}
      >
        {children}
      </div>
    </div>
  );
}

// Default export
export default Parallax;
