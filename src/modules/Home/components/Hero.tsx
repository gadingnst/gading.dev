import Image from 'next/image';

import Emphasis from '@/packages/components/base/Displays/Emphasis';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import withHomeLocales from '../Home.locales';

interface Props {
  lang: I18nLocales;
  /** From the Now page frontmatter, so updating Now updates the hero */
  currently?: string;
}

/** Wavy underline under the accent words of the headline (fun element 1) */
function WavyUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-2.5 left-0 h-4 w-full overflow-visible"
    >
      <path
        d="M3 9 Q 18 2 33 9 T 63 9 T 93 9 T 123 9 T 153 9 T 183 9 T 197 8"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn arrow of the "it's me, hi!" doodle (fun element 3) */
function DoodleArrow() {
  return (
    <svg aria-hidden viewBox="0 0 44 40" className="h-10 w-11" fill="none" stroke="var(--gd-muted)" strokeWidth="2" strokeLinecap="round">
      <path d="M40 4 C 30 6, 14 14, 8 34" />
      <path d="M8 34 L 4 24 M8 34 L 17 28" />
    </svg>
  );
}

const PILL = 'absolute z-10 flex items-center gap-2 whitespace-nowrap rounded-[14px] bg-card px-[11px] py-[7px] text-xs font-semibold shadow-soft sm:px-3.5 sm:py-2.5 sm:text-[13px]';
const PILL_SMALL = 'block font-mono text-[11px] font-normal text-muted';

function Hero({ lang, currently }: Props) {
  const content = withHomeLocales(lang);

  return (
    <section className="grid grid-cols-1 items-center gap-10 pb-14 pt-7 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:pb-20 lg:pt-[70px]">
      <div>
        <span className="font-hand text-[28px] leading-none text-brand">{content.greeting}</span>
        <h1 className="mb-5 mt-1 font-display text-[38px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
          {content.headlineStart}
          <span className="relative inline-block whitespace-nowrap">
            {content.headlineAccent}
            <WavyUnderline />
          </span>
        </h1>
        <p className="max-w-[520px] text-[16.5px] text-muted lg:text-lg">
          <Emphasis text={content.lead} />
        </p>
        {currently && (
          <NextLink
            withCurrentLocale
            href="/now"
            className="mt-4 inline-flex max-w-full items-center gap-2 text-[15px] text-muted transition-colors hover:text-base-content"
            data-umami-event="homepage_currently"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-teal shadow-[0_0_0_4px_var(--gd-teal-soft)]" />
            <span className="truncate">
              <span className="font-semibold text-base-content">{content.currentlyLabel}</span> {currently}
            </span>
            <span aria-hidden>→</span>
          </NextLink>
        )}
        <div className="mt-[30px] flex flex-wrap gap-3">
          <NextLink
            withCurrentLocale
            href="/portfolio"
            className="rounded-full bg-base-content px-[22px] py-3 text-[15px] font-semibold text-base-100 transition-transform duration-200 hover:-translate-y-0.5"
            data-umami-event="homepage_see-work"
          >
            {content.seeWork}
          </NextLink>
          <NextLink
            withCurrentLocale
            href="/blog"
            className="rounded-full bg-card px-[22px] py-3 text-[15px] font-semibold shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
            data-umami-event="homepage_see-blog"
          >
            {content.readBlog}
          </NextLink>
        </div>
      </div>

      {/* Portrait: status pills and doodle sit on the edges, the face stays clear */}
      <div className="relative mt-10 flex flex-col items-center justify-self-center lg:mt-0">
        <div className="relative h-[260px] w-[230px] overflow-hidden rounded-[160px_160px_28px_28px] border-[6px] border-card bg-gradient-to-b from-brand-soft to-lilac-soft shadow-soft sm:h-[340px] sm:w-[300px] dark:border-[#2A231D]">
          <Image
            src="/media/authors/gading-illustrated.png"
            alt={content.portraitAlt}
            fill
            priority
            sizes="(min-width: 640px) 300px, 230px"
            className="object-cover object-[50%_30%]"
          />
        </div>

        {currently && (
          <NextLink withCurrentLocale href="/now" className={`${PILL} left-[-34px] top-[18px] lg:left-[-110px] lg:top-9`}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-teal shadow-[0_0_0_4px_var(--gd-teal-soft)]" />
            <div>
              {currently}
              <small className={PILL_SMALL}>{content.statusNowLabel}</small>
            </div>
          </NextLink>
        )}

        <div className={`${PILL} right-[-30px] top-[190px] sm:top-[250px] lg:bottom-[70px] lg:right-[-40px] lg:top-auto`}>
          <span aria-hidden>☕</span>
          <div>
            {content.statusPlace}
            <small className={PILL_SMALL}>UTC+7</small>
          </div>
        </div>

        {/* Terminal card (fun element 2): below the portrait on small screens so it never covers the face */}
        <div
          aria-hidden
          className="z-10 mt-[30px] -rotate-2 self-center rounded-[14px] bg-terminal px-4 py-3 font-mono text-[12.5px] leading-[1.7] text-[#F3ECE2] shadow-soft lg:absolute lg:-bottom-[22px] lg:-left-[70px] lg:mt-0 lg:-rotate-3"
        >
          <span className="text-[#5CC7B8]">$</span> whoami<br />
          gading<br />
          <span className="text-[#5CC7B8]">$</span> cat mood.txt<br />
          ngulik ☕<span className="text-[#A89C8E]"> # as usual</span>
        </div>

        <div
          aria-hidden
          className="absolute -top-[46px] -right-4 flex rotate-[7deg] items-end gap-0.5 font-hand text-xl text-muted sm:text-[23px] lg:-right-[34px] lg:-top-[30px]"
        >
          {content.doodle}
          <DoodleArrow />
        </div>
      </div>
    </section>
  );
}

export default Hero;
