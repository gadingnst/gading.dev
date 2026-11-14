import { NextPageProps } from '@/@types/global';
import ContentParser from '@/modules/Content/components/ContentParser';
import ContentInteraction from '@/modules/Content/components/Interaction';
import { getContentMultiLanguage } from '@/modules/Content/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import Banner from '@/packages/components/layouts/Header/Banner';
import dt from '@/packages/libs/DayJS/dt';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

import withNowLocales from './Now.locales';

export async function generateNowPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateNowPathsDefault() {
  return [{}];
}

async function NowPage(props: NextPageProps) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const markdownContent = await getContentMultiLanguage('now', lang);
  const locales = withNowLocales(lang as I18nLocales);
  const { currently, date } = markdownContent.meta;

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner
        bgImage={markdownContent.meta.image}
      >
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow rounded-2xl p-8 -translate-y-6">
              <h1 className="text-2xl md:text-4xl font-bold">
                {markdownContent.meta.title}
              </h1>
              <p className="text-base sm:text-lg mt-4">
                {markdownContent.meta.description}
              </p>
              <div className="mt-5 flex flex-col items-center gap-2 font-sans text-sm sm:text-base">
                {currently && (
                  <p className="flex items-center gap-2">
                    <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-teal shadow-[0_0_0_4px_var(--gd-teal-soft)]" />
                    <span><span className="font-semibold">{locales.currentlyLabel}:</span> {currently}</span>
                  </p>
                )}
                <p className="opacity-80">
                  {locales.lastUpdated}: <time dateTime={date}>{dt(date).format('MMM DD, YYYY')}</time>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Banner>

      {/* Markdown Content */}
      <section className="base-container py-6 -mt-28">
        <HeroCard>
          <ContentParser className="[&_h2]:mt-10 [&_h2]:border-t [&_h2]:border-base-content/10 [&_h2]:pt-8">
            {markdownContent.content}
          </ContentParser>
        </HeroCard>
      </section>
      <ContentInteraction
        path="now"
        identifier="now"
        meta={markdownContent.meta}
      />
    </div>
  );
}

export default NowPage;
