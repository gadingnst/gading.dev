/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { type ReactEventHandler, useCallback, useMemo, useState } from 'react';

import cn from '@/designs/utils/cn';
import trackWindowScroll from '@/packages/components/base/Displays/LazyLoad/trackWindowScroll';
import useDelayedAction from '@/packages/hooks/useDelayedAction';
import useUpdated from '@/packages/hooks/useUpdated';
import cloudinary from '@/packages/libs/Cloudinary/utils';
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
  scaling?: number;
  delayLoad?: number;
  placeholderScaling?: number;
  onClick?: () => void;
}

function BaseImage(props: ImageProps) {
  const {
    src,
    fallbackSrc,
    effect = 'blur',
    size,
    style = {},
    className = '',
    wrapperClassName,
    placeholderSrc,
    scaling = 1,
    delayLoad,
    placeholderScaling,
    afterLoad,
    onError,
    onClick = () => void 0,
    ...lazyloadProps
  } = props;

  const withDelay = useDelayedAction(delayLoad);

  const imgSrc = useMemo(() => (
    (src as any)?.src ?? src ?? placeholderSrc ?? DEFAULT_IMAGE_PLACEHOLDER
  ), [src, placeholderSrc]);

  const initialSource = useMemo(() => {
    return scaling < 1
      ? cloudinary(imgSrc, { scale: scaling })
      : imgSrc;
  }, [scaling, imgSrc]);

  const blurDataURL = (src as any)?.blurDataURL;
  const [source, setSource] = useState<string>(initialSource);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const placeholder = useMemo(() => {
    const _cloudinaryPlaceholder = cloudinary(imgSrc, { scale: placeholderScaling, placeholder: true });
    const placeholderDefault = blurDataURL ?? DEFAULT_IMAGE_PLACEHOLDER;
    return placeholderSrc === source ? placeholderDefault : (placeholderSrc || _cloudinaryPlaceholder);
  }, [imgSrc, placeholderScaling, blurDataURL, placeholderSrc, source]);

  const { width, height } = useMemo(() => calculateSize(size, {
    height: lazyloadProps.height,
    width: lazyloadProps.width
  }), [lazyloadProps.height, lazyloadProps.width, size]);

  const handleAfterLoad = useCallback(() => {
    withDelay(() => {
      afterLoad?.();
    });
  }, [afterLoad, withDelay]);

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
      afterLoad={handleAfterLoad}
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

const Image = trackWindowScroll(BaseImage);

export default Image;
