/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { type FunctionComponent, type ReactEventHandler, useCallback, useMemo, useState } from 'react';

import cn from '@/designs/utils/cn';
import useUpdated from '@/packages/hooks/useUpdated';
import { calculateSize, DEFAULT_IMAGE_PLACEHOLDER } from '@/packages/libs/Imaages/utils';

import LazyImage from './LazyLoad/LazyImage';
import type { LazyImageProps } from './LazyLoad/types';
import type { NextImageProps } from './NextImage';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/** @ts-ignore */
export interface ImageProps extends LazyImageProps {
  src?: NextImageProps['src']|null;
  fallbackSrc?: string;
  size?: string|number;
  onClick?: () => void;
}

const Image: FunctionComponent<ImageProps> = (props) => {
  const {
    src,
    fallbackSrc,
    effect = 'blur',
    size,
    style = {},
    className = '',
    wrapperClassName,
    placeholderSrc,
    onError,
    onClick = () => void 0,
    ...lazyloadProps
  } = props;

  const imgSrc = useMemo(() => (
    (src as any)?.src ?? src ?? placeholderSrc ?? DEFAULT_IMAGE_PLACEHOLDER
  ), [src, placeholderSrc]);

  const blurDataURL = (src as any)?.blurDataURL;
  const [source, setSource] = useState<string>(imgSrc);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const placeholder = useMemo(() => {
    const placeholderDefault = blurDataURL ?? DEFAULT_IMAGE_PLACEHOLDER;
    return (!placeholderSrc || placeholderSrc === source) ? placeholderDefault : placeholderSrc;
  }, [source, placeholderSrc, blurDataURL]);

  const { width, height } = useMemo(() => calculateSize(size, {
    height: lazyloadProps.height,
    width: lazyloadProps.width
  }), [lazyloadProps.height, lazyloadProps.width, size]);

  const handleError: ReactEventHandler<HTMLImageElement> = useCallback((event) => {
    if (!hasTriedFallback) {
      setSource(fallbackSrc || placeholder);
      setHasTriedFallback(true);
    }
    onError?.(event);
  }, [onError, placeholder, fallbackSrc, hasTriedFallback]);

  useUpdated(() => {
    setSource(imgSrc);
  }, [imgSrc]);

  return (
    <LazyImage
      useIntersectionObserver
      decoding="async"
      loading="lazy"
      {...lazyloadProps}
      onClick={onClick}
      effect={effect}
      src={(source || null) as any}
      onError={handleError}
      width={width}
      height={height}
      style={{ ...style, height, width }}
      placeholderSrc={placeholderSrc === '' ? undefined : placeholder}
      className={cn([
        'base-image object-contain',
        height ? `h-[${height}px]` : 'h-auto',
        width ? `w-[${width}px]` : 'w-auto',
        className
      ])}
      wrapperClassName={cn([
        'base-image-wrapper',
        height ? `h-[${height}px]` : 'h-auto',
        width ? `w-[${width}px]` : 'w-auto',
        wrapperClassName
      ])}
    />
  );
};

export default Image;
