'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, type KeyboardEvent, useEffect, useId, useRef, useState } from 'react';

import type { SearchIndexPost } from '@/app/search-index.json/route';
import cn from '@/designs/utils/cn';
import { loadSearchIndex } from '@/modules/Blog/utils/search-index';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getLocalizedPathname } from '@/packages/libs/I18n/utils';

import useMood from '../hooks/useMood';
import withHeroTerminalLocales from './HeroTerminal.locales';

interface Props {
  lang: I18nLocales;
  /** the "Currently" line of the Now page, printed by `cat now.txt` */
  currently?: string;
  className?: string;
}

/** `mood` is printed live, so clicking the portrait changes what the first screen says */
interface Line {
  id: number;
  kind: 'cmd' | 'out' | 'muted' | 'mood';
  text: string;
}

const POSTS_LISTED = 5;
const PROMPT_CLASS = 'text-[#5CC7B8]';

let lineId = 0;
function line(kind: Line['kind'], text = ''): Line {
  lineId += 1;
  return { id: lineId, kind, text };
}

function welcomeLines(): Line[] {
  return [line('cmd', 'whoami'), line('out', 'syahrul'), line('cmd', 'cat mood.txt'), line('mood')];
}

/**
 * The `$ whoami` card of the hero as a tiny shell: a few commands, arrow-key
 * history, and `ls posts` / `open` reading the same index as the command palette.
 * Fixed size with its own scroll, so typing never moves the page.
 */
function HeroTerminal({ lang, currently, className }: Props) {
  const router = useRouter();
  const content = withHeroTerminalLocales(lang);
  const { mood } = useMood();
  const inputId = useId();

  const [lines, setLines] = useState<Line[]>(welcomeLines);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listedRef = useRef<SearchIndexPost[]>([]);

  // keep the newest output in view, inside the card only
  useEffect(() => {
    const box = scrollRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  const print = (...next: Line[]) => setLines((prev) => [...prev, ...next]);

  const listPosts = async() => {
    const loading = line('muted', content.loading);
    print(loading);
    try {
      const index = await loadSearchIndex();
      const posts = index[lang].slice(0, POSTS_LISTED);
      listedRef.current = posts;
      setLines((prev) => [
        ...prev.filter((item) => item.id !== loading.id),
        ...posts.map((post, i) => line('out', `${i + 1}  ${post.title}`)),
        line('muted', content.lsHint)
      ]);
    } catch {
      setLines((prev) => [...prev.filter((item) => item.id !== loading.id), line('out', content.loadFailed)]);
    }
  };

  const openPost = async(arg: string) => {
    if (!arg) return print(line('out', content.openUsage));
    let post: SearchIndexPost | undefined;
    const asNumber = Number(arg);
    if (Number.isInteger(asNumber) && asNumber > 0) {
      post = listedRef.current[asNumber - 1];
    }
    if (!post) {
      try {
        const index = await loadSearchIndex();
        post = index[lang].find((item) => item.slug === arg);
      } catch {
        return print(line('out', content.loadFailed));
      }
    }
    if (!post) return print(line('out', `${content.openNotFound} ${arg}`));
    print(line('muted', `${content.opening} ${post.slug}…`));
    router.push(getLocalizedPathname(`/blog/${post.slug}`, lang));
  };

  const run = (raw: string) => {
    const input = raw.trim();
    const [cmd = '', ...args] = input.split(/\s+/);
    const arg = args.join(' ');

    if (cmd === 'clear') return setLines([]);
    print(line('cmd', input));
    if (!cmd) return;

    switch (cmd) {
      case 'help':
        return print(line('out', content.help));
      case 'whoami':
        return print(line('out', 'syahrul'));
      case 'cat':
        if (arg === 'now.txt') return print(line('out', currently || content.nowEmpty));
        if (arg === 'mood.txt') return print(line('mood'));
        return print(line('out', arg ? `cat: ${arg}: ${content.catMissing}` : content.catUsage));
      case 'ls':
        if (arg === 'posts' || arg === 'posts/') return void listPosts();
        return print(line('out', content.lsUsage));
      case 'open':
        return void openPost(arg);
      case 'sudo':
        return print(line('out', content.sudo));
      default:
        return print(line('out', content.notFound.replace('{cmd}', cmd)));
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(value);
    if (value.trim()) setHistory((prev) => [...prev, value.trim()]);
    setHistoryIndex(null);
    setValue('');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    if (!history.length) return;
    event.preventDefault();
    const last = history.length - 1;
    let next: number | null;
    if (event.key === 'ArrowUp') {
      next = historyIndex === null ? last : Math.max(0, historyIndex - 1);
    } else {
      next = historyIndex === null || historyIndex >= last ? null : historyIndex + 1;
    }
    setHistoryIndex(next);
    setValue(next === null ? '' : history[next]);
  };

  return (
    <div
      className={cn(
        'hero-terminal flex h-[184px] w-[292px] max-w-full lg:h-[150px] lg:w-[264px] cursor-text flex-col rounded-[14px] bg-terminal px-4 py-3 font-mono text-[12.5px] leading-[1.7] text-[#F3ECE2] shadow-soft',
        className
      )}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div ref={scrollRef} className="hero-terminal-scroll min-h-0 flex-1 overflow-y-auto" aria-live="polite">
        {lines.map((item) => (
          <TerminalLine key={item.id} line={item} moodText={`${mood.label[lang]} ${mood.emoji}`} asUsual={content.asUsual} />
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <label htmlFor={inputId} className="sr-only">{content.inputLabel}</label>
        <span aria-hidden className={PROMPT_CLASS}>$</span>
        <input
          ref={inputRef}
          id={inputId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={content.placeholder}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-[#F3ECE2] caret-[#5CC7B8] outline-none placeholder:text-[#A89C8E] sm:text-[12.5px]"
        />
      </form>
    </div>
  );
}

function TerminalLine({ line: item, moodText, asUsual }: { line: Line; moodText: string; asUsual: string }) {
  if (item.kind === 'cmd') {
    return (
      <div className="break-words">
        <span aria-hidden className={PROMPT_CLASS}>$</span> {item.text}
      </div>
    );
  }
  if (item.kind === 'mood') {
    return (
      <div>
        {moodText}
        <span className="text-[#A89C8E]"> {asUsual}</span>
      </div>
    );
  }
  return <div className={cn('whitespace-pre-wrap break-words', item.kind === 'muted' && 'text-[#A89C8E]')}>{item.text}</div>;
}

export default HeroTerminal;
