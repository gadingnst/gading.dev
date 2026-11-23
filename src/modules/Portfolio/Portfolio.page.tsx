import { NextPageProps } from '@/@types/global';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

import ProjectCard from './components/ProjectCard';
import { PROJECTS, TALKS, WORK } from './Portfolio.data';
import withPortfolioLocales from './Portfolio.locales';

export async function generatePortfolioPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generatePortfolioPathsDefault() {
  return [{}];
}

async function PortfolioPage(props: NextPageProps) {
  const params = await props.params;
  const lang = (params?.lang || getDefaultLanguage()) as I18nLocales;
  const content = withPortfolioLocales(lang);

  return (
    <div className="min-h-screen text-base-content">
      <div className="wide-container pb-8 pt-8 md:pt-14">
        <header className="mb-10 max-w-2xl md:mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-[56px] md:leading-[1.08]">
            {content.title}
          </h1>
          <p className="mt-4 text-base text-muted md:text-lg">{content.desc}</p>
        </header>

        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-[32px]">{content.buildingTitle}</h2>
          <p className="mt-1.5 text-muted">{content.buildingDesc}</p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-[32px]">{content.workTitle}</h2>
          <p className="mt-1.5 text-muted">{content.workDesc}</p>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {WORK.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-[32px]">{content.talksTitle}</h2>
          <p className="mt-1.5 text-muted">{content.talksDesc}</p>

          <ul className="mt-6 divide-y divide-base-content/10 rounded-3xl bg-card px-5 shadow-soft md:px-7">
            {TALKS.map((talk) => (
              <li key={`${talk.year}-${talk.title}`} className="flex items-baseline gap-4 py-4 md:gap-6">
                <span className="w-10 shrink-0 font-mono text-sm text-muted">{talk.year}</span>
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">{talk.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{talk.event}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PortfolioPage;
