import { Tag } from 'lucide-react';

import cn from '@/designs/utils/cn';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import type { ContentMeta } from '@/modules/ContentParser/services/content-parser';
import Card from '@/packages/components/base/Displays/Card';
import LazyImage from '@/packages/components/base/Displays/LazyLoad/LazyImage';
import NextLink from '@/packages/components/base/Navigations/NextLink';

export interface BlogCardProps {
  blog: ContentMeta;
  className?: string;
}

function BlogCard(_props: BlogCardProps) {
  const { blog, className } = _props;

  return (
    <Card
      hoverEffect
      className={cn([
        'overflow-hidden flex flex-col h-full',
        className
      ])}
    >
      <NextLink
        withCurrentLocale
        className="group block"
        href={`/blog/${blog.slugOriginal}`}
      >
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-base-300">
            <div className="w-full h-full">
              <LazyImage
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-center md:text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 ease-in-out px-3 py-3">
          {blog.title}
        </h2>
      </NextLink>

      <div className="flex flex-col flex-1 px-3 pb-4">
        {/* Meta Information */}
        <BlogContentInfo meta={blog} />

        <div className="divider my-2" />

        {/* Description */}
        <p className="text-neutral-content/80 text-center text-xs md:text-sm mb-4 line-clamp-3 flex-1">
          {blog.description}
        </p>

        {/* Tags - Always at bottom */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-accent/10 text-accent rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-xs text-base-content/60 px-2 py-1">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default BlogCard;
