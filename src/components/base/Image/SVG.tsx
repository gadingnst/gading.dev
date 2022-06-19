/* eslint-disable @next/next/no-img-element */
import clsxm from '@/utils/helpers/clsxm';
import type { ImageProps } from 'next/image';
import { FunctionComponent, SVGAttributes } from 'react';

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

  const width = svgProps.width || size;
  const height = svgProps.height || size;

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
