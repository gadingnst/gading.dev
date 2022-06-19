import type { ImageProps } from 'next/image';
import { FunctionComponent, useCallback, useMemo } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import Zoom from 'react-medium-image-zoom';
import { useToggler } from '@/hooks';
import cloudinary from '@/utils/helpers/cloudinary';
import clsxm from '@/utils/helpers/clsxm';
import { IS_DEV } from '@/utils/config';
import styles from './index.module.css';
import 'react-medium-image-zoom/dist/styles.css';

//@ts-ignore
interface Props extends LazyLoadImageProps {
  src: ImageProps['src'];
  zoomable?: boolean;
  scaling?: number;
  placeholderScaling?: number;
}

export const DEFAULT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

const Image: FunctionComponent<Props> = (props) => {
  const {
    src: srcProps,
    zoomable,
    placeholderScaling,
    scaling = 1,
    ...lazyloadProps
  } = props;

  const {
    height,
    width,
    style,
    className,
    wrapperClassName,
    afterLoad
  } = lazyloadProps;

  const src = (srcProps as any)?.src ?? srcProps;
  const blurDataURL = (srcProps as any)?.blurDataURL;
  const [loading, setLoading] = useToggler(true);

  const placeholder = useMemo(() => {
    const placeholderSrc = cloudinary(src, { scale: placeholderScaling, placeholder: true });
    const placeholderDefault = blurDataURL ?? DEFAULT_PLACEHOLDER;
    return placeholderSrc === src ? placeholderDefault : placeholderSrc;
  }, [src, placeholderScaling]);

  const source = useMemo(() => {
    return scaling < 1
      ? cloudinary(src, { scale: scaling })
      : src;
  }, [src, scaling]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    afterLoad?.();
  }, []);

  const ImageComponent = (
    <span className="w-full flex relative items-center justify-center">
      <LazyLoadImage
        {...lazyloadProps}
        src={IS_DEV ? src : source}
        placeholderSrc={IS_DEV ? src : placeholder}
        style={{ ...style, height, width }}
        effect="blur"
        afterLoad={handleLoad}
        className={clsxm('min-h-[50px] select-none', className)}
        wrapperClassName={clsxm(blurDataURL && loading ? styles.blur : '', wrapperClassName)}
        useIntersectionObserver
      />
      {loading && (
        <span className={clsxm(styles.loader, 'absolute')} />
      )}
    </span>
  );

  if (zoomable) {
    return (
      <Zoom
        overlayBgColorEnd="rgba(0, 0, 0, 0.75)"
        overlayBgColorStart="rgba(0, 0, 0, 0)"
        wrapElement="span"
        wrapStyle={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {ImageComponent}
      </Zoom>
    );
  }

  return ImageComponent;
};

Image.defaultProps = {
  className: '',
  style: {},
  zoomable: false,
  scaling: 1,
  placeholderScaling: 0.01 /* 1% */
};

export default Image;
