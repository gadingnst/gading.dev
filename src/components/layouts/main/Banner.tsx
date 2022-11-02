import type { FunctionComponent, PropsWithChildren } from 'react';
import { Parallax, ParallaxProps } from 'react-parallax';
import clsxm from '@/utils/helpers/clsxm';
import styles from './Banner.module.css';
import cloudinary from '@/utils/helpers/cloudinary';
import { IS_DEV } from '@/utils/config';

export interface Props extends ParallaxProps {
  bgImage: string;
  height?: number|string;
  containerClassName?: string;
}

const Banner: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    bgClassName,
    height,
    bgImage,
    containerClassName,
    ...otherProps
  } = props;
  return (
    <Parallax
      {...otherProps}
      lazy
      bgImage={IS_DEV ? bgImage : cloudinary(bgImage, { scale: 0.75 })}
      bgClassName={clsxm('object-cover w-full select-none', bgClassName)}
    >
      <div className={clsxm(styles['parallax-banner'])}>
        <div className={containerClassName} style={{ height }}>
          {children}
        </div>
      </div>
    </Parallax>
  );
};

Banner.defaultProps = {
  height: '70vh',
  strength: -150,
  containerClassName: 'container flex flex-col items-center justify-center w-full max-w-5xl'
};

export default Banner;
