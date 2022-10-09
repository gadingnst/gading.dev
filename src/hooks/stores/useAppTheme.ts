import useStore, { Store } from 'swr-global-state';

export type Theme = 'light'|'dark';
export interface ThemeState {
  current: Theme;
  next: Theme;
}

/**
 * hooks for app theming states
 * @returns Theme state and setter
 */
function useAppTheme(): Store<ThemeState, Theme> {
  const [theme, setTheme] = useStore<Theme>({
    key: '@gading.dev/theme',
    initial: 'light',
    persist: true
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
