import { NextPageProps } from '@/@types/global';
import BlogContentSlugInitializer from '@/modules/Blog/components/ContentSlugInitializer';
import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContent } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';

interface Params {
  slug: string;
}

async function BlogContentPage({ params }: NextPageProps<Params>) {
  const { slug } = await params;
  const lang = await getLangugageServer();
  const content = await getContent(slug, lang);

  return (
    <>
      <BlogContentSlugInitializer contentSlug={content.meta.slug} />
      <div className="min-h-screen flex flex-col text-base-content">
        <Banner
          bgImage={content.meta.image}
        >
          <section className="font-serif flex flex-col h-full items-center justify-center text-center">
            <div className="base-container relative z-10">
              <div className="liquid-glass-shadow text-base-content rounded-2xl p-8">
                <h1 className="text-contrast text-2xl md:text-4xl font-bold">
                  {content.meta.title}
                </h1>
                <p className="text-base sm:text-lg mt-4 text-shadow">
                  {content.meta.description}
                </p>
              </div>
            </div>
          </section>
        </Banner>

        {/* Markdown Content */}
        <section className="base-container py-12 -mt-36">
          <HeroCard>
            <ContentParser>
              {content.content}
            </ContentParser>
          </HeroCard>
        </section>
      </div>
    </>
  );
}

export default BlogContentPage;
