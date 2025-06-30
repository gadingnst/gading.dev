'use client';

import { useState } from 'react';

import cn from '@/designs/utils/cn';
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

  useScrollListener(({ scrollY }) => {
    setIsScrolled(scrollY > 50);
  }, 'window');

  return (
    <header
      className={cn([
        'navbar fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 bg-transparent'
      ])}
    >
      <div className="navbar-start">
        <a
          className={cn([
            'btn btn-ghost sm:text-xl md:text-2xl font-bold transition-all duration-300 liquid-glass font-courgette',
            'text-base-content hover:text-base-content',
            isScrolled && 'shadow-xl'
          ])}
        >
          Gading&apos;s Hideout
        </a>
      </div>

      <div className="navbar-end gap-x-2">
        <LanguageSelector isScrolled={isScrolled} />
        <AppThemeSelector isScrolled={isScrolled} />
        <Menu isScrolled={isScrolled} />
      </div>
    </header>
  );
}
