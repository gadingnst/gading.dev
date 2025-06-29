'use client';

import { useState } from 'react';
import useScrollListener from '@/packages/hooks/useScrollListener';
import Menu from './Menu';
import LanguageSelector from './LanguageSelector';
import cn from '@/designs/utils/cn';

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
            'btn btn-ghost text-xl font-bold transition-all duration-300 liquid-glass',
            isScrolled ? 'shadow-xl text-base-content' : 'text-primary-content'
          ])}
        >
          Gading&apos;s Hideout
        </a>
      </div>

      <div className="navbar-end gap-x-2">
        <LanguageSelector isScrolled={isScrolled} />
        <Menu isScrolled={isScrolled} />
      </div>
    </header>
  );
}
