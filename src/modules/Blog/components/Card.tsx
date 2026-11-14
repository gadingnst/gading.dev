import { Star } from 'lucide-react';

import cn from '@/designs/utils/cn';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import Card from '@/packages/components/base/Displays/Card';
import Image from '@/packages/components/base/Displays/Image';
import NextLink from '@/packages/components/base/Navigations/NextLink';

export interface BlogCardProps {
  blog: ContentMeta;
  className?: string;
  isFeatured?: boolean;
}

function BlogCard(_props: BlogCardProps) {
  const { blog, className, isFeatured } = _props;

  return (
    <Card
      hoverEffect
      className={cn([
        'relative flex flex-col h-full',
        className
      ])}
    >
      {isFeatured && (
        // sticker on the card's top edge, same shape as Home's "my baby"
        <div className="absolute -top-3 right-4 z-20 flex rotate-6 items-center gap-1.5 rounded-xl bg-brand-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand shadow-soft sm:right-6">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>Featured</span>
        </div>
      )}
      <NextLink
        withCurrentLocale
        className="group block"
        href={`/blog/${blog.slugOriginal}`}
      >
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-[var(--radius-box)] bg-base-300">
            <div className="w-full h-full">
              <Image
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
                wrapperClassName="flex!"
              />
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors duration-300 ease-in-out px-6 pt-5 pb-1">
          {blog.title}
        </h2>
      </NextLink>

      <div className="flex flex-col flex-1 px-6 pb-6">
        {/* Description */}
        <p className="text-muted text-sm mt-1 mb-4 line-clamp-3 flex-1">
          {blog.description}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-[11px] py-1 font-mono text-xs font-medium bg-lilac-soft text-lilac rounded-full"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="font-mono text-xs text-muted px-2 py-1">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Information, always at the bottom */}
        <BlogContentInfo meta={blog} className="mt-auto justify-start font-mono text-muted" />
      </div>
    </Card>
  );
}

export default BlogCard;
