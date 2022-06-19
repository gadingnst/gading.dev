import type { FunctionComponent, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import clsxm from '@/utils/helpers/clsxm';
import styles from './index.module.css';

export interface Props {
  className?: string;
}

const Content: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className } = props;
  return (
    <motion.main
      className={clsxm(styles.content, className)}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', duration: 0.75, delay: 0.2 }}
    >
      {children}
    </motion.main>
  );
};

Content.defaultProps = {
  className: ''
};

export default Content;
