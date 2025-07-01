'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';

export interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number;
  offset?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  overflow?: boolean;
  transition?: string;
}

const baseClasses = [
  'relative',
  'overflow-hidden'
];

/**
 * Parallax component that creates smooth parallax scrolling effects
 * Similar to react-parallax but optimized for performance
 */
function Parallax(props: ParallaxProps) {
  const {
    children,
    speed = 0.5,
    direction = 'up',
    scale = 1,
    offset = 0,
    disabled = false,
    className,
    style,
    overflow = true,
    transition = 'transform 0.075s ease-out',
    ...restProps
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('');

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;

    /**
     * Calculate parallax transform based on scroll position
     */
    const updateParallax = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const elementBottom = elementTop + elementHeight;

      // Check if element is in viewport
      const inView = elementBottom >= 0 && elementTop <= windowHeight;

      if (!inView) return;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);

      // Calculate movement based on direction and speed
      const movement = (scrollProgress - 0.5) * speed * 100;
      const adjustedMovement = movement + offset;

      let translateX = 0;
      let translateY = 0;

      switch (direction) {
        case 'up':
          translateY = -adjustedMovement;
          break;
        case 'down':
          translateY = adjustedMovement;
          break;
        case 'left':
          translateX = -adjustedMovement;
          break;
        case 'right':
          translateX = adjustedMovement;
          break;
      }

      const scaleValue = scale !== 1 ? scale : 1;
      const transformValue = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleValue})`;

      setTransform(transformValue);
    };

    /**
     * Throttled scroll handler for better performance
     */
    const handleScroll = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      animationId = requestAnimationFrame(updateParallax);
    };

    /**
     * Intersection Observer for performance optimization
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', updateParallax, { passive: true });
            updateParallax();
          } else {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateParallax);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0
      }
    );

    observer.observe(container);

    // Initial calculation
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateParallax);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, direction, scale, offset, disabled]);

  const containerClasses = cn([
    ...baseClasses,
    !overflow && 'overflow-visible',
    className
  ]);

  const innerStyle: CSSProperties = {
    transform: disabled ? undefined : transform,
    transition: disabled ? undefined : transition,
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      {...restProps}
    >
      <div
        className={cn('w-full h-full', !disabled && 'will-change-transform', className)}
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
}

export default Parallax;
