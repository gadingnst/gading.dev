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

  const refContent = useRef<HTMLDivElement>(null);
  const [renderable, setRenderable] = useToggler();

  useMounted(setRenderable);

  useOutsideClick(() => {
    toggler(false);
  }, [refContent]);

  if (renderable) {
    const Component = (
      <div role="dialog" className={styles['modal']}>
        <div
          ref={refContent}
          className={clsxm([
            styles['modal-container'],
            className
          ])}
        >
          {children}
        </div>
        <figure className={styles['modal-overlay']} />
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
