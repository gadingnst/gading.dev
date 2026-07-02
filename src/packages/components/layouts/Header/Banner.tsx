'use client';

import { PropsWithChildren, useMemo } from 'react';

import { IS_DEV } from '@/configs/sites';
import cn from '@/designs/utils/cn';
import Parallax, { ParallaxProps } from '@/packages/components/base/Displays/Parallax';
import cloudinary from '@/packages/libs/Cloudinary/utils';

interface Props extends ParallaxProps {
  bgImage: string;
  height?: number|string;
  containerClassName?: string;
}

function Banner(props: PropsWithChildren<Props>) {
  const {
    children,
    bgClassName,
    height = '70vh',
    bgImage,
    containerClassName,
    ...otherProps
  } = props;

  const isDefaultBanner = useMemo(() => {
    return bgImage && bgImage.includes('default-banners');
  }, [bgImage]);

  const imageUrl = useMemo(() => {
    if (isDefaultBanner) return undefined;
    if (IS_DEV) return bgImage;
    return cloudinary(bgImage, { scale: 0.75 });
  }, [bgImage, isDefaultBanner]);

  return (
    <div
      className={cn([
        'relative overflow-hidden',
        isDefaultBanner ? 'dark-mesh-gradient' : 'bg-gradient-to-tr from-primary to-accent'
      ])}
    >
      {/* Subtle grid pattern overlay for default banners (tech aesthetic) */}
      {isDefaultBanner && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
      )}

      <Parallax
        strength={isDefaultBanner ? 0 : 300}
        // blur={{ min: -5, max: 15 }}
        {...otherProps}
        bgImage={imageUrl}
        bgClassName={cn([
          'object-cover w-full select-none ',
          bgClassName
        ])}
      >
        <figure
          className={cn([
            'absolute inset-0 z-[1]',
            isDefaultBanner ? 'bg-black/15' : 'bg-black/35'
          ])}
        />
        <div className={cn(['relative z-10', containerClassName])} style={{ height }}>
          {children}
        </div>
      </Parallax>
    </div>
  );
}

export default Banner;
