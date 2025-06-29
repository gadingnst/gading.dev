'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as MenuIcon, X, Home, User } from 'lucide-react';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import Dropdown from '@/packages/components/base/Floatings';
import cn from '@/designs/utils/cn';
import { NextLink } from '@/packages/components/base/Navigations';

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
                <NextLink
                  href={item.href}
                  className={cn([
                    'btn btn-ghost btn-sm transition-all duration-300 liquid-glass relative',
                    'hover:scale-105 hover:shadow-lg',
                    isActive && [
                      'bg-primary/20 text-primary border-primary/30',
                      'shadow-lg shadow-primary/20',
                      'before:absolute before:inset-0 before:rounded-lg',
                      'before:bg-gradient-to-r before:from-primary/10 before:to-primary/5',
                      'before:blur-sm before:-z-10'
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
                  className={cn([
                    'flex items-center gap-3 transition-all duration-300 rounded-lg p-3',
                    'hover:bg-base-200/50',
                    isActive ? [
                      'bg-primary/10 text-primary border-l-4 border-primary',
                      'shadow-md shadow-primary/10 cursor-default',
                      'before:absolute before:inset-0 before:rounded-lg',
                      'before:bg-gradient-to-r before:from-primary/5 before:to-transparent',
                      'relative'
                    ] : 'cursor-pointer hover:scale-[1.02]'
                  ])}
                  onClick={handleMobileMenuClick}
                >
                  <item.icon className={cn([
                    'w-4 h-4 transition-all duration-300',
                    isActive ? 'text-primary drop-shadow-sm' : 'text-current'
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
