import { PropsWithChildren, ReactNode } from 'react';

import cn from '@/designs/utils/cn';

interface Props {
  id?: string;
  title: string;
  description?: ReactNode;
  className?: string;
}

/** one titled block of a docs page */
function DocsSection({ id, title, description, className, children }: PropsWithChildren<Props>) {
  return (
    <section id={id} className={cn(['mb-14 scroll-mt-28 md:mb-16', className])}>
      <h2 className="font-display text-2xl font-bold tracking-tight md:text-[32px]">{title}</h2>
      {description && <div className="mt-1.5 max-w-3xl text-muted">{description}</div>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default DocsSection;
