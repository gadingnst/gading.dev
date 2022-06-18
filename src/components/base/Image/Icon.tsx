/* eslint-disable @next/next/no-img-element */
import type { ImageProps } from 'next/image';
import { FunctionComponent, useCallback, useMemo, useRef } from 'react';
import ReactSVG, { Props as ReactSVGProps } from 'react-inlinesvg';
import { DEFAULT_PLACEHOLDER } from './index';

export type Props = ReactSVGProps & {
  src: ImageProps['src'];
  size?: number;
  alt?: string;
  color?: string;
  placeholderSrc?: string;
};

const Icon: FunctionComponent<Props> = (props) => {
  const {
    src,
    size,
    alt,
    color,
    placeholderSrc,
    ...svgProps
  } = props;

  const {
    className,
    width,
    height,
    fill,
    stroke
  } = svgProps;

  const imgRef = useRef<HTMLImageElement>(null);

  const placeholder = useMemo(() => {
    return placeholderSrc || DEFAULT_PLACEHOLDER;
  }, [placeholderSrc]);

  const source = useMemo(() => {
    return (src as any)?.src || src || placeholder;
  }, [src, placeholder]);

  const onError = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.src = placeholder;
    }
  }, []);

  return (
    <ReactSVG
      cacheRequests
      {...svgProps}
      fill={fill ?? color}
      stroke={stroke ?? color}
      src={source}
      className={className}
      width={width ?? size}
      height={height ?? size}
    >
      <img
        ref={imgRef}
        src={source}
        onError={onError}
        className={className}
        width={width ?? size}
        height={height ?? size}
        alt={alt}
      />
    </ReactSVG>
  );
};

Icon.defaultProps = {
  alt: '',
  placeholderSrc: '',
  onClick: () => void 0
};

export default Icon;
