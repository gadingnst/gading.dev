import useStore from '@gadingnst/store-swr';

export type Theme = 'light'|'dark';
export interface ThemeState {
  current: Theme;
  next: Theme;
}

/**
 *
 * @returns - theme state
 */
function useAppTheme() {
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
