import { generateBlogPathsWithLang } from '@/modules/Blog/BlogContent.page';
import { renderPostOgImage } from '@/modules/Blog/og/PostOgImage';
import { I18nLocales } from '@/packages/libs/I18n/interface';

/** `/{lang}/blog/{slug}/og.png`: written as a real .png file by the static export */
export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsWithLang;

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; lang: I18nLocales }> }) {
  const { slug, lang } = await params;
  return renderPostOgImage(slug, lang);
}
