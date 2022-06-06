import { FunctionComponent, useCallback, useMemo } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import Zoom from 'react-medium-image-zoom';
import { useToggler } from '@/hooks';
import cloudinary from '@/utils/helpers/cloudinary';
import clsxm from '@/utils/helpers/clsxm';
import { IS_DEV } from '@/utils/config';
import styles from './lazy.module.css';
import 'react-medium-image-zoom/dist/styles.css';

interface Props extends LazyLoadImageProps {
  src: string;
  zoomable?: boolean;
  scaling?: number;
  placeholderScaling?: number;
}

const ImageLazy: FunctionComponent<Props> = (props) => {
  const {
    src,
    zoomable,
    height,
    width,
    placeholderScaling,
    style,
    className,
    afterLoad,
    scaling = 1,
    ...otherProps
  } = props;

  const [loading, setLoading] = useToggler(true);

  const placeholder = useMemo(() => {
    return cloudinary(src, { scale: placeholderScaling, placeholder: true });
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
        {...otherProps}
        src={IS_DEV ? src : source}
        placeholderSrc={IS_DEV ? src : placeholder}
        style={{ ...style, height, width }}
        effect="blur"
        afterLoad={handleLoad}
        className={clsxm('min-h-[50px] select-none', className)}
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

ImageLazy.defaultProps = {
  className: '',
  style: {},
  zoomable: false,
  wrapperClassName: '',
  scaling: 1,
  placeholderScaling: 0.05 /* 5% */
};

export default ImageLazy;
