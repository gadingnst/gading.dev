import { I18nLocales } from '@/packages/libs/I18n/interface';

import { WORKED_WITH, WorkedWithCompany } from '../Home.companies';
import withHomeLocales from '../Home.locales';

interface Props {
  lang: I18nLocales;
}

function Logo({ company }: { company: WorkedWithCompany }) {
  if (!company.logo) {
    const initials = company.name.split(' ').map((word) => word[0]).join('').slice(0, 2);
    return (
      <span className="grid h-6 w-6 place-items-center rounded-md bg-base-300 font-mono text-[10px] font-semibold">
        {initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static logos, no optimisation needed
    <img src={company.logo} alt="" width={24} height={24} className="h-6 w-6 rounded-md object-contain" loading="lazy" />
  );
}

function Item({ company, hidden }: { company: WorkedWithCompany; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined}>
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={hidden ? -1 : undefined}
        className="flex items-center gap-2.5 whitespace-nowrap text-[15px] text-muted grayscale opacity-80 transition hover:text-base-content hover:grayscale-0 hover:opacity-100"
      >
        <Logo company={company} />
        {company.name}
      </a>
    </li>
  );
}

/** "Worked with": logos and names only, scrolling slowly; static when motion is reduced */
function WorkedWith({ lang }: Props) {
  const content = withHomeLocales(lang);

  return (
    <section className="mb-[88px] border-y border-base-content/10 py-8">
      <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{content.workedWith}</h2>
      <div className="worked-with-mask group overflow-hidden">
        <ul className="worked-with-track flex w-max gap-10 group-hover:[animation-play-state:paused]">
          {WORKED_WITH.map((company) => <Item key={company.id} company={company} />)}
          {WORKED_WITH.map((company) => <Item key={`${company.id}-dup`} company={company} hidden />)}
        </ul>
      </div>
    </section>
  );
}

export default WorkedWith;
