'use client';

import dynamic from 'next/dynamic';
import { PropsWithChildren, ReactNode, Suspense } from 'react';

import { ContentMeta } from '@/modules/ContentParser/services/content-parser';

interface ContentInteractionProps {
  path: string;
  meta: ContentMeta;
  identifier: string;
}

interface ContentSuspenseProps {
  fallback: ReactNode;
}

const ContentShare = dynamic(() => import('@/packages/components/layouts/Content/Share'), {
  ssr: false
});

const ContentSupport = dynamic(() => import('@/packages/components/layouts/Content/Support'), {
  ssr: false
});

const ContentDisqus = dynamic(() => import('@/packages/components/layouts/Content/Disqus'), {
  ssr: false
});

function ContentSuspense({ children, fallback }: PropsWithChildren<ContentSuspenseProps>) {
  return (
    <Suspense
      fallback={
        <div className="base-container mt-10 mx-auto">
          <h4 className="text-center mb-3">
            {fallback}
          </h4>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

function ContentInteraction(props: ContentInteractionProps) {
  const { path, meta, identifier } = props;

  return (
    <div>
      <ContentSuspense fallback="Loading Share...">
        <ContentShare path={path} meta={meta} />
      </ContentSuspense>
      <ContentSuspense fallback="Loading Support...">
        <ContentSupport />
      </ContentSuspense>
      <ContentSuspense fallback="Loading Disqus...">
        <ContentDisqus path={path} title={meta.title} identifier={identifier} />
      </ContentSuspense>
    </div>
  );
}

export default ContentInteraction;
