'use client';

import Image from 'next/image';

import { SITE_NAME } from '@/configs/sites';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { APP_THEME_SELECTION_ENABLED } from '@/packages/libs/AppTheme/constants';

import AppThemeSelector from './AppThemeSelector';
import BackButton from './BackButton';
import LanguageSelector from './LanguageSelector';
import { DesktopMenu, MobileMenu } from './Menu';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-base-100/85 backdrop-blur-md">
      <div className="wide-container grid grid-cols-[1fr_auto] items-center gap-3 py-4 md:grid-cols-[1fr_auto_1fr] md:py-[22px]">
        <div className="flex items-center gap-2">
          <BackButton />
          <NextLink
            withCurrentLocale
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight md:text-[19px]"
          >
            <Image
              src="/android-chrome-192x192.png"
              alt={SITE_NAME}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full"
            />
            <span className="hidden md:inline">{SITE_NAME}</span>
          </NextLink>
        </div>

        <DesktopMenu />

        <div className="flex items-center justify-end gap-2">
          <LanguageSelector />
          {APP_THEME_SELECTION_ENABLED && <AppThemeSelector />}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
