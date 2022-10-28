import useStore from 'swr-global-state';

export type Theme = 'light'|'dark';
export interface ThemeState {
  current: Theme;
  next: Theme;
}

/**
 * hooks for app theming states
 * @returns Theme state and setter
 */
function useAppTheme() {
  const [theme, setTheme] = useStore<Theme>({
    key: '@gading.dev/theme',
    initial: 'light',
    persist: {
      onGetData(key) {
        const data = window.localStorage.getItem(String(key));
        return data as Theme;
      },
      onSetData(key, data) {
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
