import { useCallback } from 'react';

/**
 * hooks for delaying passed action
 * @param delay - The delay to run action
 */
function useDelayedAction(delay?: number) {
  return useCallback((callback: () => void, delayParams?: number) => {
    const ms = delayParams || delay;
    if (ms) {
      return setTimeout(callback, ms);
    }
    return callback();
  }, [delay]);
}

export default useDelayedAction;
