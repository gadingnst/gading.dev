import type { ImageProps } from 'next/image';
import { FunctionComponent, ReactEventHandler, useCallback, useMemo, useState } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import Zoom from 'react-medium-image-zoom';
import { useDelayedAction, useToggler } from '@/hooks';
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
  delayLoad?: number;
  placeholderScaling?: number;
}

export const DEFAULT_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

const Image: FunctionComponent<Props> = (props) => {
  const {
    src: srcProps,
    zoomable,
    placeholderScaling,
    scaling = 1,
    delayLoad = 150,
    ...lazyloadProps
  } = props;

  const {
    height,
    width,
    style,
    className,
    wrapperClassName,
    afterLoad,
    onError
  } = lazyloadProps;

  const blurDataURL = (srcProps as any)?.blurDataURL;
  const [loading, setLoading] = useToggler(true);
  const withDelay = useDelayedAction(delayLoad);

  const src = useMemo(() => (srcProps as any)?.src ?? srcProps, [srcProps]);

  const placeholder = useMemo(() => {
    const placeholderSrc = cloudinary(src, { scale: placeholderScaling, placeholder: true });
    const placeholderDefault = blurDataURL ?? DEFAULT_PLACEHOLDER;
    return placeholderSrc === src ? placeholderDefault : placeholderSrc;
  }, [src, placeholderScaling, blurDataURL]);

  const initialSource = useMemo(() => {
    return scaling < 1
      ? cloudinary(src, { scale: scaling })
      : src;
  }, [src, scaling]);

  const [source, setSource] = useState<string>(initialSource);

  const handleAfterLoad = useCallback(() => {
    withDelay(() => {
      setLoading(false);
      afterLoad?.();
    });
  }, []);

  const handleError: ReactEventHandler<HTMLImageElement> = useCallback((event) => {
    setSource(DEFAULT_PLACEHOLDER);
    onError?.(event);
  }, [onError, placeholder]);

  const ImageComponent = (
    <span className="flex relative items-center justify-center">
      <LazyLoadImage
        useIntersectionObserver
        decoding="async"
        loading="lazy"
        {...lazyloadProps}
        src={IS_DEV ? src : source}
        placeholderSrc={IS_DEV ? src : placeholder}
        style={{ ...style, height, width }}
        effect="blur"
        afterLoad={handleAfterLoad}
        className={clsxm('min-h-[50px] select-none', className)}
        onError={handleError}
        wrapperClassName={clsxm(loading ? styles.blur : '', wrapperClassName)}
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
