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

  return (
    <Card
      hoverEffect
      className={cn([
        'overflow-hidden',
        className
      ])}
    >
      <Link
        href={withCurrentLocale ? `/blog/${blog.slugOriginal}` : `/${blog.slugOriginal}`}
        className="group block h-full cursor-pointer"
      >
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden bg-base-300">
            <LazyImage
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <h2 className="text-center md:text-lg font-bold text-base-content group-hover:text-primary transition-colors px-3">
          {blog.title}
        </h2>
      </Link>
      <div className="px-3 mt-2">
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

        <div className="divider" />

        <p className="text-neutral-content/60 text-xs md:text-sm mb-4 line-clamp-3 flex-grow">
          {blog.description}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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
