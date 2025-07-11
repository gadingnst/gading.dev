import { Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

import cn from '@/designs/utils/cn';
import type { ContentMeta } from '@/modules/ContentParser/services/content-parser';
import Card from '@/packages/components/base/Displays/Card';
import LazyImage from '@/packages/components/base/Displays/LazyLoad/LazyImage';
import dt from '@/packages/libs/DayJS/dt';

export interface BlogCardProps {
  blog: ContentMeta;
  className?: string;
  withCurrentLocale?: boolean;
}

/**
 * BlogCard component for displaying blog post information
 * Extends the base Card component with blog-specific styling and data
 */
function BlogCard(_props: BlogCardProps) {
  const {
    blog,
    className,
    withCurrentLocale = false
  } = _props;

  const formattedDate = dt(blog.date).format('MMM DD, YYYY');
  const readTimeText = blog.readTime.text;
  const blogUrl = withCurrentLocale ? `/blog/${blog.slugOriginal}` : `/${blog.slugOriginal}`;

  return (
    <Card
      hoverEffect
      className={cn([
        'overflow-hidden flex flex-col h-full',
        className
      ])}
    >
      {/* Image + Title - Clickable dalam satu group */}
      <Link href={blogUrl} className="group block">
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-base-300">
            <div className="transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-full">
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
      </Link>

      {/* Content Container - Not clickable */}
      <div className="flex flex-col flex-1 px-3 pb-4">
        {/* Meta Information */}
        <div className="flex items-center justify-center text-xs text-base-content/60 gap-x-2">
          <div className="flex items-center gap-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          •
          <div className="flex items-center gap-x-1">
            <Clock className="w-3 h-3" />
            <span>{readTimeText}</span>
          </div>
        </div>

        <div className="divider my-2" />

        {/* Description */}
        <p className="text-neutral-content/60 text-xs md:text-sm mb-4 line-clamp-3 flex-1">
          {blog.description}
        </p>

        {/* Tags - Always at bottom */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
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
