import { generateBlogPathsWithLang } from '@/modules/Blog/BlogContent.page';
import { renderPostShareImage, SHARE_FORMATS, ShareFormat } from '@/modules/Blog/og/PostOgImage';
import { I18nLocales } from '@/packages/libs/I18n/interface';

/** `/{lang}/blog/{slug}/share/{9x16|4x5|1x1}.jpg`: written as real .jpg files by the static export */
export const dynamic = 'force-static';

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths = await generateBlogPathsWithLang();
  return paths.flatMap((path) => SHARE_FORMATS.map((format) => ({ ...path, file: `${format}.jpg` })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; lang: I18nLocales; file: string }> }) {
  const { slug, lang, file } = await params;
  return renderPostShareImage(slug, lang, file.replace(/\.jpg$/, '') as ShareFormat);
}
