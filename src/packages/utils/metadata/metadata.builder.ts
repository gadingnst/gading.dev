import { Metadata } from 'next';

import { AUTHOR_NAME } from '@/configs/author';
import { BASE_URL, GOOGLE_VERIFICATION_ID, SITE_NAME } from '@/configs/sites';
import cloudinary from '@/packages/libs/Cloudinary/utils';
import dt from '@/packages/libs/DayJS/dt';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import languageLabel from '@/packages/libs/I18n/label';

interface IMetaBuilder {
  locale?: I18nLocales;
  meta: {
    title: string;
    slug: string;
    description?: string;
    keywords?: string;
    date?: string;
    image?: string;
    tags?: string[];
  };
}

const thumbnail = (imageUrl: string) => cloudinary(imageUrl, { scale: 0.5 });

export function metadataBuilder({ meta, locale = 'en' }: IMetaBuilder) {
  const {
    title,
    slug,
    description = 'Software Engineer from Palembang, Indonesia 🇮🇩',
    image = '/media/authors/gading-chibi-close-signature.png',
    date = dt().format('YYYY-MM-DD'),
    keywords = '',
    tags = []
  } = meta;

  const url = `${BASE_URL}${locale ? `/${locale}` : ''}${slug}`;

  const featuredImage = thumbnail(image);

  const combinedKeywords = [...tags, keywords].join(', ')
    + 'gading\'s hideout, gadingnst, gadingnstn, gadingdev, gading.dev, gading dev, gading fadhillah, gading developer, sutan nasution, sutan nst, gading nst, gading homepage, gading, sutan gading, sutan gading fadhillah nasution, sutan, sutanlab, gading\'s website, gading website, developer, developer services, programmer, frontend, fullstack, sutanlab';

  const metaTags: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: `${title} | ${SITE_NAME}`,
    description: description,
    keywords: combinedKeywords,
    authors: [{
      name: AUTHOR_NAME,
      url: BASE_URL
    }],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: description,
      url: url,
      siteName: SITE_NAME,
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`
        }
      ],
      locale: locale,
      type: 'article',
      publishedTime: date,
      authors: [AUTHOR_NAME],
      tags: tags
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description: description,
      images: [featuredImage]
    },
    alternates: {
      canonical: url
    },
    verification: {
      google: GOOGLE_VERIFICATION_ID
    },
    robots: {
      index: true,
      follow: true
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME
    },
    other: {
      'revisit-after': '7 days',
      'Content-Type': 'text/html; charset=utf-8',
      language: languageLabel[locale]
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico'
    }
  };

  return metaTags;
}
