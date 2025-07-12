import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogCard from '@/modules/Blog/components/Card';
import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import { getBlogList } from '@/modules/ContentParser/services/content-parser';
import Pagination from '@/packages/components/base/Navigations/Pagination';

interface Props {
  pageCurrent?: number;
}

async function BlogList({ pageCurrent = 1 }: Props) {
  const lang = await getLangugageServer();
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
      <section className="base-container py-12 -mt-36 grid grid-cols-1 sm:grid-cols-2 gap-7">
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
            hrefPrefix="/blog/page/"
            value={pageCurrent}
            pageCount={pageCount}
          />
        </div>
      )}
    </div>
  );
}

export default BlogList;
