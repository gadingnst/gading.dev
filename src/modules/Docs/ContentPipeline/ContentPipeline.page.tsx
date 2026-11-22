import { NextPageProps } from '@/@types/global';
import { BLOG_PAGINATION_LIMIT } from '@/configs/sites';
import { SHARE_FORMATS, SHARE_SIZES } from '@/modules/Blog/og/PostOgImage';
import { getAllBlogMeta } from '@/modules/Content/services/content-parser';
import CodeSnippet from '@/modules/Docs/components/CodeSnippet';
import DocsSection from '@/modules/Docs/components/DocsSection';
import DocsShell from '@/modules/Docs/components/DocsShell';
import withContentPipelineLocales from '@/modules/Docs/ContentPipeline/ContentPipeline.locales';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

const SNIPPETS = {
  frontmatter: `---
title: "Building Agent Memory with Vendor Lock-in Resistance (Part 2)"
slug: {
  en: "building-agent-memory-free-vendor",
  id: "membangun-agent-memory-bebas-vendor"
}
series: { id: "agent-memory", title: "Building Agent Memory", part: 2 }
---`,
  slugOriginal: 'const slugOriginal = data.slug[language];',
  pagination: `export async function generateBlogPaginationPathsWithLang() {
  const _pathsRaw = await Promise.all(Object.keys(I18n)
    .map(async(lang) => {
      const { pagination } = await getBlogList(lang);
      return range(1, pagination.pageCount)
        .map(page => ({ page: \`\${page}\`, lang }));
    }));
  const paths = _pathsRaw.flat(1);
  return paths;
};`,
  og: `/** \`/{lang}/blog/{slug}/og.png\`: written as a real .png file by the static export */
export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsWithLang;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; lang: I18nLocales }> }) {
  const { slug, lang } = await params;
  return renderPostOgImage(slug, lang);
}`,
  share: `const png = await new ImageResponse(<Layout card={card} />, { ...SHARE_SIZES[format], fonts }).arrayBuffer();
const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 85, mozjpeg: true }).toBuffer();`,
  series: `export async function getSeriesParts(meta: ContentMeta, language = DEFAULT_LOCALE): Promise<ContentMeta[]> {
  if (!meta.series?.id) return [];
  ...
    .filter((m) => m.series?.id === meta.series?.id)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));`,
  toc: `const match = /^(#{1,6})\\s+(.+?)\\s*#*\\s*$/.exec(line);
if (!match) continue;
const depth = match[1].length;
const text = toPlainText(match[2]);
const id = slugger.slug(text);
if (depth === 2 || depth === 3) {
  items.push({ id, text, depth });
}`,
  sitemap: `import generateSitemap from '@/modules/Content/services/sitemap';

export const dynamic = 'force-static';

export default generateSitemap;`
};

const WORKFLOWS = [
  { file: 'integration.yml', trigger: 'onPr', body: 'wfIntegration' },
  { file: 'cloudinary.yml', trigger: 'onDispatch', body: 'wfCloudinary' },
  { file: 'lighthouse.yml', trigger: 'onDispatch', body: 'wfLighthouse' },
  { file: 'revalidation.yml', trigger: 'onDispatch', body: 'wfRevalidation' }
] as const;

/** the example post: the agent-memory series, which exists in both languages */
const EXAMPLE_SLUG = { en: 'building-agent-memory-free-vendor', id: 'membangun-agent-memory-bebas-vendor' };

async function ContentPipelinePage(props: NextPageProps<{ lang: I18nLocales }>) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const content = withContentPipelineLocales(lang);
  const posts = await getAllBlogMeta(lang);
  const pageCount = Math.ceil(posts.length / BLOG_PAGINATION_LIMIT);
  const ogSrc = `/${lang}/blog/${EXAMPLE_SLUG[lang]}/og.png`;

  return (
    <DocsShell lang={lang} active="pipeline" title={content.title} description={content.description}>
      <DocsSection id="slugs" title={content.slugsTitle} description={content.slugsDesc}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CodeSnippet file={`src/contents/posts/en/${EXAMPLE_SLUG.en}.mdx`} code={SNIPPETS.frontmatter} lang="markdown" />
          <CodeSnippet file="src/modules/Content/services/content-parser.ts (getBlogMeta)" code={SNIPPETS.slugOriginal} lang="ts" />
        </div>
      </DocsSection>

      <DocsSection id="pagination" title={content.paginationTitle} description={content.paginationDesc}>
        <CodeSnippet file="src/modules/Blog/BlogListPagination.page.tsx" code={SNIPPETS.pagination} lang="tsx" />
        <p className="mt-4 font-mono text-sm text-muted">
          {lang}: {posts.length} posts / {BLOG_PAGINATION_LIMIT} = {pageCount} {pageCount === 1 ? 'page' : 'pages'}
        </p>
      </DocsSection>

      <DocsSection id="og" title={content.ogTitle} description={content.ogDesc}>
        <CodeSnippet file="src/app/(base)/[lang]/blog/[slug]/og.png/route.tsx" code={SNIPPETS.og} lang="tsx" />
        <p className="mt-6 text-sm text-muted">{content.ogLive}</p>
        <a href={ogSrc} target="_blank" rel="noopener noreferrer" className="mt-3 block max-w-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogSrc}
            alt={`og.png: ${EXAMPLE_SLUG[lang]}`}
            width={1200}
            height={630}
            loading="lazy"
            className="h-auto w-full rounded-[20px] shadow-soft"
          />
          <span className="mt-2 block break-all font-mono text-xs text-muted">{ogSrc}</span>
        </a>
      </DocsSection>

      <DocsSection id="share" title={content.shareTitle} description={content.shareDesc}>
        <CodeSnippet file="src/modules/Blog/og/PostOgImage.tsx (renderPostShareImage)" code={SNIPPETS.share} lang="tsx" />
        <ul className="mt-6 grid grid-cols-3 items-end gap-3 sm:gap-5 max-w-2xl">
          {SHARE_FORMATS.map((format) => {
            const src = `/${lang}/blog/${EXAMPLE_SLUG[lang]}/share/${format}.jpg`;
            const { width, height } = SHARE_SIZES[format];
            return (
              <li key={format}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${format}.jpg`}
                    width={width}
                    height={height}
                    loading="lazy"
                    className="h-auto w-full rounded-xl shadow-soft"
                  />
                  <span className="mt-2 block font-mono text-xs text-muted">{format} · {width}x{height}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </DocsSection>

      <DocsSection id="series" title={content.seriesTitle} description={content.seriesDesc}>
        <CodeSnippet file="src/modules/Content/services/content-parser.ts" code={SNIPPETS.series} lang="ts" />
      </DocsSection>

      <DocsSection id="toc" title={content.tocTitle} description={content.tocDesc}>
        <CodeSnippet file="src/modules/Blog/services/toc.ts" code={SNIPPETS.toc} lang="ts" />
      </DocsSection>

      <DocsSection id="sitemap" title={content.sitemapTitle} description={content.sitemapDesc}>
        <CodeSnippet file="src/app/sitemap.ts" code={SNIPPETS.sitemap} lang="ts" />
      </DocsSection>

      <DocsSection id="workflows" title={content.workflowsTitle} description={content.workflowsDesc}>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {WORKFLOWS.map((wf) => (
            <li key={wf.file} className="rounded-[20px] bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm font-medium">.github/workflows/{wf.file}</span>
                <span
                  className={wf.trigger === 'onPr'
                    ? 'rounded-full bg-teal-soft px-[11px] py-1 font-mono text-xs font-medium text-teal'
                    : 'rounded-full bg-lilac-soft px-[11px] py-1 font-mono text-xs font-medium text-lilac'}
                >
                  {content[wf.trigger]}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">{content[wf.body]}</p>
            </li>
          ))}
        </ul>
      </DocsSection>
    </DocsShell>
  );
}

export default ContentPipelinePage;
