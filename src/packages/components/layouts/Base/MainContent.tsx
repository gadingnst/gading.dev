import { PropsWithChildren } from 'react';

import cn from '@/packages/utils/cn';

interface Props {
  className?: string;
}

function MainContent({ children, className }: PropsWithChildren<Props>) {
  return (
    <main
      className={cn([
        'flex-grow',
        className
      ])}
    >
      {children}
    </main>
  );
}

export default MainContent;
