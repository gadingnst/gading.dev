import { FunctionComponent, useMemo } from 'react';
import Image, { Props as ImageProps } from '@/components/Image';

type Size = {
  width: number;
  height: number;
};

export type Props = ImageProps & {
  size?: Size|number;
};

const Icon: FunctionComponent<Props> = (props) => {
  const { size, alt } = props;

  const imgSize = useMemo(() => {
    return typeof size === 'number'
      ? { width: size, height: size }
      : size;
  }, [size]);

  return (
    <Image
      inline
      alt={alt}
      width={`${imgSize?.width}px`}
      height={`${imgSize?.height}px`}
      {...props as any}
    />
  );
};

Icon.defaultProps = {
  size: 32
};

export default Icon;
