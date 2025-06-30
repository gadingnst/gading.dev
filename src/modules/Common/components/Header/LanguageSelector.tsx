'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getLanguageFlag, getLanguageLabel } from '@/packages/libs/I18n/utils';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import Dropdown from '@/packages/components/base/Floatings';
import cn from '@/designs/utils/cn';

interface LanguageSelectorProps {
  isScrolled?: boolean;
}

/**
 * Language selector dropdown component using DaisyUI 5
 * Handles language switching with proper routing
 */
export default function LanguageSelector({ isScrolled = false }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLangugage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Handle language change from dropdown
   * @param newLang - Selected language
   */
  const handleLanguageChange = (newLang: I18nLocales) => {
    // Don't do anything if the same language is selected
    if (newLang === currentLang) {
      setIsDropdownOpen(false);
      return;
    }

    // Remove current language from pathname if exists
    const pathWithoutLang = pathname.replace(/^\/(en|id)/, '') || '/';

    // Navigate to new language route
    if (newLang === 'en') {
      // For English, use root path without lang prefix
      router.push(pathWithoutLang === '/' ? '/' : pathWithoutLang);
    } else {
      // For other languages, add lang prefix
      router.push(`/${newLang}${pathWithoutLang}`);
    }
    router.refresh();
    setIsDropdownOpen(false);
  };

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
            <button
              onClick={() => handleLanguageChange(locale)}
              className={cn([
                'flex items-center gap-3 transition-all duration-300',
                isActive ? [
                  'active cursor-default bg-primary/10 text-primary',
                  'border-l-4 border-primary shadow-md shadow-primary/10'
                ] : 'cursor-pointer hover:bg-base-200/50'
              ])}
              disabled={isActive}
            >
              <span className="text-lg">{getLanguageFlag(locale)}</span>
              <span>{getLanguageLabel(locale)}</span>
            </button>
          </li>
        );
      })}
    </Dropdown>
  );
}
