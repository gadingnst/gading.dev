import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogCard from '@/modules/Blog/components/Card';
import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import { getBlogList } from '@/modules/ContentParser/services/content-parser';

async function BlogListPage() {
  const lang = await getLangugageServer();
  const blogList = await getBlogList(lang);
  const content = withBlogListLocales(lang);

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
            withCurrentLocale
          />
        ))}
      </section>
    </div>
  );
}

export default BlogListPage;
