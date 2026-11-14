import { ArrowRight, Star } from 'lucide-react';

import cn from '@/designs/utils/cn';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import Card from '@/packages/components/base/Displays/Card';
import Image from '@/packages/components/base/Displays/Image';
import NextLink from '@/packages/components/base/Navigations/NextLink';

interface Props {
  blog: ContentMeta;
  readLabel: string;
  className?: string;
}

function FeaturedHero({ blog, readLabel, className }: Props) {
  return (
    <section className={cn(['base-container pt-6', className])}>
      <Card hoverEffect className="relative">
        {/* same sticker as the grid cards, so the hero reads as "the featured one" */}
        <div className="absolute -top-3 right-4 z-20 flex rotate-6 items-center gap-1.5 rounded-xl bg-brand-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand shadow-soft sm:right-6">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>Featured</span>
        </div>
        <NextLink
          withCurrentLocale
          href={`/blog/${blog.slugOriginal}`}
          className="group grid grid-cols-1 md:grid-cols-5"
        >
          {blog.image && (
            <div className="relative h-56 w-full overflow-hidden rounded-t-[var(--radius-box)] bg-base-300 sm:h-72 md:col-span-3 md:h-full md:min-h-80 md:rounded-l-[var(--radius-box)] md:rounded-tr-none">
              <Image
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                wrapperClassName="flex! h-full w-full"
              />
            </div>
          )}
          <div
            className={cn([
              'flex flex-col gap-4 p-6 md:p-8',
              blog.image ? 'md:col-span-2' : 'md:col-span-5'
            ])}
          >
            <h2 className="font-display text-2xl font-bold leading-tight text-base-content transition-colors duration-300 group-hover:text-primary md:text-3xl">
              {blog.title}
            </h2>
            <p className="text-muted text-base leading-relaxed line-clamp-5">
              {blog.description}
            </p>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-lilac-soft px-[11px] py-1 font-mono text-xs font-medium text-lilac"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
              <BlogContentInfo meta={blog} className="justify-start font-mono text-muted" />
              <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-primary">
                {readLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </NextLink>
      </Card>
    </section>
  );
}

export default FeaturedHero;
