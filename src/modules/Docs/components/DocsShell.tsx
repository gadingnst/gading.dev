import { PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';
import withDocsLocales from '@/modules/Docs/Docs.locales';
import { DOCS_PAGES, DocsPageKey } from '@/modules/Docs/Docs.shared';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getLocalizedPathname } from '@/packages/libs/I18n/utils';

interface Props {
  lang: I18nLocales;
  active: DocsPageKey;
  title: string;
  description: string;
}

/**
 * Frame of every docs page: eyebrow, title, the row of docs tabs and the body.
 * The tabs only live inside /docs; the site navbar never links here.
 */
function DocsShell({ lang, active, title, description, children }: PropsWithChildren<Props>) {
  const labels = withDocsLocales(lang);

  return (
    <div className="min-h-screen text-base-content">
      <div className="wide-container pb-8 pt-8 md:pt-14">
        <header className="max-w-2xl">
          <span className="font-hand text-[24px] leading-none text-brand">{labels.eyebrow}</span>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-[52px] md:leading-[1.08]">
            {title}
          </h1>
          <p className="mt-4 text-base text-muted md:text-lg">{description}</p>
        </header>

        <nav aria-label={labels.navLabel} className="-mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 pb-1">
            {DOCS_PAGES.map((page) => {
              const isActive = page.key === active;
              return (
                <li key={page.key}>
                  <NextLink
                    href={getLocalizedPathname(page.href, lang)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn([
                      'block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-base-content text-base-100'
                        : 'bg-card text-base-content shadow-soft hover:text-brand'
                    ])}
                  >
                    {labels[page.key]}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </div>
  );
}

export default DocsShell;
