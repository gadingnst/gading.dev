'use client';

import { getLanguageFromPathnameStrict, getDefaultLanguage } from '@/packages/libs/I18n/utils';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

function useLangugage() {
  const pathname = usePathname();

  const language = useMemo(() => {
    // Try to get language from pathname strictly (without fallback)
    const langFromPath = getLanguageFromPathnameStrict(pathname);
    if (langFromPath) return langFromPath;

    // For root path, use default language
    return getDefaultLanguage();
  }, [pathname]);

  return language;
}

export default useLangugage;
