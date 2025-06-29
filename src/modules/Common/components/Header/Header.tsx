'use client';

import Menu from './Menu';
import LanguageSelector from './LanguageSelector';

/**
 * Header component with navigation menu and language selector
 * Clean and modular design using separate components
 */
export default function Header() {

  return (
    <header className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl font-bold">
          Gading&apos;s Hideout
        </a>
      </div>

      <div className="navbar-end">
        <LanguageSelector />
        <Menu />
      </div>
    </header>
  );
}
