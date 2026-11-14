import { NextPageProps } from '@/@types/global';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

import ProjectCard from './components/ProjectCard';
import { PROJECTS, WORK } from './Portfolio.data';
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
      </div>
    </div>
  );
}

export default PortfolioPage;
