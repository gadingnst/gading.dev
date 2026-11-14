'use client';

import { useEffect } from 'react';

/**
 * Registers `/sw.js` once the page has loaded. Rendered only in production
 * builds (see Root.layout), so `next dev` never runs a service worker.
 */
function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
        /* offline support is a nice-to-have; a failed register changes nothing */
      });
    };
    if (document.readyState === 'complete') {
      register();
      return;
    }
    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}

export default ServiceWorkerRegister;
