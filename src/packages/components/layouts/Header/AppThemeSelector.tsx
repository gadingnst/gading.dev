'use client';

import { Moon, Sun } from 'lucide-react';

import { AppThemes } from '@/packages/libs/AppTheme/constants';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

/**
 * Light / dark toggle. With the default `system` theme the first click flips
 * whatever the OS currently shows, and the choice is persisted in the cookie.
 * Both icons are rendered and swapped by the `dark:` variant, so the server
 * HTML matches the client whatever theme is stored.
 */
export default function AppThemeSelector() {
  const { isDark, setTheme } = useAppTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? AppThemes.LIGHT : AppThemes.DARK)}
      aria-label="Toggle light and dark theme"
      className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full bg-card shadow-soft transition-transform duration-200 hover:scale-105"
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
