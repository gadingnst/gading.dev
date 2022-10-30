import type { FunctionComponent, PropsWithChildren } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import styles from './index.module.css';

export interface Props {
  className?: string;
}

const Content: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className } = props;
  return (
    <main
      className={clsxm(
        styles.content,
        className,
        'opacity-0 animate-[y-b-25_.35s_ease-in-out_.3s_1_normal_forwards]'
      )}
    >
      {children}
    </main>
  );
};

Content.defaultProps = {
  className: ''
};

export default Content;
