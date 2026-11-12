import cn from '@/designs/utils/cn';
import Emphasis from '@/packages/components/base/Displays/Emphasis';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import type { Project, ProjectTone } from '../Portfolio.data';

interface Props {
  project: Project;
  lang: I18nLocales;
  /** `feature` is the big Home card: larger title, chat mock and the sticker */
  variant?: 'feature' | 'standard';
  className?: string;
}

const TONES: Record<ProjectTone, { label: string; link: string }> = {
  brand: { label: 'bg-brand-soft text-brand', link: 'text-brand' },
  teal: { label: 'bg-teal-soft text-teal', link: 'text-teal' },
  rose: { label: 'bg-rose-soft text-rose', link: 'text-rose' },
  lilac: { label: 'bg-lilac-soft text-lilac', link: 'text-lilac' }
};

function ProjectCard({ project, lang, variant = 'standard', className }: Props) {
  const { tone, tag, title, summary, chips, link, chat } = project;
  const isFeature = variant === 'feature';
  const linkClassName = cn(['mt-auto font-mono text-sm font-medium', TONES[tone].link]);

  return (
    <article
      className={cn([
        'relative flex flex-col gap-3 rounded-3xl bg-card p-7 shadow-soft',
        className
      ])}
    >
      {isFeature && (
        // the one sticker of the page, kept on the Home card only
        <span className="absolute -top-3.5 right-4 rotate-6 rounded-xl bg-lilac-soft px-3.5 py-px font-hand text-[22px] text-lilac shadow-soft sm:right-6">
          my baby ♡
        </span>
      )}

      <span className={cn(['self-start rounded-full px-[11px] py-1 font-mono text-xs font-medium', TONES[tone].label])}>
        {tag}
      </span>

      <h3
        className={cn([
          'font-display font-bold tracking-tight',
          isFeature ? 'text-[28px] leading-[1.1] sm:text-4xl' : 'text-2xl'
        ])}
      >
        {title[lang]}
      </h3>

      <p className="text-[15px] text-muted">
        <Emphasis text={summary[lang]} />
      </p>

      {isFeature && chat && (
        <div className="flex flex-col gap-2.5 rounded-[18px] bg-base-100 p-4 text-sm">
          <div className="max-w-[82%] self-end rounded-2xl rounded-br-[4px] bg-base-content px-3.5 py-[9px] text-base-100">
            {chat.user[lang]}
            <small className="mt-0.5 block font-mono text-[11px] opacity-60">{chat.time}</small>
          </div>
          <div className="max-w-[82%] rounded-2xl rounded-bl-[4px] bg-card px-3.5 py-[9px] shadow-soft">
            {chat.agent[lang]}
            <small className="mt-0.5 block font-mono text-[11px] opacity-60">
              {chat.agentName} · {chat.time}
            </small>
          </div>
        </div>
      )}

      {chips && chips.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip} className="rounded-full bg-base-100 px-2.5 py-1 font-mono text-xs font-medium text-muted">
              {chip}
            </li>
          ))}
        </ul>
      )}

      {link.target.type === 'external' ? (
        <a
          href={link.target.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn([linkClassName, 'hover:underline underline-offset-4'])}
          data-umami-event={`project_${project.id}`}
        >
          {link.label[lang]}
        </a>
      ) : (
        <NextLink
          withCurrentLocale
          href={link.target.path[lang]}
          className={cn([linkClassName, 'hover:underline underline-offset-4'])}
          data-umami-event={`project_${project.id}`}
        >
          {link.label[lang]}
        </NextLink>
      )}
    </article>
  );
}

export default ProjectCard;
