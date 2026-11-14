'use client';

import { Briefcase, Clock, FileText, Home, Languages, type LucideIcon, Moon, PenTool, Search, Sun, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { type KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import type { SearchIndex } from '@/app/search-index.json/route';
import cn from '@/designs/utils/cn';
import useBlogContentLanguages from '@/modules/Blog/hooks/useBlogContentLanguages';
import { matchesPostQuery } from '@/modules/Blog/utils/search';
import { AppThemes } from '@/packages/libs/AppTheme/constants';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getLocalizedPathname } from '@/packages/libs/I18n/utils';

import withCommandPaletteLocales from './CommandPalette.locales';
import useCommandPalette from './useCommandPalette';

interface PaletteItem {
  id: string;
  group: 'pages' | 'actions' | 'posts';
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
}

const PAGES: { label: string; href: string; icon: LucideIcon; localized: boolean }[] = [
  { label: 'Home', href: '/', icon: Home, localized: true },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase, localized: true },
  { label: 'Blog', href: '/blog', icon: PenTool, localized: true },
  { label: 'Now', href: '/now', icon: Clock, localized: true },
  { label: 'About', href: '/about', icon: User, localized: true },
  // the resume has one language only, no /id variant
  { label: 'Resume', href: '/resume', icon: FileText, localized: false }
];

const MAX_POSTS = 8;

/** index is fetched once per page load and shared by every open */
let searchIndexPromise: Promise<SearchIndex> | null = null;
function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch('/search-index.json')
      .then((res) => {
        if (!res.ok) throw new Error(`search index: ${res.status}`);
        return res.json() as Promise<SearchIndex>;
      })
      .catch((err) => {
        searchIndexPromise = null;
        throw err;
      });
  }
  return searchIndexPromise;
}

/**
 * Cmd+K / Ctrl+K palette: search posts, jump to a page, toggle the theme, switch language.
 * Mounted once in the base layout; the mobile header menu opens it through `useCommandPalette`.
 */
export default function CommandPalette() {
  const { isOpen, setIsOpen } = useCommandPalette();

  // global shortcut, also closes when already open
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;
  return <PaletteDialog onClose={() => setIsOpen(false)} />;
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const lang = useLangugage();
  const locales = withCommandPaletteLocales(lang);
  const { isDark, setTheme } = useAppTheme();
  const { contentSlugByLanguages } = useBlogContentLanguages();

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [indexFailed, setIndexFailed] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  useEffect(() => {
    let cancelled = false;
    loadSearchIndex()
      .then((data) => !cancelled && setIndex(data))
      .catch(() => !cancelled && setIndexFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // focus the input, lock page scroll, give focus back on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const otherLang: I18nLocales = lang === 'en' ? 'id' : 'en';

  const items = useMemo<PaletteItem[]>(() => {
    const go = (href: string) => () => {
      onClose();
      router.push(href);
    };

    const pages: PaletteItem[] = PAGES.map((page) => ({
      id: `page:${page.href}`,
      group: 'pages',
      label: page.label,
      icon: page.icon,
      run: go(page.localized ? getLocalizedPathname(page.href, lang) : page.href)
    }));

    // on a post, the other language has its own slug; elsewhere the same path with the other prefix
    const otherLangHref = contentSlugByLanguages.find((item) => item.code === otherLang)?.href
      ?? getLocalizedPathname(pathname || '/', otherLang);
    const hasOtherLang = contentSlugByLanguages.length === 0 || contentSlugByLanguages.some((item) => item.code === otherLang);

    const actions: PaletteItem[] = [
      {
        id: 'action:theme',
        group: 'actions',
        label: isDark ? locales.toggleThemeLight : locales.toggleTheme,
        icon: isDark ? Sun : Moon,
        run: () => {
          setTheme(isDark ? AppThemes.LIGHT : AppThemes.DARK);
          onClose();
        }
      },
      ...(hasOtherLang ? [{
        id: 'action:language',
        group: 'actions' as const,
        label: locales.switchLanguage,
        hint: otherLang.toUpperCase(),
        icon: Languages,
        run: go(otherLangHref)
      }] : [])
    ];

    const posts: PaletteItem[] = (index?.[lang] ?? [])
      .filter((post) => query.trim() !== '' && matchesPostQuery(post, query))
      .slice(0, MAX_POSTS)
      .map((post) => ({
        id: `post:${post.slug}`,
        group: 'posts',
        label: post.title,
        hint: post.date,
        icon: PenTool,
        run: go(getLocalizedPathname(`/blog/${post.slug}`, lang))
      }));

    const q = query.trim().toLowerCase();
    const matchLabel = (item: PaletteItem) => !q || item.label.toLowerCase().includes(q);

    return [...pages.filter(matchLabel), ...actions.filter(matchLabel), ...posts];
  }, [contentSlugByLanguages, index, isDark, lang, locales, onClose, otherLang, pathname, query, router, setTheme]);

  const safeActive = items.length ? Math.min(activeIndex, items.length - 1) : -1;

  // keep the active option in view
  useEffect(() => {
    if (safeActive < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${safeActive}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [safeActive]);

  const onQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const onKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (items.length) setActiveIndex((safeActive + 1) % items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (items.length) setActiveIndex((safeActive - 1 + items.length) % items.length);
        break;
      case 'Enter':
        if (safeActive >= 0) {
          event.preventDefault();
          items[safeActive].run();
        }
        break;
      case 'Tab': {
        // focus trap: the only tab stops are inside the dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('input, button');
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        break;
      }
    }
  }, [items, onClose, safeActive]);

  const groupLabel = { pages: locales.pages, actions: locales.actions, posts: locales.posts };
  const isSearchingPosts = query.trim() !== '';
  const optionId = (i: number) => `${listId}-option-${i}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] md:pt-[16vh]">
      <div
        aria-hidden
        className="absolute inset-0 bg-base-content/20 backdrop-blur-[2px] motion-safe:animate-[fade-in_150ms_ease-out]"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={locales.title}
        onKeyDown={onKeyDown}
        className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl floating-glass motion-safe:animate-[palette-in_160ms_ease-out]"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={safeActive >= 0 ? optionId(safeActive) : undefined}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={locales.placeholder}
            className="h-14 w-full bg-transparent text-base text-base-content outline-none placeholder:text-muted"
          />
          <kbd className="hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted sm:inline">Esc</kbd>
        </div>

        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={locales.title}
          className="flex-1 overflow-y-auto overscroll-contain p-2"
        >
          {items.map((item, i) => {
            const showHeading = i === 0 || items[i - 1].group !== item.group;
            const isActive = i === safeActive;
            return (
              <li key={item.id} role="presentation">
                {showHeading && (
                  <div role="presentation" className="px-3 pb-1.5 pt-3 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
                    {groupLabel[item.group]}
                  </div>
                )}
                <div
                  id={optionId(i)}
                  role="option"
                  aria-selected={isActive}
                  data-index={i}
                  onMouseMove={() => !isActive && setActiveIndex(i)}
                  onClick={item.run}
                  className={cn([
                    'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150',
                    isActive ? 'bg-brand-soft text-brand' : 'text-base-content'
                  ])}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hint && (
                    <span className={cn(['shrink-0 font-mono text-[11px] font-medium', isActive ? 'text-brand' : 'text-muted'])}>
                      {item.hint}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
          {isSearchingPosts && !index && !indexFailed && (
            <li role="presentation" className="px-3 py-3 text-sm text-muted">{locales.loading}</li>
          )}
          {isSearchingPosts && items.length === 0 && (index || indexFailed) && (
            <li role="presentation" className="px-3 py-6 text-center text-sm text-muted">{locales.empty}</li>
          )}
        </ul>

        <div className="hidden items-center gap-4 border-t border-line px-5 py-2.5 font-mono text-[11px] text-muted sm:flex">
          <span><kbd className="font-semibold">↑↓</kbd> {locales.hintNavigate}</span>
          <span><kbd className="font-semibold">↵</kbd> {locales.hintSelect}</span>
          <span><kbd className="font-semibold">esc</kbd> {locales.hintClose}</span>
        </div>
      </div>
    </div>
  );
}
