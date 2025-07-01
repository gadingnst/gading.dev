'use client';

import type { CSSProperties, ReactNode } from 'react';

import cn from '@/designs/utils/cn';

import Parallax, { type ParallaxProps } from './Parallax';
import ParallaxImage from './ParallaxImage';

export interface ParallaxLayer {
  image?: string;
  speed?: number;
  opacity?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  expanded?: boolean;
}

export interface ParallaxBannerProps extends Omit<ParallaxProps, 'children'> {
  layers: ParallaxLayer[];
  height?: string | number;
  children?: ReactNode;
}

const bannerClasses = [
  'relative',
  'overflow-hidden',
  'flex',
  'items-center',
  'justify-center'
];

const contentClasses = [
  'relative',
  'z-10',
  'flex',
  'items-center',
  'justify-center',
  'w-full',
  'h-full'
];

/**
 * ParallaxBanner component that creates layered parallax effects
 * Similar to react-parallax ParallaxBanner but with better performance
 */
function ParallaxBanner(props: ParallaxBannerProps) {
  const {
    layers = [],
    height = '100vh',
    children,
    className,
    style,
    ...parallaxProps
  } = props;

  const bannerStyle: CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...style
  };

  const containerClasses = cn([
    ...bannerClasses,
    className
  ]);

  return (
    <div
      className={containerClasses}
      style={bannerStyle}
    >
      {/* Render parallax layers */}
      {layers.map((layer, index) => {
        const {
          image,
          speed = 0.5,
          opacity = 1,
          children: layerChildren,
          className: layerClassName,
          style: layerStyle,
          expanded = true
        } = layer;

        const layerClassNames = cn([
          'absolute inset-0 w-full h-full',
          expanded && 'scale-110', // Prevent white edges during parallax
          layerClassName
        ]);

        const layerInlineStyle: CSSProperties = {
          opacity,
          zIndex: layers.length - index, // Back to front layering
          ...layerStyle
        };

        if (image) {
          return (
            <Parallax
              key={`layer-${index}`}
              className={layerClassNames}
              style={layerInlineStyle}
              speed={speed}
              {...parallaxProps}
            >
              <ParallaxImage
                src={image}
                alt={`Parallax layer ${index + 1}`}
                fill
                className="w-full h-full"
                objectFit="cover"
                priority={index === 0} // Prioritize first layer
              />
              {layerChildren}
            </Parallax>
          );
        }

        if (layerChildren) {
          return (
            <Parallax
              key={`layer-${index}`}
              className={layerClassNames}
              style={layerInlineStyle}
              speed={speed}
              {...parallaxProps}
            >
              {layerChildren}
            </Parallax>
          );
        }

        return null;
      })}

      {/* Main content */}
      {children && (
        <div className={cn(contentClasses)}>
          {children}
        </div>
      )}
    </div>
  );
}

export default ParallaxBanner;
