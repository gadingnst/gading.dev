'use client';

import Image from 'next/image';

import { SITE_NAME } from '@/configs/sites';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { APP_THEME_SELECTION_ENABLED } from '@/packages/libs/AppTheme/constants';

import AppThemeSelector from './AppThemeSelector';
import BackButton from './BackButton';
import LanguageSelector from './LanguageSelector';
import { DesktopMenu, DesktopSearchButton, MobileMenu } from './Menu';

export default function Header() {
  return (
    // no bar behind the header: only its own pills and circles float over the page
    <header className="pointer-events-none sticky top-0 z-40">
      <div className="wide-container grid grid-cols-[1fr_auto] items-center gap-3 py-4 md:grid-cols-[1fr_auto_1fr] md:py-[22px]">
        <div className="pointer-events-auto flex items-center gap-2 justify-self-start">
          <BackButton />
          <NextLink
            withCurrentLocale
            href="/"
            className="flex h-[38px] items-center gap-2.5 rounded-full floating-glass p-1 font-display text-lg font-bold tracking-tight transition-transform duration-200 hover:scale-105 xl:h-[46px] xl:py-[5px] xl:pl-[5px] xl:pr-4 xl:text-[17px] xl:hover:scale-100"
          >
            <Image
              src="/android-chrome-192x192.png"
              alt={SITE_NAME}
              width={36}
              height={36}
              className="h-[30px] w-[30px] rounded-full xl:h-9 xl:w-9"
            />
            {/* name only from xl, the breakpoint the blog TOC appears at: between md and xl the pill nav needs the room */}
            <span className="hidden xl:inline">{SITE_NAME}</span>
          </NextLink>
        </div>

        <div className="pointer-events-auto hidden md:block">
          <DesktopMenu />
        </div>

        <div className="pointer-events-auto flex items-center justify-end gap-2 justify-self-end">
          <DesktopSearchButton />
          <LanguageSelector />
          {APP_THEME_SELECTION_ENABLED && <AppThemeSelector />}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
