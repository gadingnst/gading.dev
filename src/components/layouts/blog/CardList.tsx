import type { FunctionComponent } from 'react';
import type { ContentMeta } from '@/server/content-parser';
import NextLink from 'next/link';
import { LazyComponentProps, ScrollPosition, trackWindowScroll } from 'react-lazy-load-image-component';
import Card from '@/components/base/Card';
import Image from '@/components/base/Image';
import ContentInfo from '@/components/base/Content/Info';
import Link from '@/components/base/Link';
import clsxm from '@/utils/helpers/clsxm';

interface CardProps {
  meta: ContentMeta;
  locale: string;
  scrollPosition?: ScrollPosition;
}

interface Props extends LazyComponentProps {
  className?: string;
  contents: ContentMeta[];
  locale: string;
}

export const BlogCard: FunctionComponent<CardProps> = (props) => {
  const { meta, locale, scrollPosition } = props;
  return (
    <Card
      hoverEffect
      key={meta.slugOriginal}
      className="rounded-12 overflow-hidden"
    >
      <NextLink href="/blog/[slug]" as={`/blog/${meta.slugOriginal}`}>
        <div className="relative w-full overflow-hidden h-[200px] cursor-pointer">
          <Image
            src={meta.image}
            alt={meta.title}
            className="object-cover w-full"
            wrapperClassName="w-full"
            width="100%"
            height={200}
            scaling={0.45}
            delayLoad={300}
            scrollPosition={scrollPosition}
          />
        </div>
      </NextLink>
      <div className="flex flex-col pt-12 pb-16 px-16">
        <div className="flex flex-col justify-between items-center min-h-[50px]">
          <div className="w-full text-center">
            <Link
              href="/blog/[slug]"
              asPath={`/blog/${meta.slugOriginal}`}
              className="mb-4 text-primary dark:text-primary-2"
              locale={locale}
            >
              {meta.title}
            </Link>
          </div>
          <ContentInfo
            className="flex my-8 text-xs"
            meta={meta}
            locale={locale}
          />
        </div>
        <hr className="w-full mt-0 mb-12" />
        <p className="text-center text-sm">
          {meta.description}
        </p>
      </div>
    </Card>
  );
};

const BlogCardList = trackWindowScroll((props: Props) => {
  const {
    className,
    contents,
    locale,
    scrollPosition
  } = props;
  return (
    <div className={clsxm('grid grid-cols-1 gap-28 w-full max-w-5xl sm:grid-cols-2', className)}>
      {contents.map((item) => (
        <BlogCard
          key={item.slugOriginal}
          meta={item}
          locale={locale}
          scrollPosition={scrollPosition}
        />
      ))}
    </div>
  );
});

export default BlogCardList;
