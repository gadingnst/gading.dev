'use client';

import { Menu as MenuIcon, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import Dropdown from '@/packages/components/base/Floatings/Dropdown';
import NextLink from '@/packages/components/base/Navigations/NextLink';

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
                <NextLink
                  href={item.href}
                  className={cn([
                    'btn btn-ghost btn-sm transition-all duration-300 liquid-glass relative',
                    'text-base-content hover:text-base-content hover:bg-base-200/50 hover:shadow-primary hover:shadow-xl text-shadow',
                    isActive && [
                      'bg-primary/20 text-base-content font-bold border-2 border-primary/40',
                      'shadow-lg shadow-base-content/20 ring-2 ring-primary/30 ring-offset-1',
                      'transform scale-105 backdrop-blur-sm',
                      'after:absolute after:bottom-0 after:left-0 after:right-0',
                      'after:h-1 after:bg-primary after:shadow-sm',
                      'relative overflow-hidden text-contrast'
                    ],
                    isScrolled && 'shadow-xl'
                  ])}
                >
                  {item.label}
                </NextLink>
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
                <NextLink
                  href={item.href}
                  disabled={isActive}
                  onClick={handleMobileMenuClick}
                  className={cn([
                    'flex items-center gap-3 transition-all duration-300',
                    isActive ? [
                      'active cursor-default bg-base-200 text-base-content font-semibold',
                      'border-l-4 border-base-content/30 shadow-lg shadow-base-content/20'
                    ] : 'cursor-pointer hover:bg-base-200/50 hover:shadow-primary'
                  ])}
                >
                  <item.icon className={cn([
                    'w-4 h-4 transition-all duration-300',
                    isActive ? 'text-base-content drop-shadow-sm' : 'text-current'
                  ])} />
                  <span>{item.label}</span>
                </NextLink>
              </li>
            );
          })}
        </Dropdown>
      </div>
    </>
  );
}
