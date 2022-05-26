import { FunctionComponent, PropsWithChildren } from 'react';
import { Parallax, ParallaxProps } from 'react-parallax';
import clsxm from '@/utils/helpers/clsxm';
import cloudinary from '@/utils/helpers/cloudinary';

export interface Props extends ParallaxProps {
  overlay?: number;
  height?: number|string;
  containerClassName?: string;
}

const Banner: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    bgClassName,
    overlay,
    height,
    bgImage,
    containerClassName,
    ...otherProps
  } = props;
  return (
    <Parallax
      {...otherProps}
      bgImage={cloudinary(bgImage as string)}
      bgClassName={clsxm('object-cover w-full', bgClassName)}
    >
      <div
        className="flex items-center justify-center absoulte h-full w-full"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
      >
        <div className={containerClassName} style={{ height }}>
          {children}
        </div>
      </div>
    </Parallax>
  );
};

Banner.defaultProps = {
  overlay: 0.35,
  height: '70vh',
  strength: -150,
  containerClassName: 'container flex flex-col items-center justify-center w-full max-w-5xl'
};

export default Banner;
