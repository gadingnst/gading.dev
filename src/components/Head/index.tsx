import { FunctionComponent, PropsWithChildren } from 'react';
import NextHead from 'next/head';
import { AUTHOR_FULLNAME, BASE_URL, DEFAULT_LOCALE, SITE_NAME } from '@/utils/config';
import { I18nLocales } from '@/types/contents';
import cloudinary from '@/utils/helpers/cloudinary';
import day from '@/utils/day';

export interface Props {
  locale: I18nLocales|string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    slug: string;
    date: string;
    image: string;
    tags: string[];
  };
}

const language = {
  en: 'English',
  id: 'Bahasa Indonesia'
};

const thumbnail = (imageUrl: string) => cloudinary(imageUrl, { scale: 0.15 });

const Head: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    locale = DEFAULT_LOCALE,
    meta
  } = props;

  const {
    title = SITE_NAME,
    description = 'Software Engineer from Palembang, Indonesia 🇮🇩',
    image = 'https://avatars.githubusercontent.com/u/38345393?v=4',
    date = day().format('YYYY-MM-DD'),
    keywords = '',
    slug = '',
    tags = []
  } = meta;

  const url = `${BASE_URL}/${locale}/${slug}`;
  const img = thumbnail(image);
  const combinedKeywords = `gading's hideout, sutanlab, sutan nst, gading nst, gading homepage, gading, sutan gading, sutan gading fadhillah nasution, sutan, sutanlab, gading.dev, gading dev, gading's website, gading website, developer, developer services, programmer, frontend, fullstack, sutanlab`
    + keywords + tags?.join(', ');

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="author" content={AUTHOR_FULLNAME} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={combinedKeywords} />
      <meta name="language" content={language?.[locale as I18nLocales] || language['en']} />

      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content="index, follow" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:updated_time" content={day(date).toISOString()} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={img} />
      <meta property="twitter:site" content={SITE_NAME} />
      <meta property="twitter:creator" content={AUTHOR_FULLNAME} />
      <meta property="twitter:image:alt" content={title} />

      {children}
    </NextHead>
  );
};

export default Head;
