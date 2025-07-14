import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogCard from '@/modules/Blog/components/Card';
import { getBlogList } from '@/modules/ContentParser/services/content-parser';
import Pagination from '@/packages/components/base/Navigations/Pagination';
import Banner from '@/packages/components/layouts/Header/Banner';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

interface Props {
  pageCurrent?: number;
  lang?: string;
}

async function BlogList({ pageCurrent = 1, lang: propLang }: Props) {
  const lang = propLang || await getDefaultLanguage();
  const blogList = await getBlogList(lang, pageCurrent);
  const content = withBlogListLocales(lang);
  const pageCount = blogList.pagination.pageCount;

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner bgImage="/media/default-banners/5.jpg">
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow text-base-content rounded-2xl p-8">
              <h1 className="text-contrast text-2xl md:text-4xl font-bold">
                Blog
              </h1>
              <p className="text-base sm:text-lg mt-4 text-shadow">
                {content.desc}
              </p>
            </div>
          </div>
        </section>
      </Banner>

      {/* Blog List */}
      <section className="base-container py-6 -mt-28 grid grid-cols-1 sm:grid-cols-2 gap-7">
        {blogList.contents.map((_blog) => (
          <BlogCard
            key={_blog.slugOriginal}
            blog={_blog}
          />
        ))}
      </section>

      {pageCount > 1 && (
        <div className="mt-10 text-center">
          <h4 className="mb-4">
            Page {pageCurrent} of {pageCount}
          </h4>
          <Pagination
            hrefPrefix={`/${lang}/blog/page/`}
            value={pageCurrent}
            pageCount={pageCount}
          />
        </div>
      )}
    </div>
  );
}

export default BlogList;
