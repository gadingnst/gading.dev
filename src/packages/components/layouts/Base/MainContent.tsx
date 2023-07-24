import cxm from '@/packages/utils/cxm';
import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

function MainContent({ children, className }: PropsWithChildren<Props>) {
  return (
    <main
      className={cxm([
        'flex-grow',
        className
      ])}
    >
      {children}
    </main>
  );
}

export default MainContent;
