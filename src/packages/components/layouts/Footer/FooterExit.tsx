'use client';

import { useEffect, useRef, useState } from 'react';

/** what the terminal says after `exit`, picked in order on each click */
const LOGOUT_LINES = [
  'logout. see you next deploy ✌️',
  'logout. [process completed]',
  'logout. the cat will keep the session warm'
];

/**
 * `gading@palembang:~$ exit` in the footer, as a button: prints a logout line,
 * then takes the reader back to the top of the page.
 */
function FooterExit() {
  const [printed, setPrinted] = useState<string | null>(null);
  const countRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), []);

  const onExit = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    setPrinted(LOGOUT_LINES[countRef.current % LOGOUT_LINES.length]);
    countRef.current += 1;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timersRef.current = [
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }), 900),
      window.setTimeout(() => setPrinted(null), 4000)
    ];
  };

  return (
    <span className="mt-1.5 block font-mono text-[13px]">
      <span>gading@palembang:~$ </span>
      <button
        type="button"
        onClick={onExit}
        className="cursor-pointer rounded underline decoration-dotted underline-offset-4 transition-colors hover:text-base-content focus-visible:outline-2 focus-visible:outline-primary"
        data-umami-event="footer_exit"
      >
        exit
      </button>
      <span aria-live="polite" className="block min-h-[1.5em] text-[12px]">{printed}</span>
    </span>
  );
}

export default FooterExit;
