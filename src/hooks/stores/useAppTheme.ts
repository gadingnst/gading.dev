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
      onGetData(key, isServer?) {
        if (isServer) return 'light';
        const data = window.localStorage.getItem(key as string);
        return data as Theme;
      },
      onSetData(key, data, isServer?) {
        if (isServer) return;
        window.localStorage.setItem(key as string, data);
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
