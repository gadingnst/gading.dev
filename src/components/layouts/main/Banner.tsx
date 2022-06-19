import type { FunctionComponent, PropsWithChildren } from 'react';
import { Parallax, ParallaxProps } from 'react-parallax';
import { motion } from 'framer-motion';
import clsxm from '@/utils/helpers/clsxm';

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
      bgImage={bgImage}
      bgClassName={clsxm('object-cover w-full select-none', bgClassName)}
    >
      <motion.div
        initial={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
        animate={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
        transition={{ type: 'spring', duration: 1.25 }}
        className="flex items-center justify-center absoulte h-full w-full"
      >
        <div className={containerClassName} style={{ height }}>
          {children}
        </div>
      </motion.div>
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
