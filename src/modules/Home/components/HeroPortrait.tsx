'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import cn from '@/designs/utils/cn';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import useMood from '../hooks/useMood';

interface Props {
  lang: I18nLocales;
  alt: string;
  moodLabel: string;
  moodHint: string;
  /** classes of the status pill, shared with the other pills of the hero */
  pillClassName: string;
  pillSmallClassName: string;
}

/** the most the portrait turns toward the cursor, in degrees */
const MAX_TILT = 4;

/**
 * The hero portrait: leans a little toward a mouse pointer, and a click (or
 * the mood pill) walks through the moods that `cat mood.txt` prints too.
 * The cat peeks out from behind the frame now and then, CSS only.
 */
function HeroPortrait({ lang, alt, moodLabel, moodHint, pillClassName, pillSmallClassName }: Props) {
  const { mood, nextMood } = useMood();
  const frameRef = useRef<HTMLButtonElement>(null);

  // tilt toward the cursor: fine pointers only, motion allowed only, one write per frame
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      if (!pointer) return;
      const rect = frame.getBoundingClientRect();
      const dx = (pointer.x - (rect.left + rect.width / 2)) / window.innerWidth;
      const dy = (pointer.y - (rect.top + rect.height / 2)) / window.innerHeight;
      const clamp = (n: number) => Math.max(-1, Math.min(1, n * 2));
      frame.style.transform = `perspective(900px) rotateY(${(clamp(dx) * MAX_TILT).toFixed(2)}deg) rotateX(${(-clamp(dy) * MAX_TILT).toFixed(2)}deg)`;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const reset = () => {
      pointer = null;
      frame.style.transform = '';
    };
    const sync = () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', reset);
      reset();
      if (media.matches) {
        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', reset);
      }
    };

    sync();
    media.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const moodText = `${mood.label[lang]} ${mood.emoji}`;

  return (
    <>
      <div className="hero-portrait-wrap relative">
        {/* the cat, peeking from behind the right edge of the frame */}
        <span aria-hidden className="hero-cat-peek" />
        <button
          ref={frameRef}
          type="button"
          onClick={nextMood}
          aria-label={`${moodHint}: ${moodText}`}
          className="hero-portrait relative z-[1] block h-[260px] w-[230px] cursor-pointer overflow-hidden rounded-[160px_160px_28px_28px] border-[6px] border-card bg-gradient-to-b from-brand-soft to-lilac-soft shadow-soft sm:h-[340px] sm:w-[300px] dark:border-[#2A231D]"
        >
          <Image
            src="/media/authors/gading-illustrated.png"
            alt={alt}
            fill
            priority
            sizes="(min-width: 640px) 300px, 230px"
            className="object-cover object-[50%_30%]"
          />
        </button>
      </div>

      <button
        type="button"
        onClick={nextMood}
        aria-label={`${moodHint}: ${moodText}`}
        className={cn(pillClassName, 'left-[-34px] top-[18px] cursor-pointer lg:left-[-110px] lg:top-9')}
      >
        <span aria-hidden key={mood.emoji} className="hero-mood-emoji inline-block">{mood.emoji}</span>
        <span className="text-left">
          {mood.label[lang]}
          <small className={pillSmallClassName}>{moodLabel}</small>
        </span>
      </button>
    </>
  );
}

export default HeroPortrait;
