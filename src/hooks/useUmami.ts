import { useEffect } from 'react';
import useStore from 'swr-global-state';

type IUmami = typeof window.umami;

function useUmami(onLoad?: (umami?: IUmami) => void) {
  const [Umami, setUmami] = useStore<IUmami>({
    key: '@gading.dev/umami',
    initial: undefined
  });

  useEffect(() => {
    if (Umami) return onLoad?.(Umami);
    const interval = setInterval(() => {
      const umami = window?.umami;
      if (umami) {
        clearInterval(interval);
        setUmami(umami);
        onLoad?.(umami);
      }
    }, 1000);
  }, [Umami, setUmami, onLoad]);

  return Umami;
}

export default useUmami;
