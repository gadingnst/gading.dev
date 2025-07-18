import { NextPageProps } from '@/@types/global';
import withColorsLocales from '@/modules/Docs/Colors/Colors.locales';
import ColorList from '@/modules/Docs/Colors/components/ColorList';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export async function generateDocsColorsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateDocsColorsDefault() {
  return [{}];
}

async function ColorsPage(props: NextPageProps<{ lang: I18nLocales }>) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const content = withColorsLocales(lang);

  return (
    <main className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          {content.title}
        </h1>
        <p className="mt-4 text-lg text-base-content/80">
          {content.description}
        </p>
      </div>

      <ColorList />
    </main>
  );
}

export default ColorsPage;
