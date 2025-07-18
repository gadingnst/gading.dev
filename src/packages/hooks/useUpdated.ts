import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * React hooks that run useEffect() hooks only when the dependency changes,
 * not when the component is in initial mounted.
 * @param callback - The callback to run only when the dependency changes
 * @param deps - The dependencies to listen to
 * @returns {void} - void
 */
function useUpdated(callback: EffectCallback, deps: DependencyList): void {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return callback();
    else mounted.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);
}

export default useUpdated;
