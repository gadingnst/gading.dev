import { NextPageProps } from '@/@types/global';
import { BASE_TOKENS, CONTRAST_PAIRS, SOFT_TOKENS } from '@/modules/Docs/Colors/Colors.data';
import withColorsLocales from '@/modules/Docs/Colors/Colors.locales';
import ColorList from '@/modules/Docs/Colors/components/ColorList';
import { ContrastTable, TokenCompare } from '@/modules/Docs/Colors/components/ThemeCompare';
import { readThemeTokens } from '@/modules/Docs/Colors/services/theme-tokens';
import DocsSection from '@/modules/Docs/components/DocsSection';
import DocsShell from '@/modules/Docs/components/DocsShell';
import { generateDocsPathsDefault, generateDocsPathsWithLang } from '@/modules/Docs/Docs.shared';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export const generateDocsColorsWithLang = generateDocsPathsWithLang;

export const generateDocsColorsDefault = generateDocsPathsDefault;

const SOFT_UTILITIES = Object.fromEntries(SOFT_TOKENS.map(({ token, utility }) => [token, utility]));

async function ColorsPage(props: NextPageProps<{ lang: I18nLocales }>) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const content = withColorsLocales(lang);
  const themes = await readThemeTokens();

  return (
    <DocsShell lang={lang} active="colors" title={content.title} description={content.description}>
      <DocsSection id="compare" title={content.compareTitle} description={content.compareDesc}>
        <TokenCompare themes={themes} tokens={BASE_TOKENS} />
      </DocsSection>

      <DocsSection id="soft" title={content.softTitle} description={content.softDesc}>
        <TokenCompare themes={themes} tokens={SOFT_TOKENS.map(({ token }) => token)} utilities={SOFT_UTILITIES} />
      </DocsSection>

      <DocsSection id="contrast" title={content.contrastTitle} description={content.contrastDesc}>
        <ContrastTable themes={themes} pairs={CONTRAST_PAIRS} />
      </DocsSection>

      <DocsSection id="live" title={content.liveTitle} description={content.liveDesc}>
        <ColorList />
      </DocsSection>
    </DocsShell>
  );
}

export default ColorsPage;
