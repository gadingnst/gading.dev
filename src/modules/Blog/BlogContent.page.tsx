import { NextPageProps } from '@/@types/global';
import BlogContentInfo from '@/modules/Blog/components/ContentInfo';
import BlogContentSlugInitializer from '@/modules/Blog/components/ContentSlugInitializer';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getAllBlogPaths, getContent } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import ContentInteraction from '@/packages/components/layouts/Content/Interaction';
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

  return (
    <>
      <BlogContentSlugInitializer contentSlug={content.meta.slug} />
      <div className="min-h-screen flex flex-col text-base-content">
        <Banner bgImage={content.meta.image}>
          <section className="font-serif flex flex-col h-full items-center justify-center text-center">
            <div className="base-container relative z-10">
              <div className="liquid-glass-shadow rounded-2xl p-8">
                <h1 className="text-xl md:text-2xl font-bold">
                  {content.meta.title}
                </h1>
                <p className="text-sm sm:text-base mt-4">
                  {content.meta.description}
                </p>
                <BlogContentInfo className="mt-3 mb-0 text-white/70" meta={content.meta} />
              </div>
            </div>
          </section>
        </Banner>

        {/* Markdown Content */}
        <section className="base-container py-6 -mt-28">
          <HeroCard>
            <ContentParser>
              {content.content}
            </ContentParser>
          </HeroCard>
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
