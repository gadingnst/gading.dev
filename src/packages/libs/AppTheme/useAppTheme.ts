import { useCallback, useMemo } from 'react';
import useStore from 'swr-global-state';

import useMounted from '@/packages/hooks/useMounted';
import { APP_THEME_IS_SYSTEM_DARK_KEY, APP_THEME_KEY, AppTheme, AppThemes } from '@/packages/libs/AppTheme/constants';
import CookieStoragePersistor from '@/packages/libs/SWRGlobalState/Cookie.persistor';

/**
 * Custom hook untuk mengelola tema aplikasi dengan dukungan deteksi sistem
 * @param initial - Tema awal (default: SYSTEM)
 * @returns Object dengan currentTheme, setTheme, dan isSystemDark
 */
function useAppTheme(initial = AppThemes.SYSTEM) {
  const [theme, setAppTheme] = useStore<AppTheme>({
    key: APP_THEME_KEY,
    initial: initial,
    persistor: CookieStoragePersistor({
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      path: '/'
    })
  });

  const [isSystemDark, setIsSystemDark] = useStore({
    key: APP_THEME_IS_SYSTEM_DARK_KEY,
    initial: false
  });

  // actual theme to use
  const appTheme = useMemo(() => {
    if (theme === AppThemes.SYSTEM) {
      return isSystemDark ? AppThemes.DARK : theme;
    }
    return theme;
  }, [theme, isSystemDark]);

  const setTheme = useCallback((theme: AppTheme) => {
    setAppTheme(theme);
  }, [setAppTheme]);

  // detect prefers-color-scheme
  useMounted(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  });

  return {
    appTheme,
    setTheme,
    isSystemDark
  };
}

export default useAppTheme;
