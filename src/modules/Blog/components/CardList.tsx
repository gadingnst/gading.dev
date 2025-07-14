import cn from '@/designs/utils/cn';
import BlogCard from '@/modules/Blog/components/Card';
import { ContentMeta } from '@/modules/ContentParser/services/content-parser';

interface Props {
  contents: ContentMeta[]
  className?: string;
}

function BlogCardList({ contents, className }: Props) {
  return (
    <section
      className={cn([
        'base-container py-6 grid grid-cols-1 sm:grid-cols-2 gap-7',
        className
      ])}
    >
      {contents.map((_blog) => (
        <BlogCard
          key={_blog.slugOriginal}
          blog={_blog}
        />
      ))}
    </section>
  );
}

export default BlogCardList;
