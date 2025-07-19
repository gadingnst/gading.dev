'use client';

import { Clock, Menu as MenuIcon, PenTool, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import Dropdown from '@/packages/components/base/Floatings/Dropdown';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import useLangugage from '@/packages/libs/I18n/i18n.client';

const menuItems = [
  {
    label: 'Now',
    href: '/now',
    icon: Clock
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: PenTool
  },
  {
    label: 'About',
    href: '/about',
    icon: User
  }
];

/**
 * Navigation menu component with Home and About links
 * Highlights active route and supports internationalization
 */
export default function Menu() {
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
    return pathname?.includes(route) || false;
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden items-center rounded-full liquid-glass-shadow md:flex">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);

          return (
            <NextLink
              key={item.href}
              withCurrentLocale
              href={item.href}
              disabled={isActive}
              className={cn([
                'btn btn-sm btn-ghost bg-transparent border-0 transition-all duration-300',
                'text-white hover:text-black hover:bg-white/15',
                isActive
                  ? 'bg-white/60 text-black'
                  : ''
              ])}
            >
              {item.label}
            </NextLink>
          );
        })}
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Dropdown
          liquidGlass
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
            const isActive = isActiveRoute(item.href);
            return (
              <li key={item.href}>
                <NextLink
                  withCurrentLocale
                  href={item.href}
                  disabled={isActive}
                  className={cn([
                    'flex items-center gap-3 transition-all duration-300',
                    'cursor-pointer hover:bg-white/35 hover:shadow-primary',
                    isActive && [
                      'active cursor-default bg-white text-black font-semibold',
                      'border-l-4 border-primary/75 shadow-lg shadow-white/20'
                    ]
                  ])}
                >
                  <item.icon className={cn([
                    'w-4 h-4 transition-all duration-300 text-white',
                    isActive ? 'text-black drop-shadow-sm' : 'text-current'
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
