import { useCallback, useMemo } from 'react';
import useStore from 'swr-global-state';

import useMounted from '@/packages/hooks/useMounted';
import { APP_THEME_DEFAULT, APP_THEME_IS_SYSTEM_DARK_KEY, APP_THEME_KEY, APP_THEME_SELECTION_ENABLED, AppTheme, AppThemes } from '@/packages/libs/AppTheme/constants';
import { isThemeDark } from '@/packages/libs/AppTheme/utils';
import CookieStoragePersistor from '@/packages/libs/SWRGlobalState/Cookie.persistor';

/**
 * Custom hook untuk mengelola tema aplikasi dengan dukungan deteksi sistem
 * @param initial - Tema awal (default: APP_THEME_DEFAULT)
 * @returns Object dengan currentTheme, setTheme, dan isSystemDark
 */
function useAppTheme(initial = APP_THEME_DEFAULT) {
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
    // theme selection disabled => always lock to the initial theme,
    // ignoring any previously persisted cookie value
    if (!APP_THEME_SELECTION_ENABLED) {
      return initial;
    }
    if (theme === AppThemes.SYSTEM && isSystemDark) {
      return AppThemes.DARK;
    }
    return theme;
  }, [theme, isSystemDark, initial]);

  const isDark = useMemo(() => {
    return isThemeDark(appTheme);
  }, [appTheme]);

  const setTheme = useCallback((theme: AppTheme) => {
    if (!APP_THEME_SELECTION_ENABLED) return;
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
    isSystemDark,
    isDark
  };
}

export default useAppTheme;
