import cn from '@/designs/utils/cn';
import { contrastGrade, contrastRatio, ThemeName, ThemeTokens } from '@/modules/Docs/Colors/services/theme-tokens';

const THEMES: ThemeName[] = ['gading-light', 'gading-dark'];

interface SwatchProps {
  themes: Record<ThemeName, ThemeTokens>;
  tokens: readonly string[];
  /** Tailwind utility per token, shown under the name */
  utilities?: Record<string, string>;
}

/**
 * Every token in both themes at once. Colours are inline hex from globals.css,
 * not CSS variables, so both columns show even though only one theme is active.
 */
export function TokenCompare({ themes, tokens, utilities }: SwatchProps) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-card shadow-soft">
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b border-line px-4 py-3 font-mono text-xs text-muted sm:px-6">
        <span>token</span>
        {THEMES.map((theme) => <span key={theme}>{theme.replace('gading-', '')}</span>)}
      </div>
      <ul>
        {tokens.map((token) => (
          <li
            key={token}
            className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 sm:px-6"
          >
            <div className="min-w-0">
              <div className="break-words font-mono text-[13px] font-medium">--{token}</div>
              {utilities?.[token] && <div className="font-mono text-xs text-muted">{utilities[token]}</div>}
            </div>
            {THEMES.map((theme) => {
              const hex = themes[theme][token];
              return (
                <div key={theme} className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden
                    className="h-8 w-8 shrink-0 rounded-lg ring-1 ring-black/10 sm:h-9 sm:w-12"
                    style={{ background: hex }}
                  />
                  <span className="font-mono text-xs">{hex ?? 'n/a'}</span>
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ContrastProps {
  themes: Record<ThemeName, ThemeTokens>;
  pairs: { label: string; fg: string; bg: string; fixedFg?: string }[];
}

const GRADE_CLASS = {
  AAA: 'bg-teal-soft text-teal',
  AA: 'bg-teal-soft text-teal',
  'AA large': 'bg-brand-soft text-brand',
  fail: 'bg-rose-soft text-rose'
};

/** each text-on-background pair, drawn in both themes with its computed WCAG ratio */
export function ContrastTable({ themes, pairs }: ContrastProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {pairs.map((pair) => (
        <li key={pair.label} className="rounded-[20px] bg-card p-4 shadow-soft sm:p-5">
          <div className="text-sm font-semibold">{pair.label}</div>
          <div className="font-mono text-xs text-muted break-words">
            {pair.fixedFg ? pair.fixedFg : `--${pair.fg}`} on --{pair.bg}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {THEMES.map((theme) => {
              const fg = pair.fixedFg ?? themes[theme][pair.fg];
              const bg = themes[theme][pair.bg];
              const ratio = contrastRatio(fg, bg);
              const grade = contrastGrade(ratio);
              return (
                <div key={theme}>
                  <div
                    className="flex h-14 items-center justify-center rounded-xl text-[15px] font-semibold ring-1 ring-black/10"
                    style={{ color: fg, background: bg }}
                  >
                    Aa 123
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-1">
                    <span className="font-mono text-xs">{ratio.toFixed(2)}:1</span>
                    <span className={cn(['rounded-full px-2 py-0.5 font-mono text-[11px] font-medium', GRADE_CLASS[grade]])}>
                      {grade}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-muted">{theme.replace('gading-', '')}</div>
                </div>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}
