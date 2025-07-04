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

  const imageUrl = useMemo(() => {
    if (IS_DEV) return bgImage;
    return cloudinary(bgImage, { scale: 0.75 });
  }, [bgImage]);

  return (
    <div className="bg-gradient-to-tr from-primary to-accent">
      <Parallax
        strength={300}
        blur={{ min: -5, max: 15 }}
        {...otherProps}
        bgImage={imageUrl}
        bgClassName={cn([
          'object-cover w-full select-none ',
          bgClassName
        ])}
      >
        <div className={containerClassName} style={{ height }}>
          {children}
        </div>
      </Parallax>
    </div>
  );
}

export default Banner;
