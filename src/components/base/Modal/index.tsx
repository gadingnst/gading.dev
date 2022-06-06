import { FunctionComponent, PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMounted, useToggler, useOutsideClick } from '@/hooks';
import clsxm from '@/utils/helpers/clsxm';
import styles from './index.module.css';

export interface Props {
  show: boolean;
  className?: string;
  toggler: (value?: boolean|any) => void;
}

const Modal: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    show,
    className,
    children,
    toggler
  } = props;

  const [renderable, setRenderable] = useToggler();
  const refContent = useRef<HTMLDivElement>(null);

  useMounted(setRenderable);

  useOutsideClick(() => {
    toggler(false);
  }, [refContent]);

  if (renderable) {
    const Component = (
      <div role="dialog" className={styles['modal-overlay']}>
        <div
          ref={refContent}
          className={clsxm([
            styles['modal-container'],
            className
          ])}
        >
          {children}
        </div>
      </div>
    );
    return show ? createPortal(Component, document.body) : null;
  }

  return null;
};

Modal.defaultProps = {
  className: ''
};

export default Modal;
