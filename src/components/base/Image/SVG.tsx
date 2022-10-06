import type { ImageProps } from 'next/image';
import { FunctionComponent, SVGAttributes, useMemo } from 'react';
import clsxm from '@/utils/helpers/clsxm';

export interface Props extends SVGAttributes<SVGElement> {
  src: ImageProps['src'];
  size?: number;
  className?: string;
  onClick?: () => void;
}

const SVG: FunctionComponent<Props> = (props) => {
  const {
    src: SVGComponent,
    size,
    className,
    onClick,
    ...svgProps
  } = props;

  const { width, height } = useMemo(() => ({
    width: svgProps.width || size,
    height: svgProps.height || size
  }), [svgProps.width, svgProps.height, size]);

  return (
    <span
      className={clsxm('flex justify-center items-center', className)}
      style={{ width, height }}
      onClick={onClick}
    >
      {/* @ts-ignore */}
      <SVGComponent
        {...svgProps}
        width={width || size}
        height={height || size}
      />
    </span>
  );
};

SVG.defaultProps = {
  className: '',
  size: 32,
  onClick: () => void 0
};

export default SVG;
