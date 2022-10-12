import { FunctionComponent, PropsWithChildren, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMounted, useToggler, useOutsideClick, useUpdated } from '@/hooks';
import clsxm from '@/utils/helpers/clsxm';
import styles from './index.module.css';
import useActiveModals from '@/hooks/stores/useActiveModal';

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

  const modalId = useId();
  const refContent = useRef<HTMLDivElement>(null);
  const [renderable, setRenderable] = useToggler();
  const [, setActiveModals] = useActiveModals();

  useMounted(setRenderable);

  useOutsideClick(() => {
    toggler(false);
  }, [refContent]);

  useUpdated(() => {
    if (show) {
      setActiveModals((prev) => [...prev, modalId]);
    }
    return () => {
      setActiveModals((prev) => prev.filter((id => id !== modalId)));
    };
  }, [show]);

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
