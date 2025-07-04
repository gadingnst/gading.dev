'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import cn from '@/designs/utils/cn';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import Dropdown from '@/packages/components/base/Floatings/Dropdown';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getLanguageFlag, getLanguageLabel } from '@/packages/libs/I18n/utils';

interface LanguageSelectorProps {
  isScrolled?: boolean;
}

/**
 * Language selector dropdown component using DaisyUI 5
 * Handles language switching with proper routing
 */
export default function LanguageSelector({ isScrolled = false }: LanguageSelectorProps) {
  const pathname = usePathname();
  const currentLang = useLangugage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Compute the URL for a given language
   * @param newLang - Target language
   * @returns Computed URL for the language
   */
  const getLanguageUrl = useCallback((newLang: I18nLocales): string => {
    // Remove current language from pathname if exists
    const pathWithoutLang = pathname.replace(/^\/(en|id)/, '') || '/';

    // Return URL based on language
    if (newLang === 'en') {
      // For English, use root path without lang prefix
      return pathWithoutLang === '/' ? '/' : pathWithoutLang;
    } else {
      // For other languages, add lang prefix
      return `/${newLang}${pathWithoutLang}`;
    }
  }, [pathname]);

  return (
    <Dropdown
      isScrolled={isScrolled}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      className="max-w-[100px]"
      trigger={
        <>
          <span className="text-lg">{getLanguageFlag(currentLang)}</span>
          <span className="hidden sm:inline">{getLanguageLabel(currentLang)}</span>
        </>
      }
    >
      {Object.keys(I18n).map((lang) => {
        const locale = lang as I18nLocales;
        const isActive = locale === currentLang;

        return (
          <li key={locale}>
            <NextLink
              href={getLanguageUrl(locale)}
              disabled={isActive}
              onClick={() => setIsDropdownOpen(false)}
              className={cn([
                'flex items-center gap-3 transition-all duration-300',
                isActive ? [
                  'active cursor-default bg-base-200 text-base-content font-semibold',
                  'border-l-4 border-base-content/30 shadow-lg shadow-base-content/20'
                ] : 'cursor-pointer hover:bg-base-200/50 hover:-translate-y-1'
              ])}
            >
              <span className="text-lg">{getLanguageFlag(locale)}</span>
              <span>{getLanguageLabel(locale)}</span>
            </NextLink>
          </li>
        );
      })}
    </Dropdown>
  );
}
