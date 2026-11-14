import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';

import cn from '@/designs/utils/cn';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import NextLink from '@/packages/components/base/Navigations/NextLink';

interface Props {
  current: ContentMeta;
  parts: ContentMeta[];
  labels: {
    series: string;
    part: string;
    previous: string;
    next: string;
  };
  className?: string;
}

/** every part of the series the post belongs to, with previous / next links */
function SeriesNav({ current, parts, labels, className }: Props) {
  if (!current.series || parts.length < 2) return null;
  const index = parts.findIndex((p) => p.slugOriginal === current.slugOriginal);
  const prev = index > 0 ? parts[index - 1] : undefined;
  const next = index >= 0 && index < parts.length - 1 ? parts[index + 1] : undefined;

  return (
    <aside
      aria-label={`${labels.series}: ${current.series.title}`}
      className={cn(['rounded-2xl border border-base-content/10 bg-base-content/[0.03] p-4 sm:p-5', className])}
    >
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-base-content/60">
        <Layers className="w-3.5 h-3.5" />
        <span>{labels.series} · {index + 1}/{parts.length}</span>
      </div>
      <p className="mt-2 font-semibold text-base-content">{current.series.title}</p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {parts.map((part, i) => {
          const isCurrent = i === index;
          return (
            <li key={part.slugOriginal} className="flex gap-3">
              <span className={cn(['font-mono text-xs pt-0.5 w-14 shrink-0', isCurrent ? 'text-primary' : 'text-base-content/50'])}>
                {labels.part} {part.series?.part ?? i + 1}
              </span>
              {isCurrent ? (
                <span aria-current="page" className="text-primary font-medium">{part.title}</span>
              ) : (
                <NextLink
                  href={`/blog/${part.slugOriginal}`}
                  withCurrentLocale
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  {part.title}
                </NextLink>
              )}
            </li>
          );
        })}
      </ol>
      {(prev || next) && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            {prev && (
              <NextLink
                href={`/blog/${prev.slugOriginal}`}
                withCurrentLocale
                className="group flex flex-col gap-1 rounded-xl p-3 hover:bg-base-content/5 transition-colors"
              >
                <span className="flex items-center gap-1 text-xs text-base-content/60">
                  <ArrowLeft className="w-3 h-3" />{labels.previous}
                </span>
                <span className="line-clamp-2 text-base-content group-hover:text-primary">{prev.title}</span>
              </NextLink>
            )}
          </div>
          <div>
            {next && (
              <NextLink
                href={`/blog/${next.slugOriginal}`}
                withCurrentLocale
                className="group flex flex-col items-end text-right gap-1 rounded-xl p-3 hover:bg-base-content/5 transition-colors"
              >
                <span className="flex items-center gap-1 text-xs text-base-content/60">
                  {labels.next}<ArrowRight className="w-3 h-3" />
                </span>
                <span className="line-clamp-2 text-base-content group-hover:text-primary">{next.title}</span>
              </NextLink>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

export default SeriesNav;
