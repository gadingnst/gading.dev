import { NextPageProps } from '@/@types/global';
import cn from '@/designs/utils/cn';
import DocsSection from '@/modules/Docs/components/DocsSection';
import DocsShell from '@/modules/Docs/components/DocsShell';
import { generateDocsPathsDefault, generateDocsPathsWithLang } from '@/modules/Docs/Docs.shared';
import { FAMILIES, FamilyKey, SCALE } from '@/modules/Docs/Typography/Typography.data';
import withTypographyLocales from '@/modules/Docs/Typography/Typography.locales';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export const generateDocsTypographyWithLang = generateDocsPathsWithLang;

export const generateDocsTypographyDefault = generateDocsPathsDefault;

const JOB_KEYS: Record<FamilyKey, 'sansJob' | 'displayJob' | 'monoJob' | 'handJob'> = {
  sans: 'sansJob',
  display: 'displayJob',
  mono: 'monoJob',
  hand: 'handJob'
};

const WEIGHT_CLASS: Record<number, string> = {
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold'
};

async function TypographyPage(props: NextPageProps<{ lang: I18nLocales }>) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const content = withTypographyLocales(lang);

  return (
    <DocsShell lang={lang} active="typography" title={content.title} description={content.description}>
      <DocsSection id="families" title={content.familiesTitle} description={content.familiesDesc}>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {FAMILIES.map((family) => (
            <li key={family.key} className="rounded-[20px] bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-lg font-bold">{family.name}</span>
                <span className="font-mono text-xs text-muted">{family.utility}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{content[JOB_KEYS[family.key]]}</p>
              <div className={cn(['mt-5 break-words text-[44px] leading-none', family.className])}>Aa Gg 123</div>
              <div className={cn(['mt-3 break-words text-lg', family.className])}>
                The quick brown fox jumps over the lazy dog.
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {family.weights.map((weight) => (
                  <li
                    key={weight}
                    className={cn(['rounded-full bg-base-200 px-3 py-1 text-sm', family.className, WEIGHT_CLASS[weight]])}
                  >
                    {weight}
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-mono text-xs text-muted">var({family.variable})</div>
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection id="scale" title={content.scaleTitle} description={content.scaleDesc}>
        <ul className="overflow-hidden rounded-[20px] bg-card shadow-soft">
          {SCALE.map((step) => (
            <li
              key={step.role}
              className="grid grid-cols-1 gap-2 border-b border-line px-5 py-5 last:border-b-0 md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 md:px-6"
            >
              <div>
                <div className="text-sm font-semibold">{step.role}</div>
                <div className="text-xs text-muted">{step.where}</div>
              </div>
              <div className="min-w-0">
                <div className={cn(['break-words', step.classes])}>{content.scaleSample}</div>
                <code className="mt-2 block break-words font-mono text-xs text-muted">{step.classes}</code>
              </div>
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection id="prose" title={content.proseTitle} description={content.proseDesc}>
        <div className="rounded-[20px] bg-card p-6 shadow-soft md:p-10">
          <div className="parser prose prose-sm w-full max-w-full sm:prose-base">
            <h2>{content.proseHeading}</h2>
            <p>
              {content.proseBody1} <a href="#prose">mdx-bundler</a>, <strong>output: &apos;export&apos;</strong>,{' '}
              <code>generateStaticParams</code>.
            </p>
            <blockquote>
              <p>{content.proseQuote}</p>
            </blockquote>
            <ul>
              <li>{content.proseItem1}</li>
              <li>{content.proseItem2}</li>
            </ul>
            <h3>{content.proseSubheading}</h3>
            <p>{content.proseBody2}</p>
          </div>
        </div>
      </DocsSection>
    </DocsShell>
  );
}

export default TypographyPage;
