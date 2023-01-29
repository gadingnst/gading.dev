import useStore from 'swr-global-state';

export type Theme = 'light'|'dark';
export interface ThemeState {
  current: Theme;
  next: Theme;
}

export function getSystemDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
}

const STORE_THEME_KEY = '@gading.dev/theme';

/**
 * hooks for app theming states
 * @returns Theme state and setter
 */
function useAppTheme() {
  const [theme, setTheme] = useStore<Theme>({
    key: STORE_THEME_KEY,
    initial: 'light',
    persistor: {
      onGet(key) {
        const systemTheme = getSystemDark()?.matches ? 'dark' : 'light';
        const data = window.localStorage.getItem(String(key)) as Theme;
        return data || systemTheme;
      },
      onSet(key, data) {
        window.localStorage.setItem(String(key), data);
      }
    }
  });

  return [
    {
      current: theme,
      next: theme === 'light' ? 'dark' : 'light'
    } as ThemeState,
    setTheme
  ] as const;
}

export default useAppTheme;
