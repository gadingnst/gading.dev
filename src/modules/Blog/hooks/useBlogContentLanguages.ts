import { useMemo } from 'react';
import useStore from 'swr-global-state';

import { ContentSlug } from '@/modules/ContentParser/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getLanguageFlag, getLanguageLabel } from '@/packages/libs/I18n/utils';

interface ContentSlugByLanguage {
  code: I18nLocales;
  flag: string;
  label: string;
  href: string
}

function useBlogContentLanguages() {
  const [slug, setSlug] = useStore<ContentSlug|null>({
    key: 'app-blog-content-slugs-by-lang',
    initial: null
  });

  const contentSlugByLanguages = useMemo(() => {
    if (!slug) return [];
    return Object.entries(slug).reduce((acc, [_lang, _slug]) => {
      if (!_slug) return acc;
      const lang = _lang as I18nLocales;
      return [
        ...acc,
        {
          code: lang,
          flag: getLanguageFlag(lang),
          label: getLanguageLabel(lang),
          href: `/${lang}/blog/${_slug}`
        }
      ];
    }, [] as ContentSlugByLanguage[]);
  }, [slug]);

  const languagesCount = useMemo(() => {
    return contentSlugByLanguages.length;
  }, [contentSlugByLanguages]);

  const isSlugEmpty = useMemo(() => {
    return languagesCount < 1;
  }, [languagesCount]);

  const isSlugSingleLanguage = useMemo(() => {
    return languagesCount === 1;
  }, [languagesCount]);

  return {
    slug,
    setSlug,
    contentSlugByLanguages,
    languagesCount,
    isSlugEmpty,
    isSlugSingleLanguage
  };
}

export default useBlogContentLanguages;
