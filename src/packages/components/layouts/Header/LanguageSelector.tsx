'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

import cn from '@/designs/utils/cn';
import useBlogContentLanguages from '@/modules/Blog/hooks/useBlogContentLanguages';
import Dropdown from '@/packages/components/base/Floatings/Dropdown';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getLanguageFlag, getLanguageLabel } from '@/packages/libs/I18n/utils';

interface LanguageItemProps {
  href: string;
  isActive: boolean;
  flag: string;
  label: string;
}

function LanguageItem(_props: LanguageItemProps) {
  const { href, isActive, flag, label } = _props;
  return (
    <li>
      <NextLink
        href={href}
        disabled={isActive}
        className={cn([
          'flex items-center gap-3 transition-all duration-300',
          'cursor-pointer hover:bg-white/35 hover:shadow-primary',
          isActive && [
            'active cursor-default bg-white text-black font-semibold',
            'border-l-4 border-primary/75 shadow-lg shadow-white/20'
          ]
        ])}
      >
        <span className="text-lg">{flag}</span>
        <span>{label}</span>
      </NextLink>
    </li>
  );
}

function LanguageSelector() {
  const pathname = usePathname();
  const currentLang = useLangugage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    isSlugEmpty,
    isSlugSingleLanguage,
    contentSlugByLanguages
  } = useBlogContentLanguages();

  /**
   * Compute the URL for a given language
   * @param newLang - Target language
   * @returns Computed URL for the language
   */
  const getLanguageUrl = useCallback((newLang: I18nLocales): string => {
    // Remove current language from pathname if exists
    const pathWithoutLang = pathname?.replace(/^\/(en|id)/, '') || '/';

    // Return URL based on language
    if (newLang === 'en') {
      // For English, use root path without lang prefix
      return pathWithoutLang === '/' ? '/' : pathWithoutLang;
    } else {
      // For other languages, add lang prefix
      return `/${newLang}${pathWithoutLang}`;
    }
  }, [pathname]);

  const renderLanguages = () => {
    if (isSlugSingleLanguage) return;
    if (isSlugEmpty) {
      return Object.keys(I18n).map((lang) => {
        const locale = lang as I18nLocales;
        const isActive = locale === currentLang;
        return (
          <LanguageItem
            key={locale}
            href={getLanguageUrl(locale)}
            isActive={isActive}
            flag={getLanguageFlag(locale)}
            label={getLanguageLabel(locale)}
          />
        );
      });
    }
    return contentSlugByLanguages.map((_cSlug) => {
      const isActive = _cSlug.code === currentLang;
      return (
        <LanguageItem
          key={_cSlug.code}
          href={_cSlug.href}
          isActive={isActive}
          flag={_cSlug.flag}
          label={_cSlug.label}
        />
      );
    });;
  };

  return (
    <Dropdown
      liquidGlass
      disabled={isSlugSingleLanguage}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      dropdownClassName="max-w-28"
      trigger={
        <>
          <span className="text-lg">
            {getLanguageFlag(currentLang)}
          </span>
          <span className="hidden sm:inline">
            {getLanguageLabel(currentLang)}
          </span>
          {isSlugSingleLanguage && (
            <span className="text-xs hidden sm:inline-block">(Only)</span>
          )}
        </>
      }
    >
      {renderLanguages()}
    </Dropdown>
  );
}

export default LanguageSelector;
