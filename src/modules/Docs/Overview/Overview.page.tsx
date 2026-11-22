import Fs from 'fs/promises';
import path from 'path';

import { NextPageProps } from '@/@types/global';
import CodeSnippet from '@/modules/Docs/components/CodeSnippet';
import DocsSection from '@/modules/Docs/components/DocsSection';
import DocsShell from '@/modules/Docs/components/DocsShell';
import withDocsLocales from '@/modules/Docs/Docs.locales';
import { DOCS_PAGES } from '@/modules/Docs/Docs.shared';
import withOverviewLocales from '@/modules/Docs/Overview/Overview.locales';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage, getLocalizedPathname } from '@/packages/libs/I18n/utils';

/** the packages worth naming, with the job each does here */
const STACK: { name: string; role: string }[] = [
  { name: 'next', role: 'App Router, static params, ImageResponse for OG images' },
  { name: 'react', role: 'UI' },
  { name: 'tailwindcss', role: 'styles, theme tokens as utilities' },
  { name: 'daisyui', role: 'gading-light and gading-dark themes, primitives' },
  { name: 'mdx-bundler', role: 'compiles each post at build time' },
  { name: 'typescript', role: 'types' },
  { name: 'cloudinary', role: 'media sync script (devDependency)' },
  { name: 'swr-global-state', role: 'small shared client state' }
];

async function readVersions() {
  const raw = await Fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8');
  const pkg = JSON.parse(raw) as { dependencies: Record<string, string>; devDependencies: Record<string, string> };
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  return STACK.map((item) => ({ ...item, version: all[item.name] ?? 'not installed' }));
}

const CARD_KEYS = {
  pipeline: 'pipelineCard',
  colors: 'colorsCard',
  typography: 'typographyCard',
  components: 'componentsCard'
} as const;

async function OverviewPage(props: NextPageProps<{ lang: I18nLocales }>) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const content = withOverviewLocales(lang);
  const labels = withDocsLocales(lang);
  const versions = await readVersions();

  return (
    <DocsShell lang={lang} active="overview" title={content.title} description={content.description}>
      <DocsSection title={content.stackTitle} description={content.stackDesc}>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {versions.map((item) => (
            <li key={item.name} className="rounded-[20px] bg-card p-5 shadow-soft">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-lg font-bold">{item.name}</span>
                <span className="font-mono text-xs text-muted">{item.version}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{item.role}</p>
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection title={content.flowTitle} description={content.flowDesc}>
        <picture>
          <source media="(min-width: 768px)" srcSet="/media/docs/pipeline-wide.png" width={1920} height={1080} />
          { }
          <img
            src="/media/docs/pipeline-tall.png"
            alt={content.diagramAlt}
            width={1080}
            height={2380}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[520px] rounded-[20px] shadow-soft md:max-w-none"
          />
        </picture>
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CodeSnippet
            file="src/modules/Content/services/content-parser.ts"
            code={`export async function getAllBlogPaths() {
  const paths = await Promise.all(Object.keys(I18n).map(getAllBlogMeta));
  return paths.flat(1).map(({ meta, locale }) => ({
    lang: locale,
    slug: meta.slugOriginal
  }));
}`}
          />
          <CodeSnippet
            file="src/app/(base)/[lang]/blog/[slug]/page.ts"
            code={`export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsWithLang;`}
          />
        </div>
        <p className="mt-6 max-w-3xl rounded-2xl bg-rose-soft px-5 py-4 text-sm text-base-content">
          {content.revalidateNote}
        </p>
      </DocsSection>

      <DocsSection title={content.pagesTitle}>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {DOCS_PAGES.filter((page) => page.key !== 'overview').map((page) => (
            <li key={page.key} className="lift relative rounded-[20px] bg-card p-6 shadow-soft">
              <span className="font-mono text-xs text-muted">{page.href}</span>
              <h3 className="mt-1 font-display text-xl font-bold">
                <NextLink
                  href={getLocalizedPathname(page.href, lang)}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {labels[page.key]}
                </NextLink>
              </h3>
              <p className="mt-1.5 text-sm text-muted">{content[CARD_KEYS[page.key as keyof typeof CARD_KEYS]]}</p>
            </li>
          ))}
        </ul>
      </DocsSection>
    </DocsShell>
  );
}

export default OverviewPage;
