import { FunctionComponent, useCallback } from 'react';
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
    ...otherProps
  } = props;

  const [loading, setLoading] = useToggler(true);
  const source = cloudinary(src);
  const placeholder = cloudinary(src, placeholderScaling);

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
        className={clsxm('min-h-[50px]', className)}
        useIntersectionObserver
      />
      {loading && (
        <span className={clsxm(styles.spinner, 'absolute')} />
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
  placeholderScaling: 0.15 /* 15% */
};

export default ImageLazy;
