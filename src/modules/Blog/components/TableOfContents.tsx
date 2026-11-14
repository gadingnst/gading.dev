'use client';

import { useEffect, useState } from 'react';

import cn from '@/designs/utils/cn';
import type { TocItem } from '@/modules/Blog/services/toc';

interface Props {
  items: TocItem[];
  title: string;
  className?: string;
}

/** sticky list of the post's headings; the one being read is highlighted */
function TableOfContents({ items, title, className }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0].id;
      for (const el of headings) {
        if (el.getBoundingClientRect().top - 120 <= 0) current = el.id;
        else break;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label={title} className={cn(['text-sm', className])}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-base-content/60 mb-3">
        {title}
      </p>
      <ul className="border-l border-base-content/10 space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn([
                'block -ml-px border-l-2 py-1 leading-snug transition-colors',
                item.depth === 3 ? 'pl-6 text-[13px]' : 'pl-3',
                activeId === item.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-base-content/70 hover:text-base-content'
              ])}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
