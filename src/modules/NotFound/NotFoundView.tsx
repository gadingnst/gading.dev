'use client';

import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';

import { AUTHOR_NAME } from '@/configs/author';
import Image from '@/packages/components/base/Displays/Image';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import dt from '@/packages/libs/DayJS/dt';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import createContentLocales from '@/packages/libs/I18n/locales';

export interface NotFoundPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
}

interface Props {
  postsByLanguage: Record<string, NotFoundPost[]>;
}

const withLocales = createContentLocales({
  title: {
    en: 'Page Not Found',
    id: 'Halaman Tidak Ditemukan'
  },
  line: {
    en: 'This page wandered off, or never existed. Probably a link I broke along the way.',
    id: 'Halaman ini hilang, atau memang tidak pernah ada. Mungkin link yang saya rusak di tengah jalan.'
  },
  button: {
    en: 'Go Home',
    id: 'Kembali ke Beranda'
  },
  latest: {
    en: 'Or read something recent',
    id: 'Atau baca tulisan terbaru'
  }
});

function NotFoundView({ postsByLanguage }: Props) {
  const language = useLangugage();
  const locales = useMemo(() => withLocales(language), [language]);
  const posts = postsByLanguage[language] ?? [];

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16 text-base-content">
      <div className="w-full max-w-lg text-center">
        <Image
          src="/android-chrome-192x192.png"
          alt={AUTHOR_NAME}
          width={96}
          height={96}
          className="mx-auto h-24 w-24 rounded-full shadow-soft"
          wrapperClassName="mx-auto"
        />
        <p className="mt-6 font-mono text-sm font-semibold uppercase tracking-widest text-brand">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{locales.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base opacity-80">{locales.line}</p>
        <NextLink withCurrentLocale href="/" className="btn btn-primary mt-8 rounded-full px-6">
          {locales.button}
        </NextLink>
      </div>

      {posts.length > 0 && (
        <section className="mt-14 w-full max-w-lg" aria-labelledby="not-found-latest">
          <h2 id="not-found-latest" className="mb-3 text-center text-sm font-semibold uppercase tracking-wider opacity-60">
            {locales.latest}
          </h2>
          <ul className="flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <NextLink
                  withCurrentLocale
                  href={`/blog/${post.slug}`}
                  className="group flex items-center gap-4 rounded-box border border-base-content/10 bg-base-200/60 px-5 py-4 transition-colors hover:border-primary/40"
                >
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-display font-semibold leading-snug group-hover:text-primary">{post.title}</p>
                    <p className="mt-1 text-xs opacity-60">
                      {dt(post.date).format('MMM DD, YYYY')} · {post.readTime}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </NextLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default NotFoundView;
