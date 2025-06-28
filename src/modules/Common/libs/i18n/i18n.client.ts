'use client';

import { getLangugageFromPathnameWithFallback } from '@/packages/libs/I18n/utils';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

function useLangugage() {
  const pathname = usePathname();

  const language = useMemo(() => {
    return getLangugageFromPathnameWithFallback(pathname);
  }, [pathname]);

  return language;
}

export default useLangugage;
