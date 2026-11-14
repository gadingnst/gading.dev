'use client';

import { useEffect, useState } from 'react';

/** thin bar at the very top of the viewport that fills as the article is read */
function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const read = total > 0 ? -rect.top / total : 1;
      setProgress(Math.min(1, Math.max(0, read)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
    >
      <div
        className="h-full bg-primary origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export default ReadingProgress;
