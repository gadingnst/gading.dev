import { NextPageProps } from '@/@types/global';
import withBlogContentLocales from '@/modules/Blog/BlogContent.locales';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import BlogContentSlugInitializer from '@/modules/Blog/components/ContentSlugInitializer';
import ReadingProgress from '@/modules/Blog/components/ReadingProgress';
import SeriesNav from '@/modules/Blog/components/SeriesNav';
import TableOfContents from '@/modules/Blog/components/TableOfContents';
import { getTableOfContents } from '@/modules/Blog/services/toc';
import ContentParser from '@/modules/Content/components/ContentParser';
import ContentInteraction from '@/modules/Content/components/Interaction';
import { getAllBlogPaths, getContent, getSeriesParts } from '@/modules/Content/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import Banner from '@/packages/components/layouts/Header/Banner';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

interface Params {
  slug: string;
}

interface ParamsWithLang extends Params {
  lang: string;
}

export async function generateBlogPathsWithLang() {
  const paths = await getAllBlogPaths();
  return paths;
}

export async function generateBlogPathsDefault() {
  const paths = await generateBlogPathsWithLang();
  return paths.reduce((acc, path) => {
    if (path.lang === getDefaultLanguage()) {
      acc.push({ slug: path.slug });
    }
    return acc;
  }, [] as { slug: string }[]);
}

async function BlogContentPage({ params }: NextPageProps<ParamsWithLang|Params>) {
  const resolvedParams = await params;

  const lang = 'lang' in resolvedParams
    ? resolvedParams.lang
    : getDefaultLanguage();

  const slug = resolvedParams.slug;
  const content = await getContent(slug, lang);
  const seriesParts = await getSeriesParts(content.meta, lang);
  const toc = getTableOfContents(content.source);
  const labels = withBlogContentLocales(lang);

  return (
    <>
      <BlogContentSlugInitializer contentSlug={content.meta.slug} />
      <ReadingProgress targetId="post-body" />
      <div className="min-h-screen flex flex-col text-base-content">
        <Banner bgImage={content.meta.image}>
          <section className="font-serif flex flex-col h-full items-center justify-center text-center">
            <div className="base-container relative z-10">
              <div className="liquid-glass-shadow rounded-2xl p-5 sm:p-7 md:p-8 -translate-y-4 sm:-translate-y-6">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                  {content.meta.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base mt-3 sm:mt-4 leading-relaxed">
                  {content.meta.description}
                </p>
                <BlogContentInfo className="mt-3 mb-0 text-muted" meta={content.meta} />
              </div>
            </div>
          </section>
        </Banner>

        {/* Markdown Content */}
        <section
          className={[
            'w-full mx-auto px-4 py-6 -mt-20 sm:-mt-24 md:-mt-28',
            'max-w-4xl xl:max-w-6xl xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-8'
          ].join(' ')}
        >
          <HeroCard className="w-full">
            <SeriesNav
              className="mb-6"
              current={content.meta}
              parts={seriesParts}
              labels={labels}
            />
            <div id="post-body">
              <ContentParser>
                {content.content}
              </ContentParser>
            </div>
          </HeroCard>
          <aside className="hidden xl:block">
            <TableOfContents
              className="sticky top-28 mt-32 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1"
              items={toc}
              title={labels.toc}
            />
          </aside>
        </section>
        <ContentInteraction
          meta={content.meta}
          identifier={`${lang}_${content.meta.slugOriginal}`}
          path={`${lang}/blog/${content.meta.slugOriginal}`}
        />
      </div>
    </>
  );
}

export default BlogContentPage;
