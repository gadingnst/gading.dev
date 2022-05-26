import { FunctionComponent, PropsWithChildren } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import styles from './index.module.css';

export interface Props {
  className?: string;
}

const Content: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className } = props;
  return (
    <main className={clsxm(styles.content, className)}>
      {children}
    </main>
  );
};

Content.defaultProps = {
  className: ''
};

export default Content;
