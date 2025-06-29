'use client';

import { useState } from 'react';
import useScrollListener from '@/packages/hooks/useScrollListener';
import Menu from './Menu';
import LanguageSelector from './LanguageSelector';

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
    <header className={`navbar fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${
      isScrolled 
        ? 'bg-base-100/80 backdrop-blur-md shadow-lg' 
        : 'bg-base-100 shadow-sm'
    }`}>
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold">
          Gading&apos;s Hideout
        </a>
      </div>

      <div className="navbar-end">
        <LanguageSelector isScrolled={isScrolled} />
        <Menu isScrolled={isScrolled} />
      </div>
    </header>
  );
}
