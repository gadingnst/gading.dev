import { PropsWithChildren } from 'react';

import cxm from '@/packages/utils/cxm';

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
