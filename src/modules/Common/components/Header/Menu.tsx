'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import useUpdated from '@/packages/hooks/useUpdated';
import cn from '@/designs/utils/cn';

interface MenuProps {
  isScrolled?: boolean;
}

/**
 * Navigation menu component with Home and About links
 * Highlights active route and supports internationalization
 */
export default function Menu({ isScrolled = false }: MenuProps) {
  const pathname = usePathname();
  const currentLang = useLangugage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /**
   * Check if a route is currently active
   * @param route - Route to check
   * @returns true if route is active
   */
  const isActiveRoute = (route: string): boolean => {
    if (route === '/') {
      // For home route, check if pathname is exactly '/' or starts with language prefix only
      return pathname === '/' || pathname === `/${currentLang}` || pathname === '/en' || pathname === '/id';
    }

    // For other routes, check if pathname contains the route
    return pathname.includes(route);
  };

  /**
   * Get the appropriate link for a route based on current language
   * @param route - Base route
   * @returns Localized route
   */
  const getLocalizedRoute = (route: string): string => {
    if (route === '/') {
      return currentLang === 'en' ? '/' : `/${currentLang}`;
    }
    return currentLang === 'en' ? route : `/${currentLang}${route}`;
  };

  const menuItems = [
    {
      label: 'Home',
      route: '/',
      href: getLocalizedRoute('/')
    },
    {
      label: 'About',
      route: '/about',
      href: getLocalizedRoute('/about')
    }
  ];

  useUpdated(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  /**
   * Handle mobile menu item click
   */
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.route);

            return (
              <li key={item.route}>
                <Link
                  href={item.href}
                  className={cn([
                    'btn btn-ghost btn-sm transition-all duration-300',
                    isActive && 'btn-active',
                    isScrolled && 'shadow-xl bg-base-100/20 backdrop-blur-xl border border-base-content/10'
                  ])}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden" ref={mobileMenuRef}>
        <div className={cn([
          'dropdown dropdown-end',
          isMobileMenuOpen && 'dropdown-open'
        ])}>
          <div
            tabIndex={0}
            role="button"
            className={cn([
              'btn btn-ghost btn-sm transition-all duration-300',
              isScrolled && 'shadow-xl bg-base-100/20 backdrop-blur-xl border border-base-content/10'
            ])}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-300">
            {menuItems.map((item) => {
              const isActive = isActiveRoute(item.route);

              return (
                <li key={item.route}>
                  <Link
                    href={item.href}
                    onClick={handleMobileMenuClick}
                    className={cn([
                      'flex items-center gap-3',
                      isActive && 'active cursor-default'
                    ])}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
