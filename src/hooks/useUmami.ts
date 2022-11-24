import { useEffect } from 'react';
import useStore from 'swr-global-state';
import { IS_DEV } from '@/configs/env';

type IUmami = typeof window.umami;

function useUmami(onLoad?: (umami?: IUmami) => void) {
  const [Umami, setUmami] = useStore<IUmami>({
    key: '@gading.dev/umami',
    initial: undefined
  });

  useEffect(() => {
    if (IS_DEV) return;
    if (Umami) return onLoad?.(Umami);
    const interval = setInterval(() => {
      const umami = window?.umami;
      if (umami) {
        clearInterval(interval);
        setUmami(umami);
        onLoad?.(umami);
      }
    }, 1000);
  }, [Umami, onLoad]);

  return Umami;
}

export default useUmami;
