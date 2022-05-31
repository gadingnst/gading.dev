import { FunctionComponent } from 'react';
import type { ContentMeta } from '@/server/content-parser';
import Card from '@/components/Card';
import ImageLazy from '@/components/Image/Lazy';
import ContentInfo from '@/components/Layout/Content/Info';
import Link from '@/components/Link';

interface Props {
  meta: ContentMeta;
  locale: string;
}

const CardBlog: FunctionComponent<Props> = (props) => {
  const { meta, locale } = props;
  return (
    <Card
      hoverEffect
      key={meta.slugOriginal}
      className="rounded-12 overflow-hidden"
    >
      <div className="relative w-full overflow-hidden h-[200px]">
        <ImageLazy
          src={meta.image}
          alt={meta.title}
          className="object-cover w-full"
          wrapperClassName="w-full"
          width="100%"
          height={200}
          scaling={0.45}
          placeholderScaling={0.05}
        />
      </div>
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

export default CardBlog;
