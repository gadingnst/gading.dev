import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogSearchFilter from '@/modules/Blog/components/BlogSearchFilter';
import { getAllBlogMeta } from '@/modules/Content/services/content-parser';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

interface Props {
  pageCurrent?: number;
  lang?: string;
}

async function BlogPageList({ pageCurrent = 1, lang: propLang }: Props) {
  const lang = propLang || await getDefaultLanguage();
  const allBlogsLocale = await getAllBlogMeta(lang);
  
  // Sort blogs by date descending
  const allBlogs = allBlogsLocale
    .map(({ meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const content = withBlogListLocales(lang);

  return (
    <div className="min-h-screen flex flex-col text-base-content bg-base-300/30">
      {/* Interactive Search, Filter & Blog List */}
      <BlogSearchFilter
        blogs={allBlogs}
        initialPage={pageCurrent}
        lang={lang}
        localeDesc={{
          desc: content.desc,
          searchPlaceholder: content.searchPlaceholder,
          allTags: content.allTags,
          emptyState: content.emptyState,
          clearSearch: content.clearSearch
        }}
      />
    </div>
  );
}

export default BlogPageList;
