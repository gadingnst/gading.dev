'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { CSSProperties } from 'react';

import cn from '@/designs/utils/cn';
import Parallax, { ParallaxProps } from '@/packages/components/base/Images/Parallax';

export interface ParallaxImageProps extends Omit<ParallaxProps, 'children'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'eager' | 'lazy';
  unoptimized?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  imageClassName?: string;
  imageStyle?: CSSProperties;
}

/**
 * ParallaxImage component that combines Next.js Image optimization
 * with smooth parallax scrolling effects
 */
function ParallaxImage(props: ParallaxImageProps) {
  const {
    src,
    alt,
    width,
    height,
    fill = true,
    priority = false,
    quality = 75,
    sizes,
    placeholder,
    blurDataURL,
    objectFit = 'cover',
    objectPosition = 'center',
    loading = 'lazy',
    unoptimized = false,
    overlay = false,
    overlayClassName,
    overlayStyle,
    imageClassName,
    imageStyle,
    className,
    style,
    ...parallaxProps
  } = props;

  const imageClasses = cn([
    'transition-transform duration-300',
    imageClassName
  ]);

  const overlayClasses = cn([
    'absolute inset-0 bg-black/20 transition-opacity duration-300',
    overlayClassName
  ]);

  const imageProps: Partial<ImageProps> = {
    src,
    alt,
    quality,
    priority,
    loading,
    unoptimized,
    placeholder,
    blurDataURL,
    sizes,
    className: imageClasses,
    style: {
      objectFit,
      objectPosition,
      ...imageStyle
    }
  };

  // Add dimensions if not using fill
  if (!fill && width && height) {
    imageProps.width = width;
    imageProps.height = height;
  } else {
    imageProps.fill = true;
  }

  return (
    <Parallax
      className={cn(['relative', className])}
      style={style}
      {...parallaxProps}
    >
      <Image {...imageProps as ImageProps} alt={alt} />
      {overlay && (
        <div
          className={overlayClasses}
          style={overlayStyle}
        />
      )}
    </Parallax>
  );
}

export default ParallaxImage;
