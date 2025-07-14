'use client';

import cn from '@/designs/utils/cn';
import NextLink from '@/packages/components/base/Navigations/NextLink';

import AppThemeSelector from './AppThemeSelector';
import LanguageSelector from './LanguageSelector';
import Menu from './Menu';

export default function Header() {
  return (
    <header
      className={cn([
        'navbar px-0 py-2 fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent'
      ])}
    >
      <div className="base-container flex justify-between items-center">
        <div className="navbar-start">
          <NextLink
            withCurrentLocale
            href="/"
            className={cn([
              'liquid-glass-shadow btn btn-ghost relative',
              'font-bold font-serif sm:text-xl md:text-2xl',
              'transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105'
            ])}
          >
            Gading&apos;s Hideout
          </NextLink>
        </div>

        <div className="navbar-end gap-x-2">
          <LanguageSelector />
          <AppThemeSelector />
          <Menu />
        </div>
      </div>
    </header>
  );
}
