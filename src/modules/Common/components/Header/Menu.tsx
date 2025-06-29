'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as MenuIcon, X, Home, User } from 'lucide-react';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import Dropdown from '@/packages/components/base/Dropdown';
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
      href: getLocalizedRoute('/'),
      icon: Home
    },
    {
      label: 'About',
      route: '/about',
      href: getLocalizedRoute('/about'),
      icon: User
    }
  ];

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
                    'btn btn-ghost btn-sm transition-all duration-300 liquid-glass',
                    isActive && 'btn-active',
                    isScrolled && 'shadow-xl'
                  ])}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Dropdown
          isScrolled={isScrolled}
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
          trigger={
            isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )
          }
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn([
                    'flex items-center gap-3',
                    isActive ? 'active cursor-default' : 'cursor-pointer'
                  ])}
                  onClick={handleMobileMenuClick}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </Dropdown>
      </div>
    </>
  );
}
