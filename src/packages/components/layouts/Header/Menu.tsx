'use client';

import { Briefcase, Clock, Home, Menu as MenuIcon, PenTool, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import Dropdown from '@/packages/components/base/Floatings/Dropdown';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import useLangugage from '@/packages/libs/I18n/i18n.client';

const menuItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    icon: Briefcase
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: PenTool
  },
  {
    label: 'Now',
    href: '/now',
    icon: Clock
  },
  {
    label: 'About',
    href: '/about',
    icon: User
  }
];

/**
 * Whether `route` is the page being viewed
 * @param pathname - current pathname, language prefix included
 * @param route - menu route, without language prefix
 */
function useIsActiveRoute() {
  const pathname = usePathname();
  const currentLang = useLangugage();

  return (route: string): boolean => {
    if (route === '/') {
      return pathname === '/' || pathname === `/${currentLang}` || pathname === '/en' || pathname === '/id';
    }
    return pathname?.includes(route) || false;
  };
}

/**
 * Pill navigation shown from the `md` breakpoint up
 */
export function DesktopMenu() {
  const isActiveRoute = useIsActiveRoute();

  return (
    <nav
      aria-label="Main"
      className="hidden items-center gap-1 rounded-full floating-glass p-[5px] md:flex"
    >
      {menuItems.map((item) => {
        const isActive = isActiveRoute(item.href);

        return (
          <NextLink
            key={item.href}
            withCurrentLocale
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn([
              'rounded-full px-3.5 py-[7px] text-sm font-semibold transition-colors duration-200',
              isActive
                ? 'bg-brand-soft text-brand'
                : 'text-muted hover:text-base-content'
            ])}
          >
            {item.label}
          </NextLink>
        );
      })}
    </nav>
  );
}

/**
 * Hamburger menu shown below the `md` breakpoint
 */
export function MobileMenu() {
  const isActiveRoute = useIsActiveRoute();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Dropdown
        open={isOpen}
        onOpenChange={setIsOpen}
        triggerClassName="btn-circle h-[38px] w-[38px] min-h-0 floating-glass p-0"
        trigger={
          <span aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X className="h-[18px] w-[18px]" /> : <MenuIcon className="h-[18px] w-[18px]" />}
          </span>
        }
      >
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <li key={item.href}>
              <NextLink
                withCurrentLocale
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={cn([
                  'flex items-center gap-3 rounded-xl font-semibold transition-colors duration-200',
                  isActive ? 'bg-brand-soft text-brand' : 'text-base-content hover:bg-base-200'
                ])}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NextLink>
            </li>
          );
        })}
      </Dropdown>
    </div>
  );
}
