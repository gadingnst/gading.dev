import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogCardList from '@/modules/Blog/components/CardList';
import { getBlogList } from '@/modules/Content/services/content-parser';
import Pagination from '@/packages/components/base/Navigations/Pagination';
import Banner from '@/packages/components/layouts/Header/Banner';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

interface Props {
  pageCurrent?: number;
  lang?: string;
}

async function BlogPageList({ pageCurrent = 1, lang: propLang }: Props) {
  const lang = propLang || await getDefaultLanguage();
  const blogList = await getBlogList(lang, { pageCurrent });
  const content = withBlogListLocales(lang);
  const pageCount = blogList.pagination.pageCount;

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner bgImage="/media/default-banners/5.jpg">
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow rounded-2xl p-8 -translate-y-6">
              <h1 className="text-2xl md:text-4xl font-bold">
                Blog
              </h1>
              <p className="text-base sm:text-lg mt-4">
                {content.desc}
              </p>
            </div>
          </div>
        </section>
      </Banner>

      {/* Blog List */}
      <BlogCardList className="-mt-28" contents={blogList.contents} />

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

export default BlogPageList;
