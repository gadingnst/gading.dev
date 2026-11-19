import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** the server cannot know, so it renders the calm version */
function getServerSnapshot() {
  return true;
}

/**
 * Whether the visitor asked for reduced motion, kept in sync with the OS setting.
 * @returns {boolean} - true when motion should be skipped
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default usePrefersReducedMotion;
