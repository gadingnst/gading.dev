import type { FunctionComponent, PropsWithChildren } from 'react';
import { LazyLoadComponent, LazyLoadComponentProps } from 'react-lazy-load-image-component';

export type Props = LazyLoadComponentProps;

const LazyLoad: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <LazyLoadComponent {...otherProps}>
      {children}
    </LazyLoadComponent>
  );
};

export default LazyLoad;
