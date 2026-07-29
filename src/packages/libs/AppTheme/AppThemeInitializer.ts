'use client';

import { useEffect } from 'react';

import { AppThemes } from '@/packages/libs/AppTheme/constants';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

function AppThemeInitializer() {
  const { appTheme } = useAppTheme();

  useEffect(() => {
    /**
     * The theme attribute must live on <html>: daisyUI paints the page canvas
     * from `:root` and the `dark:` variant is bound to `[data-theme="dark"]`.
     * Keeping it on <body> left <html> following the OS preference, which mixed
     * dark and light surfaces inside the same page.
     */
    const root = document.documentElement;
    if (appTheme === AppThemes.SYSTEM) {
      // no attribute => daisyUI `prefers-color-scheme` fallback takes over
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', appTheme);
    }
    // clean up the legacy attribute so both elements never disagree
    document.body.removeAttribute('data-theme');
  }, [appTheme]);

  return null;
}

export default AppThemeInitializer;
