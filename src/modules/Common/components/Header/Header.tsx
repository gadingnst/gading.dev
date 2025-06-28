'use client';

import { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getLanguageFlag, getLanguageLabel } from '@/packages/libs/I18n/utils';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import useUpdated from '@/packages/hooks/useUpdated';

/**
 * Header component with language selector dropdown using DaisyUI 5
 * @param currentLang - Current selected language
 */
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLangugage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useUpdated(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
    <header className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold">
          Gading&apos;s Hideout
        </a>
      </div>

      <div className="navbar-end">
        <div className={`dropdown dropdown-end ${isDropdownOpen ? 'dropdown-open' : ''}`} ref={dropdownRef}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm gap-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-lg">{getLanguageFlag(currentLang)}</span>
            <span className="hidden sm:inline">{getLanguageLabel(currentLang)}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300">
            {Object.keys(I18n).map((lang) => {
              const locale = lang as I18nLocales;
              const isActive = locale === currentLang;

              return (
                <li key={locale}>
                  <button
                    onClick={() => handleLanguageChange(locale)}
                    className={`flex items-center gap-3 ${isActive ? 'active cursor-default' : 'cursor-pointer'}`}
                    disabled={isActive}
                  >
                    <span className="text-lg">{getLanguageFlag(locale)}</span>
                    <span>{getLanguageLabel(locale)}</span>
                    {isActive && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
