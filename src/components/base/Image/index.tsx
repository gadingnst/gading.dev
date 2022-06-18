import NextImage, { ImageProps } from 'next/image';
import clsxm from '@/utils/helpers/clsxm';

export type Props = ImageProps & {
  src: ImageProps['src'];
  placeholderSrc?: string;
  classNameWrapper?: string;
};

export const DEFAULT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

const Image = (props: Props) => {
  const {
    classNameWrapper,
    ...nextImageProps
  } = props;

  const { src } = nextImageProps;
  const width = nextImageProps.width || (src as any)?.width;
  const height = nextImageProps.height || (src as any)?.height;

  const Component = (
    <NextImage
      blurDataURL={(src as any)?.blurDataURL ? undefined : DEFAULT_PLACEHOLDER}
      {...nextImageProps}
      width={width}
      height={height}
    />
  );

  return !classNameWrapper ? Component : (
    <div
      className={clsxm('inline-block overflow-hidden', classNameWrapper)}
      style={{ width, height }}
    >
      {Component}
    </div>
  );
};

Image.defaultProps = {
  className: '',
  classNameWrapper: '',
  placeholderSrc: ''
};

export default Image;
