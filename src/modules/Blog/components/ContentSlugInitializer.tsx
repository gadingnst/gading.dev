'use client';

import { useEffect } from 'react';

import useBlogContentLanguages from '@/modules/Blog/hooks/useBlogContentLanguages';
import { ContentSlug } from '@/modules/Content/services/content-parser';

interface Props {
  contentSlug: ContentSlug;
}

function BlogContentSlugInitializer({ contentSlug }: Props) {
  const { setSlug } = useBlogContentLanguages();

  useEffect(() => {
    setSlug(contentSlug);
    return () => {
      setSlug(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentSlug]);

  return null;
}

export default BlogContentSlugInitializer;
