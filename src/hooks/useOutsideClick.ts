import { RefObject, useCallback, useEffect } from 'react';

/**
 * React hook that listens for clicks outside of a given refs.
 * @param callback - The callback to run when user clicks outside of the elements
 * @param refs - The array of ref element to listen to
 * @returns {void} - void
 */
function useOutsideClick<T extends Node>(callback: (target: HTMLElement) => void, refs: RefObject<T>[]): void {
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    const isOutsideRefs = refs.every(ref => {
      const refElement = ref?.current;
      const isOutside = refElement && !refElement?.contains(event?.target as Node);
      return isOutside;
    });
    if (isOutsideRefs) callback(event.target as HTMLElement);
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
}

export default useOutsideClick;
