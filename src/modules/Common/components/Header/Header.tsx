'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import useScrollListener from '@/packages/hooks/useScrollListener';

import AppThemeSelector from './AppThemeSelector';
import LanguageSelector from './LanguageSelector';
import Menu from './Menu';

/**
 * Header component with navigation menu and language selector
 * Features scroll-based transparency effect
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const currentLang = useLangugage();

  useScrollListener(({ scrollY }) => {
    setIsScrolled(scrollY > 50);
  }, 'window');

  /**
   * Check if current route is home page
   * @returns true if on home route
   */
  const isHomeRoute = (): boolean => {
    return pathname === '/' || pathname === `/${currentLang}`;
  };

  return (
    <header
      className={cn([
        'navbar px-0 py-2 fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent'
      ])}
    >
      <div className="base-container flex justify-between items-center">
        <div className="navbar-start">
          <NextLink
            href="/"
            className={cn([
              'btn btn-ghost sm:text-xl md:text-2xl font-bold transition-all duration-300 liquid-glass font-serif relative',
              'text-base-content hover:text-base-content hover:bg-base-200/50 hover:-translate-y-1 hover:shadow-lg text-contrast',
              isHomeRoute() && [
                'bg-primary/20 text-base-content font-bold border-2 border-primary/40',
                'shadow-lg ring-2 ring-primary/30 ring-offset-1',
                'transform scale-105 backdrop-blur-sm',
                'after:absolute after:bottom-0 after:left-0 after:right-0',
                'after:h-1 after:bg-primary after:shadow-sm',
                'relative overflow-hidden'
              ],
              isScrolled && 'shadow-xl'
            ])}
          >
            Gading&apos;s Hideout
          </NextLink>
        </div>

        <div className="navbar-end gap-x-2">
          <LanguageSelector isScrolled={isScrolled} />
          <AppThemeSelector isScrolled={isScrolled} />
          <Menu isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
}
