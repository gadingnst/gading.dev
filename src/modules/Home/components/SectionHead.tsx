import { ReactNode } from 'react';

import NextLink from '@/packages/components/base/Navigations/NextLink';

interface Props {
  title: string;
  /** hand-written note next to the title */
  hand?: ReactNode;
  description: string;
  linkLabel: string;
  linkHref: string;
}

function SectionHead({ title, hand, description, linkLabel, linkHref }: Props) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="font-display text-[26px] font-bold tracking-[-0.02em] sm:text-[32px]">
          {title}
          {hand}
        </h2>
        <p className="mt-1 text-[15px] text-muted">{description}</p>
      </div>
      <NextLink
        withCurrentLocale
        href={linkHref}
        className="whitespace-nowrap text-sm font-semibold text-brand hover:underline underline-offset-4"
      >
        {linkLabel}
      </NextLink>
    </div>
  );
}

export default SectionHead;
