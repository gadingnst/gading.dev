import { ArrowRight } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { NextPageProps } from '@/@types/global';
import ContentCodeBlock from '@/modules/Content/components/ContentCodeBlock';
import ContentImage from '@/modules/Content/components/ContentImage';
import { getBlogList } from '@/modules/Content/services/content-parser';
import withComponentsLocales from '@/modules/Docs/Components/Components.locales';
import DocsSection from '@/modules/Docs/components/DocsSection';
import DocsShell from '@/modules/Docs/components/DocsShell';
import { generateDocsPathsDefault, generateDocsPathsWithLang } from '@/modules/Docs/Docs.shared';
import HeroTerminal from '@/modules/Home/components/HeroTerminal';
import PostCard from '@/modules/Home/components/PostCard';
import Button from '@/packages/components/base/Buttons/Button';
import Card from '@/packages/components/base/Displays/Card';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import Banner from '@/packages/components/layouts/Header/Banner';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export const generateDocsComponentsWithLang = generateDocsPathsWithLang;

export const generateDocsComponentsDefault = generateDocsPathsDefault;

const SAMPLE_CODE = `export const generateStaticParams = generateBlogPaginationPathsWithLang;
export const dynamic = 'force-static';`;

function Source({ path, label }: { path: string; label: string }) {
  return <div className="mt-3 font-mono text-xs text-muted">{label}: {path}</div>;
}

function Stage({ children }: PropsWithChildren) {
  return <div className="rounded-[20px] border border-dashed border-line p-5 md:p-8">{children}</div>;
}

async function ComponentsPage(props: NextPageProps<{ lang: I18nLocales }>) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const content = withComponentsLocales(lang);
  const { contents } = await getBlogList(lang, { limit: 1 });
  const latest = contents[0];

  return (
    <DocsShell lang={lang} active="components" title={content.title} description={content.description}>
      <DocsSection id="card" title={content.cardTitle} description={content.cardDesc}>
        <Stage>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {latest && <PostCard post={latest} />}
            <Card hoverEffect className="p-6">
              <span className="font-display text-[19px] font-bold">Card</span>
              <p className="mt-2 text-sm text-muted">{content.baseCardBody}</p>
            </Card>
          </div>
        </Stage>
        <Source label={content.sourceLabel} path="src/modules/Home/components/PostCard.tsx, src/packages/components/base/Displays/Card.tsx" />
      </DocsSection>

      <DocsSection id="buttons" title={content.buttonsTitle} description={content.buttonsDesc}>
        <Stage>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink
              withCurrentLocale
              href="/blog"
              className="rounded-full bg-base-content px-[22px] text-base-100"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              {content.buttonPrimary}
            </ButtonLink>
            <ButtonLink withCurrentLocale href="/docs" variant="outline" className="rounded-full px-[22px]">
              /docs
            </ButtonLink>
            <Button variant="ghost" className="rounded-full px-[22px]">{content.buttonGhost}</Button>
            <Button variant="accent" loading className="rounded-full px-[22px]">{content.buttonLoading}</Button>
          </div>
        </Stage>
        <Source label={content.sourceLabel} path="src/packages/components/base/Buttons/Button.tsx, src/packages/components/base/Navigations/ButtonLink.tsx" />
      </DocsSection>

      <DocsSection id="banner" title={content.bannerTitle} description={content.bannerDesc}>
        <div className="relative overflow-hidden rounded-[20px] shadow-soft" style={{ paddingTop: 'var(--header-h)' }}>
          <Banner bgImage="/media/default-banners/5.jpg" height="200px" containerClassName="flex items-center justify-center px-5">
            <span className="rounded-full bg-card px-4 py-2 text-sm font-semibold shadow-soft">{content.bannerContent}</span>
          </Banner>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-center border-b border-dashed border-base-content/40 font-mono text-xs text-muted"
            style={{ height: 'var(--header-h)' }}
          >
            {content.bannerHeader}
          </div>
        </div>
        <Source label={content.sourceLabel} path="src/packages/components/layouts/Header/Banner.tsx" />
      </DocsSection>

      <DocsSection id="image" title={content.imageTitle} description={content.imageDesc}>
        <div className="max-w-3xl">
          <ContentImage
            src="/media/blog/adobe-acrobat-irony-unix-philosophy-building-software/banner.jpg"
            alt={content.imageAlt}
            width={1200}
            height={720}
          />
        </div>
        <Source label={content.sourceLabel} path="src/modules/Content/components/ContentImage.tsx" />
      </DocsSection>

      <DocsSection id="code" title={content.codeTitle} description={content.codeDesc}>
        <div className="parser prose prose-sm w-full max-w-3xl sm:prose-base">
          <ContentCodeBlock>
            <code>{SAMPLE_CODE}</code>
          </ContentCodeBlock>
        </div>
        <Source label={content.sourceLabel} path="src/modules/Content/components/ContentCodeBlock.tsx" />
      </DocsSection>

      <DocsSection id="terminal" title={content.terminalTitle} description={content.terminalDesc}>
        <Stage>
          <HeroTerminal lang={lang} currently={content.terminalNow} className="h-[220px] w-full max-w-[420px] lg:h-[220px] lg:w-full" />
        </Stage>
        <Source label={content.sourceLabel} path="src/modules/Home/components/HeroTerminal.tsx" />
      </DocsSection>
    </DocsShell>
  );
}

export default ComponentsPage;
